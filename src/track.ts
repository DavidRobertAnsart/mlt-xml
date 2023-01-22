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

export interface Track
  extends XmlObj<
    'track',
    {
      // -- inline attributes --
      producer: string;
      hide?: 'video' | 'audio' | 'both';
    }
  > {
  // -- relations --
  elements?: Array<Producer | Playlist | Tractor | Multitrack | Filter | Transition | Chain>;
}

export const isTrack = (obj: XmlObj): obj is Track => obj.name === 'track';

const TRACK_ATTRIBUTES_SET = new Set<string>(['producer', 'hide']);
const TRACK_PROPERTIES_SET = new Set<string>([]);
export function trackToXml(track: Track, depth = ''): string {
  const children = elementsToXML(track.elements || [], depth);
  return objToXml(track, TRACK_ATTRIBUTES_SET, TRACK_PROPERTIES_SET, children, depth);
}
