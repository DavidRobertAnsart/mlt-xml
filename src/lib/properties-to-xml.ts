import { isPrimitive } from './is-primitive';
import { espaceValueForXml } from './value-to-xml';

export function propertiesToXml(obj: Partial<Record<string, unknown>>, propertyKeys: Set<string>, depth = '') {
  return Object.entries(obj)
    .filter((entry): entry is [string, string | number | boolean] => propertyKeys.has(entry[0]) && isPrimitive(entry[1]))
    .map(([name, value]) => `${depth}  <property name="${espaceValueForXml(name)}">${espaceValueForXml(value)}</property>`);
}
