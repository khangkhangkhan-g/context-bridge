(() => {
  const te = new TextEncoder();
  const ascii = s => te.encode(s);
  const concat = parts => {
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total); let o = 0;
    for (const p of parts) { out.set(p, o); o += p.length; }
    return out;
  };

  function dataUrlBytes(dataUrl) {
    const b64 = dataUrl.split(",")[1] || "";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  async function jpegSlicesFromCanvas(canvas, targetWidth = 1200) {
    const scale = targetWidth / canvas.width;
    const scaledHeight = Math.max(1, Math.round(canvas.height * scale));
    const pagePx = Math.round(targetWidth * 842 / 595);
    const scaled = document.createElement("canvas");
    scaled.width = targetWidth; scaled.height = scaledHeight;
    const sctx = scaled.getContext("2d", { alpha: false });
    sctx.fillStyle = "#fff"; sctx.fillRect(0, 0, targetWidth, scaledHeight);
    sctx.drawImage(canvas, 0, 0, targetWidth, scaledHeight);

    const out = [];
    for (let y = 0; y < scaledHeight; y += pagePx) {
      const h = Math.min(pagePx, scaledHeight - y);
      const page = document.createElement("canvas");
      page.width = targetWidth; page.height = h;
      const ctx = page.getContext("2d", { alpha: false });
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, page.width, page.height);
      ctx.drawImage(scaled, 0, y, targetWidth, h, 0, 0, targetWidth, h);
      out.push({ bytes: dataUrlBytes(page.toDataURL("image/jpeg", 0.86)), width: targetWidth, height: h });
    }
    return out;
  }

  function buildImagePdf(pages) {
    // Objects: 1 catalog, 2 pages, then for each page: page, image, content.
    const objects = new Map();
    const pageIds = [];
    let nextId = 3;

    pages.forEach((img, index) => {
      const pageId = nextId++, imageId = nextId++, contentId = nextId++;
      pageIds.push(pageId);
      const drawH = 595 * img.height / img.width;
      const y = Math.max(0, 842 - drawH);
      const content = ascii(`q\n595 0 0 ${drawH.toFixed(2)} 0 ${y.toFixed(2)} cm\n/Im${index + 1} Do\nQ\n`);
      objects.set(imageId, concat([
        ascii(`<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`),
        img.bytes,
        ascii("\nendstream")
      ]));
      objects.set(contentId, concat([ascii(`<< /Length ${content.length} >>\nstream\n`), content, ascii("endstream")]));
      objects.set(pageId, ascii(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im${index + 1} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`));
    });

    objects.set(1, ascii("<< /Type /Catalog /Pages 2 0 R >>"));
    objects.set(2, ascii(`<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] >>`));

    const header = ascii("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
    const parts = [header];
    const offsets = [0];
    let offset = header.length;
    const maxId = nextId - 1;
    for (let id = 1; id <= maxId; id++) {
      const body = objects.get(id) || ascii("<<>>");
      const obj = concat([ascii(`${id} 0 obj\n`), body, ascii("\nendobj\n")]);
      offsets[id] = offset;
      parts.push(obj); offset += obj.length;
    }
    const xrefOffset = offset;
    let xref = `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
    for (let id = 1; id <= maxId; id++) xref += String(offsets[id]).padStart(10, "0") + " 00000 n \n";
    const trailer = `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    parts.push(ascii(xref), ascii(trailer));
    return new Blob(parts, { type: "application/pdf" });
  }

  window.ContextBridgePdf = { jpegSlicesFromCanvas, buildImagePdf };
})();
