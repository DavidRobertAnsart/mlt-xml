import { filterToXml } from './filter';
import { objToXml } from './lib/obj-to-xml';
import type { Link } from './link';
import type { Producer } from './producer';

/**
 * The chain is a producer that that can connect multiple link producers in a sequence.
 */
export type Chain = Producer & {
  // -- relations --
  links?: Link[];
};

const CHAIN_ATTRIBUTES_SET = new Set<Partial<keyof Chain>>(['id', 'in', 'out']);
export function chainToXml(chain: Chain, depth = '') {
  const propertiesSet = new Set(Object.keys(chain).filter((key) => !CHAIN_ATTRIBUTES_SET.has(key) && key !== 'filters' && key !== 'links'));
  const filters = (chain.filters || []).map((filter) => filterToXml(filter, `${depth}  `));
  const links = (chain.links || []).map((link) => filterToXml(link, `${depth}  `));
  return objToXml(chain, 'chain', CHAIN_ATTRIBUTES_SET, propertiesSet, [...filters, ...links], depth);
}
