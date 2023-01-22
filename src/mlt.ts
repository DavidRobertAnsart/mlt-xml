import type { Chain } from './chain';
import type { Consumer } from './consumer';
import { elementsToXML } from './elements';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import type { Playlist } from './playlist';
import type { Producer } from './producer';
import type { Profile } from './profile';
import type { Tractor } from './tractor';

export interface MLT {
  // -- inline attributes --
  LC_NUMERIC?: string;
  version?: string;
  root?: string;
  profile?: string;
  title?: string;
  producer?: string;

  // -- relations --
  // Must have one
  elements: Array<Profile | Producer | Playlist | Tractor | Multitrack | Consumer | Chain>;
}

const MLT_ATTRIBUTES_SET = new Set<string>(['LC_NUMERIC', 'version', 'root', 'profile', 'title', 'producer']);
const MLT_PROPERTIES_SET = new Set<string>([]);
export function mltToXml(mlt: MLT): string {
  const { elements, ...attributes } = mlt;
  const children = elementsToXML(elements);
  return `<?xml version="1.0" encoding="utf-8"?>\n${objToXml(
    {
      name: 'mlt',
      attributes,
    },
    MLT_ATTRIBUTES_SET,
    MLT_PROPERTIES_SET,
    children,
  )}`;
}
