// NOTE: idea is to keep this lightweight and not need to import a full library. Maybe worth putting something in cloud-ui..
// https://dev.to/gauravadhikari1997/show-json-as-pretty-print-with-syntax-highlighting-3jpm

export function highlightSyntax(json: any) {
  if (!json) {
    return ''; //no JSON from response
  }

  const parsedJson = json.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  return parsedJson.replaceAll(
    /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)/g,
    function (match: any) {
      let cls = 'value';
      if (match.startsWith('"')) {
        cls = match.endsWith(':') ? 'key' : 'value';
      }

      return `<span class="${cls}">${match}</span>`;
    },
  );
}
