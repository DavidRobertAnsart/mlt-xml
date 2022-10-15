export function isPrimitive(value: unknown): value is string | number | boolean {
  const valueType = typeof value;
  return valueType === 'string' || valueType === 'boolean' || (valueType === 'number' && !Number.isNaN(value));
}
