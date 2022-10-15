import type { Chain } from './chain';
import { chainToXml } from './chain';
import type { Filter } from './filter';
import { filterToXml } from './filter';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import { multitrackToXml } from './multitrack';
import type { Playlist } from './playlist';
import { playlistToXml } from './playlist';
import type { Producer } from './producer';
import { producerToXml } from './producer';
import type { Tractor } from './tractor';
import { tractorToXml } from './tractor';
import type { Transition } from './transition';
import { transitionToXml } from './transition';

export type Entry = {
  // -- inline attributes --
  /** Producer Id */
  producer: string;
  /** When to start, what is started is service-specific */
  in?: string;
  /** When to stop */
  out?: string;

  // -- relations --
  producers?: Producer[];
  playlists?: Playlist[];
  tractors?: Tractor[];
  multitracks?: Multitrack[];
  filters?: Filter[];
  transitions?: Transition[];
  chains?: Chain[];
};

const ENTRY_ATTRIBUTES_SET = new Set<Partial<keyof Entry>>(['producer', 'in', 'out']);
const ENTRY_PROPERTIES_SET = new Set<Partial<keyof Entry>>([]);
export function entryToXml(entry: Entry, depth = '') {
  const producers = (entry.producers || []).map((producer) => producerToXml(producer, `${depth}  `));
  const playlists = (entry.playlists || []).map((playlist) => playlistToXml(playlist, `${depth}  `));
  const tractors = (entry.tractors || []).map((tractor) => tractorToXml(tractor, `${depth}  `));
  const multitracks = (entry.multitracks || []).map((multitrack) => multitrackToXml(multitrack, `${depth}  `));
  const filters = (entry.filters || []).map((filter) => filterToXml(filter, `${depth}  `));
  const transitions = (entry.transitions || []).map((transition) => transitionToXml(transition, `${depth}  `));
  const chains = (entry.chains || []).map((chain) => chainToXml(chain, `${depth}  `));
  return objToXml(entry, 'entry', ENTRY_ATTRIBUTES_SET, ENTRY_PROPERTIES_SET, [...producers, ...playlists, ...tractors, ...multitracks, ...filters, ...transitions, ...chains], depth);
}
