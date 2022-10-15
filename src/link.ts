import { objToXml } from './lib/obj-to-xml';
import type { Producer } from './producer';

/**
 * The link is a producer object that that can be connected to other link producers in a Chain.
 */
export type Link = Producer & {
  // -- properties --
  next?: string;
};

const LINK_ATTRIBUTES_SET = new Set<Partial<keyof Link>>(['id', 'in', 'out']);
export function linkToXml(link: Link, depth?: string) {
  const propertiesSet = new Set(Object.keys(link).filter((key) => !LINK_ATTRIBUTES_SET.has(key) && key !== 'filters'));
  return objToXml(link, 'link', LINK_ATTRIBUTES_SET, propertiesSet, [], depth);
}
