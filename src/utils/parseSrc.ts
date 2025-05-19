export function parseSrc(src: string) {
  if (src.startsWith('http')) {
    return src;
  }

  if (src.startsWith('/')) {
    return `${window.location.origin}${src}`;
  }

  const parsedPathname = window.location.pathname.endsWith('/index.html')
    ? window.location.pathname.slice(0, -11)
    : window.location.pathname;

  if (src.startsWith('./')) {
    return `${window.location.origin}${parsedPathname}${src.slice(1)}`;
  }

  return `${window.location.origin}${parsedPathname}/${src}`;
}
