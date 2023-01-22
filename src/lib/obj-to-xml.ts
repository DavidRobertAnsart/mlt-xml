import { attributesToXml } from './attributes-to-xml';
import { propertiesToXml } from './properties-to-xml';

type AnyAttributes = Partial<Record<string, unknown>>;

export interface XmlObj<Name extends string = string, Attributes extends AnyAttributes = AnyAttributes> {
  name: Name;
  attributes: Attributes;
}

export function objToXml(obj: XmlObj, attributeKeys: Set<string>, propertyKeys: Set<string>, children: string[], depth = '') {
  const attributes = attributesToXml(obj.attributes, attributeKeys);
  const properties = propertiesToXml(obj.attributes, propertyKeys, depth);
  const allChidren = [...properties, ...children];

  if (allChidren.length > 0) {
    return `${depth}<${obj.name}${attributes.length > 0 ? ' ' : ''}${attributes}>\n${allChidren.join('\n')}\n${depth}</${obj.name}>`;
  }
  return `${depth}<${obj.name}${attributes.length > 0 ? ' ' : ''}${attributes}/>`;
}
