export function parseSrc(src: string) {
  if (src.startsWith('http')) {
    return src;
  }

  if (src.startsWith('/')) {
    return `${window.location.origin}${src}`;
  }

  if (src.startsWith('./')) {
    return `${window.location.origin}${window.location.pathname}${src.slice(1)}`;
  }

  return `${window.location.origin}${window.location.pathname}/${src}`;
}
