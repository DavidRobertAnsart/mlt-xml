import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { AnyProducer } from './producer';

/**
 * The link is a producer object that that can be connected to other link producers in a Chain.
 */
export type Link = AnyProducer<
  'link',
  {
    // -- properties --
    next?: string;
  }
>;

export const isLink = (obj: XmlObj): obj is Link => obj.name === 'link';

const LINK_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out']);
export function linkToXml(link: Link, depth?: string) {
  const propertiesSet = new Set(Object.keys(link.attributes).filter((key) => !LINK_ATTRIBUTES_SET.has(key)));
  return objToXml(link, LINK_ATTRIBUTES_SET, propertiesSet, [], depth);
}
