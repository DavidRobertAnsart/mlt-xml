import type { Chain } from './chain';
import { elementsToXML } from './elements';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { Playlist } from './playlist';
import type { Producer } from './producer';
import type { Track } from './track';
import type { Tractor } from './tractor';

/**
 * A multitrack is a parallel container of producers that acts a single producer.
 */
export interface Multitrack
  extends XmlObj<
    'multitrack',
    {
      // -- inline attributes --
      /** Id of the multitrack */
      id: string;
    }
  > {
  // -- relations --
  // Must have at least 1
  elements: Array<Track | Producer | Playlist | Tractor | Multitrack | Chain>;
}

export const isMultitrack = (obj: XmlObj): obj is Multitrack => obj.name === 'multitrack';

const MULTITRACK_ATTRIBUTES_SET = new Set<string>(['id']);
const MULTITRACK_PROPERTIES_SET = new Set<string>([]);
export function multitrackToXml(multitrack: Multitrack, depth = ''): string {
  const children = elementsToXML(multitrack.elements, depth);
  return objToXml(multitrack, MULTITRACK_ATTRIBUTES_SET, MULTITRACK_PROPERTIES_SET, children, depth);
}
