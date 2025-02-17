export function parseSrc(src: string) {
  if (src.startsWith('./')) {
    return `${window.location.origin}${window.location.pathname}${src.slice(1)}`;
  }

  if (src.startsWith('/')) {
    return `${window.location.origin}${src}`;
  }

  return src;
}
