class FallbackToYamlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FallbackToYaml';
  }
}

export function throwFallbackToYamlError() {
  throw new FallbackToYamlError(`Fallback to YAML`);
}
