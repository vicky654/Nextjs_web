import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p','h1','h2','h3','h4','h5','h6',
  'ul','ol','li','strong','em','b','i','u','s',
  'a','img','figure','figcaption','blockquote','pre','code',
  'table','thead','tbody','tr','th','td','br','hr','span','div',
];

const ALLOWED_ATTR = [
  'href','src','alt','title','id','class','target','rel',
  'width','height','loading','colspan','rowspan',
];

export function sanitizeBlogHtml(html: string): string {
  if (!html) return '';
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: ['script','style','iframe','object','embed','form','input','button'],
    FORBID_ATTR: ['onclick','onload','onerror','onmouseover','onfocus','style'],
    ADD_ATTR: ['target'],
    FORCE_BODY: true,
  });
  return enforceExternalLinkSecurity(clean);
}

function enforceExternalLinkSecurity(html: string): string {
  return html.replace(
    /<a\s([^>]*href=["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      if (/rel=/i.test(attrs)) return match;
      return `<a ${attrs} rel="noopener noreferrer">`;
    }
  );
}

export function prepareHtml(html: string): string {
  return sanitizeBlogHtml(addHeadingIds(html));
}

export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_match, tag, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    const baseId = slugifyId(text);
    const count = seen.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    seen.set(baseId, count + 1);
    const attrsWithoutId = attrs.replace(/\s*id="[^"]*"/gi, '');
    return `<${tag}${attrsWithoutId} id="${id}">${content}</${tag}>`;
  });
}

function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || 'heading';
}
