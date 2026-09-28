(() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad = n => String(n).padStart(4, '0');

  function activePath(raw) {
    const mapping = raw && raw.mapping && typeof raw.mapping === 'object' ? raw.mapping : {};
    let id = raw && raw.current_node;
    if (!id || !mapping[id]) {
      const nodes = Object.values(mapping);
      const leaves = nodes.filter(n => n && (!Array.isArray(n.children) || !n.children.length));
      id = leaves.length ? leaves[leaves.length - 1].id : null;
    }
    const out = [];
    const seen = new Set();
    while (id && mapping[id] && !seen.has(id)) {
      seen.add(id);
      const node = mapping[id];
      out.push(node);
      id = node.parent;
    }
    return out.reverse();
  }

  function hiddenMessage(message) {
    if (!message || !message.author) return true;
    const role = message.author.role;
    if (role !== 'user' && role !== 'assistant') return true;
    const meta = message.metadata || {};
    if (meta.is_visually_hidden_from_conversation === true) return true;
    if (meta.is_user_system_message === true) return true;
    if (meta.is_system_message === true) return true;
    const channel = String(meta.channel || meta.message_channel || '').toLowerCase();
    if (channel === 'analysis' || channel === 'reasoning') return true;
    const ct = String(message.content && message.content.content_type || '').toLowerCase();
    if (/reasoning|chain_of_thought|analysis/.test(ct)) return true;
    if (role === 'assistant' && message.recipient && message.recipient !== 'all' && message.recipient !== 'assistant') return true;
    return false;
  }

  function visibleParts(message) {
    const content = message && message.content || {};
    const parts = Array.isArray(content.parts) ? content.parts : [];
    if (parts.length) return parts;
    if (typeof content.text === 'string') return [content.text];
    if (typeof content.result === 'string') return [content.result];
    return [];
  }

  function stripPointer(value) {
    return String(value || '').replace(/^sediment:\/\//, '');
  }

  function safeJson(value) {
    try { return JSON.stringify(value, null, 2); } catch (_) { return String(value); }
  }

  function contentFromMessage(message) {
    const pieces = [];
    const images = [];
    const rawVisible = [];
    const parts = visibleParts(message);
    let imageIndex = 0;

    for (const part of parts) {
      if (typeof part === 'string') {
        if (part) pieces.push(part);
        continue;
      }
      if (!part || typeof part !== 'object') continue;
      const type = String(part.content_type || part.type || '').toLowerCase();
      if (type === 'image_asset_pointer' && typeof part.asset_pointer === 'string') {
        imageIndex += 1;
        const token = `__CB_API_IMAGE_${imageIndex}__`;
        const fileId = stripPointer(part.asset_pointer);
        images.push({ token, fileId, alt: part.metadata?.dalle?.prompt || part.metadata?.name || `image ${imageIndex}`, width: part.width || null, height: part.height || null, source: 'api' });
        pieces.push(`![${images[images.length - 1].alt}](${token})`);
        continue;
      }
      if (type === 'audio_transcription' && typeof part.text === 'string') {
        pieces.push(part.text);
        continue;
      }
      if (typeof part.text === 'string') {
        pieces.push(part.text);
        continue;
      }
      // Preserve user-visible structured content without exposing hidden reasoning.
      if (!/reasoning|analysis|thought/.test(type)) rawVisible.push({ type: type || 'object', value: part });
    }

    return { markdown: pieces.join('\n\n').trim(), images, rawVisible };
  }

  function attachmentsFromMessage(message) {
    const list = Array.isArray(message?.metadata?.attachments) ? message.metadata.attachments : [];
    const out = [];
    for (const a of list) {
      if (!a || typeof a !== 'object') continue;
      const fileId = String(a.id || a.file_id || a.fileId || '');
      if (!fileId) continue;
      out.push({
        kind: 'file',
        fileId,
        text: String(a.name || a.file_name || fileId),
        download: String(a.name || a.file_name || ''),
        mime: String(a.mime_type || a.mime || 'application/octet-stream'),
        size: Number.isFinite(a.size) ? a.size : null,
        source: 'api'
      });
    }
    return out;
  }

  function sandboxFiles(markdown, sourceMessageId) {
    const out = [];
    const re = /\[([^\]]+)\]\(sandbox:(\/[^)]+)\)/g;
    let m;
    while ((m = re.exec(markdown || ''))) {
      let path = m[2];
      try { path = decodeURIComponent(path); } catch (_) {}
      const fileName = path.split('/').filter(Boolean).pop() || m[1] || 'generated-file';
      out.push({ kind: 'sandbox', text: m[1] || fileName, download: fileName, sandboxPath: path, sandboxMessageId: sourceMessageId, source: 'api' });
    }
    return out;
  }

  function inlineEscapes(text) {
    return esc(text)
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/~~([^~]+)~~/g, '<del>$1</del>')
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|sandbox:[^)\s]+)\)/g, '<a href="$2">$1</a>');
  }

  function markdownToHtml(md) {
    const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
    const out = [];
    let inCode = false, codeLang = '', code = [];
    let listType = null;
    const closeList = () => { if (listType) { out.push(`</${listType}>`); listType = null; } };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const fence = line.match(/^```\s*([^\s`]*)/);
      if (fence) {
        closeList();
        if (!inCode) { inCode = true; codeLang = fence[1] || ''; code = []; }
        else { out.push(`<pre><code${codeLang ? ` class="language-${esc(codeLang)}"` : ''}>${esc(code.join('\n'))}</code></pre>`); inCode = false; codeLang = ''; code = []; }
        continue;
      }
      if (inCode) { code.push(line); continue; }

      // GFM-style table.
      if (line.includes('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
        closeList();
        const header = line.replace(/^\||\|$/g, '').split('|').map(x => x.trim());
        i += 1;
        const rows = [];
        while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim()) {
          i += 1;
          rows.push(lines[i].replace(/^\||\|$/g, '').split('|').map(x => x.trim()));
        }
        out.push(`<table><thead><tr>${header.map(x => `<th>${inlineEscapes(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${inlineEscapes(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }

      if (!line.trim()) { closeList(); out.push(''); continue; }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { closeList(); out.push(`<h${h[1].length}>${inlineEscapes(h[2])}</h${h[1].length}>`); continue; }
      const quote = line.match(/^>\s?(.*)$/);
      if (quote) { closeList(); out.push(`<blockquote>${inlineEscapes(quote[1])}</blockquote>`); continue; }
      const ul = line.match(/^\s*[-*+]\s+(.*)$/);
      if (ul) { if (listType !== 'ul') { closeList(); listType = 'ul'; out.push('<ul>'); } out.push(`<li>${inlineEscapes(ul[1])}</li>`); continue; }
      const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ol) { if (listType !== 'ol') { closeList(); listType = 'ol'; out.push('<ol>'); } out.push(`<li>${inlineEscapes(ol[1])}</li>`); continue; }
      closeList();
      if (/^---+$/.test(line.trim())) { out.push('<hr>'); continue; }
      // Image line before generic paragraph conversion.
      const imgOnly = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgOnly) { out.push(`<p><img alt="${esc(imgOnly[1])}" src="${esc(imgOnly[2])}"></p>`); continue; }
      out.push(`<p>${inlineEscapes(line)}</p>`);
    }
    closeList();
    if (inCode) out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);
    return out.join('\n');
  }

  function parseCodeBlocks(md) {
    const out = [];
    const re = /```([^\n`]*)\n([\s\S]*?)```/g;
    let m, idx = 0;
    while ((m = re.exec(md || ''))) out.push({ index: ++idx, language: (m[1] || 'text').trim().toLowerCase() || 'text', text: m[2].replace(/\n$/, '') });
    return out;
  }

  function parseLinks(md) {
    const out = [];
    const re = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
    let m, idx = 0;
    while ((m = re.exec(md || ''))) out.push({ index: ++idx, text: m[1], href: m[2] });
    return out;
  }

  function parseTables(md) {
    const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
    const out = [];
    for (let i = 0; i < lines.length - 1; i++) {
      if (!lines[i].includes('|') || !/^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) continue;
      const rows = [lines[i].replace(/^\||\|$/g, '').split('|').map(x => x.trim())];
      i += 1;
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim()) {
        i += 1;
        rows.push(lines[i].replace(/^\||\|$/g, '').split('|').map(x => x.trim()));
      }
      out.push({ index: out.length + 1, rows });
    }
    return out;
  }

  function visibleMetadata(message) {
    const meta = message && message.metadata || {};
    const keep = {};
    for (const key of ['model_slug', 'default_model_slug', 'voice_mode_message', 'finish_details', 'citations', 'content_references']) {
      if (meta[key] !== undefined) keep[key] = meta[key];
    }
    return keep;
  }

  function fromApi(raw, conversationId, url) {
    const nodes = activePath(raw);
    const messages = [];
    for (const node of nodes) {
      const message = node && node.message;
      if (!message || hiddenMessage(message)) continue;
      const role = message.author.role;
      const extracted = contentFromMessage(message);
      let markdown = extracted.markdown;
      const attachments = attachmentsFromMessage(message);
      const inlineImageIds = new Set(extracted.images.map(x => x.fileId));
      const files = attachments.filter(f => !inlineImageIds.has(f.fileId));
      files.push(...sandboxFiles(markdown, message.id));

      // Skip empty visible wrappers.
      if (!markdown && !extracted.images.length && !files.length && !extracted.rawVisible.length) continue;

      const html = markdownToHtml(markdown);
      const text = markdown.replace(/```[\s\S]*?```/g, m => m.replace(/^```[^\n]*\n|```$/g, '')).replace(/!\[[^\]]*\]\([^)]*\)/g, '[image]').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/[*_~`>#-]/g, ' ').replace(/\s+/g, ' ').trim();
      messages.push({
        id: `msg_${pad(messages.length + 1)}`,
        index: messages.length + 1,
        sourceMessageId: message.id || null,
        role,
        text,
        markdown,
        html,
        images: extracted.images,
        links: parseLinks(markdown),
        codeBlocks: parseCodeBlocks(markdown),
        tables: parseTables(markdown),
        fileCandidates: files,
        rawVisible: extracted.rawVisible,
        metadata: visibleMetadata(message),
        createdAt: typeof message.create_time === 'number' ? new Date(message.create_time * 1000).toISOString() : null
      });
    }

    const stats = { images: 0, files: 0, code: 0, tables: 0, links: 0 };
    for (const m of messages) {
      stats.images += m.images.length;
      stats.files += m.fileCandidates.length;
      stats.code += m.codeBlocks.length;
      stats.tables += m.tables.length;
      stats.links += m.links.length;
    }
    return {
      title: (typeof raw?.title === 'string' && raw.title) || document.title || 'ChatGPT Conversation',
      url,
      exportedAt: new Date().toISOString(),
      conversationId,
      source: 'chatgpt-readonly-api',
      messages,
      stats
    };
  }

  self.ContextBridgeNormalize = { fromApi, markdownToHtml };
})();
