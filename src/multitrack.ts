import type { Chain } from './chain';
import { chainToXml } from './chain';
import { objToXml } from './lib/obj-to-xml';
import type { Playlist } from './playlist';
import { playlistToXml } from './playlist';
import type { Producer } from './producer';
import { producerToXml } from './producer';
import type { Track } from './track';
import { trackToXml } from './track';
import type { Tractor } from './tractor';
import { tractorToXml } from './tractor';

/**
 * A multitrack is a parallel container of producers that acts a single producer.
 */
export type Multitrack = {
  // -- inline attributes --
  /** Id of the multitrack */
  id: string;

  // -- relations --
  // Must have at least 1
  tracks?: Track[];
  producers?: Producer[];
  playlists?: Playlist[];
  tractors?: Tractor[];
  multitracks?: Multitrack[];
  chains?: Chain[];
};

const MULTITRACK_ATTRIBUTES_SET = new Set<Partial<keyof Multitrack>>(['id']);
const MULTITRACK_PROPERTIES_SET = new Set<Partial<keyof Multitrack>>([]);
export function multitrackToXml(multitrack: Multitrack, depth = ''): string {
  const tracks = (multitrack.tracks || []).map((track) => trackToXml(track, `${depth}  `));
  const producers = (multitrack.producers || []).map((producer) => producerToXml(producer, `${depth}  `));
  const playlists = (multitrack.playlists || []).map((playlist) => playlistToXml(playlist, `${depth}  `));
  const tractors = (multitrack.tractors || []).map((tractor) => tractorToXml(tractor, `${depth}  `));
  const multitracks = (multitrack.multitracks || []).map((m) => multitrackToXml(m, `${depth}  `));
  const chains = (multitrack.chains || []).map((chain) => chainToXml(chain, `${depth}  `));
  return objToXml(multitrack, 'multitrack', MULTITRACK_ATTRIBUTES_SET, MULTITRACK_PROPERTIES_SET, [...tracks, ...producers, ...playlists, ...tractors, ...multitracks, ...chains], depth);
}
