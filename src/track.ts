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

export type Track = {
  // -- inline attributes --
  producer: string;
  hide?: 'video' | 'audio' | 'both';

  // -- relations --
  producers?: Producer[];
  playlists?: Playlist[];
  tractors?: Tractor[];
  multitracks?: Multitrack[];
  filters?: Filter[];
  transitions?: Transition[];
  chains?: Chain[];
};

const TRACK_ATTRIBUTES_SET = new Set<Partial<keyof Track>>(['producer', 'hide']);
const TRACK_PROPERTIES_SET = new Set<Partial<keyof Track>>([]);
export function trackToXml(track: Track, depth = ''): string {
  const producers = (track.producers || []).map((producer) => producerToXml(producer, `${depth}  `));
  const playlists = (track.playlists || []).map((p) => playlistToXml(p, `${depth}  `));
  const tractors = (track.tractors || []).map((tractor) => tractorToXml(tractor, `${depth}  `));
  const multitracks = (track.multitracks || []).map((multitrack) => multitrackToXml(multitrack, `${depth}  `));
  const filters = (track.filters || []).map((filter) => filterToXml(filter, `${depth}  `));
  const transitions = (track.transitions || []).map((transition) => transitionToXml(transition, `${depth}  `));
  const chains = (track.chains || []).map((chain) => chainToXml(chain, `${depth}  `));
  return objToXml(track, 'track', TRACK_ATTRIBUTES_SET, TRACK_PROPERTIES_SET, [...producers, ...playlists, ...tractors, ...multitracks, ...filters, ...transitions, ...chains], depth);
}
