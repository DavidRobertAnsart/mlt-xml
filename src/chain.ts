import { elementsToXML } from './elements';
import type { Filter } from './filter';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { Link } from './link';
import type { AnyProducer } from './producer';

/**
 * The chain is a producer that that can connect multiple link producers in a sequence.
 */
export interface Chain extends AnyProducer<'chain'> {
  // -- relations --
  elements?: Array<Link | Filter>;
}

export const isChain = (obj: XmlObj): obj is Chain => obj.name === 'chain';

const CHAIN_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out']);
export function chainToXml(chain: Chain, depth = '') {
  const propertiesSet = new Set(Object.keys(chain.attributes).filter((key) => !CHAIN_ATTRIBUTES_SET.has(key)));
  const children = elementsToXML(chain.elements || [], depth);
  return objToXml(chain, CHAIN_ATTRIBUTES_SET, propertiesSet, children, depth);
}
