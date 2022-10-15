import type { Chain } from './chain';
import { chainToXml } from './chain';
import type { Consumer } from './consumer';
import { consumerToXml } from './consumer';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import { multitrackToXml } from './multitrack';
import type { Playlist } from './playlist';
import { playlistToXml } from './playlist';
import type { Producer } from './producer';
import { producerToXml } from './producer';
import type { Profile } from './profile';
import { profileToXml } from './profile';
import type { Tractor } from './tractor';
import { tractorToXml } from './tractor';

export type MLT = {
  // -- inline attributes --
  LC_NUMERIC?: string;
  version?: string;
  root?: string;
  profile?: string;
  title?: string;
  producer?: string;

  // -- relations --
  // Must have one
  profiles?: Profile[];
  producers?: Producer[];
  playlists?: Playlist[];
  tractors?: Tractor[];
  multitracks?: Multitrack[];
  consumers?: Consumer[];
  chains?: Chain[];
};

const MLT_ATTRIBUTES_SET = new Set<Partial<keyof MLT>>(['LC_NUMERIC', 'version', 'root', 'profile', 'title', 'producer']);
const MLT_PROPERTIES_SET = new Set<Partial<keyof MLT>>([]);
export function mltToXml(mlt: MLT): string {
  const profiles = (mlt.profiles || []).map((profile) => profileToXml(profile, '  '));
  const producers = (mlt.producers || []).map((producer) => producerToXml(producer, '  '));
  const playlists = (mlt.playlists || []).map((playlist) => playlistToXml(playlist, '  '));
  const tractors = (mlt.tractors || []).map((tractor) => tractorToXml(tractor, '  '));
  const multitracks = (mlt.multitracks || []).map((m) => multitrackToXml(m, '  '));
  const consumers = (mlt.consumers || []).map((consumer) => consumerToXml(consumer, '  '));
  const chains = (mlt.chains || []).map((chain) => chainToXml(chain, '  '));
  return `<?xml version="1.0" encoding="utf-8"?>\n${objToXml(mlt, 'mlt', MLT_ATTRIBUTES_SET, MLT_PROPERTIES_SET, [
    ...profiles,
    ...producers,
    ...playlists,
    ...tractors,
    ...multitracks,
    ...consumers,
    ...chains,
  ])}`;
}
