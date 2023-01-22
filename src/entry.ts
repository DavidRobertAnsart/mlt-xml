import type { Chain } from './chain';
import { elementsToXML } from './elements';
import type { Filter } from './filter';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import type { Playlist } from './playlist';
import type { Producer } from './producer';
import type { Tractor } from './tractor';
import type { Transition } from './transition';

export interface Entry
  extends XmlObj<
    'entry',
    {
      // -- inline attributes --
      /** Producer Id */
      producer: string;
      /** When to start, what is started is service-specific */
      in?: string;
      /** When to stop */
      out?: string;
    }
  > {
  // -- relations --
  elements?: Array<Producer | Playlist | Tractor | Multitrack | Filter | Transition | Chain>;
}

export const isEntry = (obj: XmlObj): obj is Entry => obj.name === 'entry';

const ENTRY_ATTRIBUTES_SET = new Set<string>(['producer', 'in', 'out']);
const ENTRY_PROPERTIES_SET = new Set<string>([]);
export function entryToXml(entry: Entry, depth = '') {
  const children = elementsToXML(entry.elements || [], depth);
  return objToXml(entry, ENTRY_ATTRIBUTES_SET, ENTRY_PROPERTIES_SET, children, depth);
}
