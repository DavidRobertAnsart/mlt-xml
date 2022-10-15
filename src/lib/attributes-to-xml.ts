import { isPrimitive } from './is-primitive';
import { espaceValueForXml } from './value-to-xml';

export function attributesToXml(obj: Partial<Record<string, unknown>>, attributeKeys: Set<string>) {
  return Object.entries(obj)
    .filter((entry): entry is [string, string | number | boolean] => attributeKeys.has(entry[0]) && isPrimitive(entry[1]))
    .map(([key, value]) => `${espaceValueForXml(key)}="${espaceValueForXml(value)}"`)
    .join(' ');
}
