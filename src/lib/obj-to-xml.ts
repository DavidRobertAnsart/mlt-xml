import { attributesToXml } from './attributes-to-xml';
import { propertiesToXml } from './properties-to-xml';

export function objToXml(obj: Partial<Record<string, unknown>>, tag: string, attributeKeys: Set<string>, propertyKeys: Set<string>, children: string[], depth = '') {
  const attributes = attributesToXml(obj, attributeKeys);
  const properties = propertiesToXml(obj, propertyKeys, depth);
  const allChidren = [...properties, ...children];

  if (allChidren.length > 0) {
    return `${depth}<${tag}${attributes.length > 0 ? ' ' : ''}${attributes}>\n${allChidren.join('\n')}\n${depth}</${tag}>`;
  }
  return `${depth}<${tag}${attributes.length > 0 ? ' ' : ''}${attributes}/>`;
}
