(() => {
  const te = new TextEncoder();

  function crc32(bytes) {
    let crc = 0 ^ -1;
    for (let i = 0; i < bytes.length; i++) {
      crc ^= bytes[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
    }
    return (crc ^ -1) >>> 0;
  }

  function u16(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255]);
  }

  function u32(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
  }

  function concat(parts) {
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const p of parts) { out.set(p, offset); offset += p.length; }
    return out;
  }

  function dosDateTime(date = new Date()) {
    const year = Math.max(1980, date.getFullYear());
    const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { dosTime, dosDate };
  }

  class StoreZip {
    constructor() { this.entries = []; }

    add(path, data, mime = "application/octet-stream") {
      let bytes;
      if (data instanceof Uint8Array) bytes = data;
      else if (data instanceof ArrayBuffer) bytes = new Uint8Array(data);
      else if (data instanceof Blob) throw new Error("Use addBlob() for Blob values");
      else bytes = te.encode(String(data));
      this.entries.push({ path: path.replace(/^\/+/, ""), bytes, mime, date: new Date() });
    }

    async addBlob(path, blob) {
      this.entries.push({ path: path.replace(/^\/+/, ""), bytes: new Uint8Array(await blob.arrayBuffer()), mime: blob.type || "application/octet-stream", date: new Date() });
    }

    build() {
      const localParts = [];
      const centralParts = [];
      let offset = 0;
      for (const e of this.entries) {
        const name = te.encode(e.path);
        const crc = crc32(e.bytes);
        const { dosTime, dosDate } = dosDateTime(e.date);
        const local = concat([
          u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(dosTime), u16(dosDate),
          u32(crc), u32(e.bytes.length), u32(e.bytes.length), u16(name.length), u16(0), name, e.bytes
        ]);
        localParts.push(local);

        const central = concat([
          u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(dosTime), u16(dosDate),
          u32(crc), u32(e.bytes.length), u32(e.bytes.length), u16(name.length), u16(0), u16(0),
          u16(0), u16(0), u32(0), u32(offset), name
        ]);
        centralParts.push(central);
        offset += local.length;
      }
      const central = concat(centralParts);
      const end = concat([
        u32(0x06054b50), u16(0), u16(0), u16(this.entries.length), u16(this.entries.length),
        u32(central.length), u32(offset), u16(0)
      ]);
      return new Blob([...localParts, central, end], { type: "application/zip" });
    }
  }

  window.ContextBridgeZip = StoreZip;
})();
