import type { Blank } from './blank';
import { blankToXml } from './blank';
import type { Chain } from './chain';
import { chainToXml } from './chain';
import type { Entry } from './entry';
import { entryToXml } from './entry';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import { multitrackToXml } from './multitrack';
import type { Producer } from './producer';
import { producerToXml } from './producer';
import type { Tractor } from './tractor';
import { tractorToXml } from './tractor';

/**
 * A playlist is a sequential container of producers and blank spaces.
 * The class provides all sorts of playlist assembly and manipulation routines.
 * A playlist is also a producer within the framework.
 */
export type Playlist = {
  // -- inline attributes --
  /** Id of the playlist */
  id: string;
  /** When to start, what is started is service-specific */
  in?: string;
  /** When to stop */
  out?: string;
  title?: string;

  // -- properties --
  /** Set this true if you are doing sequential processing and want to automatically close producers as they are finished being used to free resources. */
  autoclose?: boolean;
  /** Set true on a producer to indicate that it is a "fx_cut," which is a way to add filters as a playlist entry - useful only in a multitrack. See FxCut in the docs. */
  'meta.fx_cut'?: boolean;
  /** Set to 1 to hide the video (make it an audio-only track), 2 to hide the audio (make it a video-only track), or 3 to hide audio and video (hidden track). This property only applies when using a multitrack or transition. */
  hide?: 1 | 2 | 3;
  mix_in?: string;
  mix_out?: string;

  // -- relations --
  entries?: Entry[];
  blanks?: Blank[];
  producers?: Producer[];
  playlists?: Playlist[];
  tractors?: Tractor[];
  multitracks?: Multitrack[];
  chains?: Chain[];
};

const PLAYLIST_ATTRIBUTES_SET = new Set<Partial<keyof Playlist>>(['id', 'in', 'out', 'title']);
const PLAYLIST_PROPERTIES_SET = new Set<Partial<keyof Playlist>>(['autoclose', 'meta.fx_cut', 'hide', 'mix_in', 'mix_out']);
export function playlistToXml(playlist: Playlist, depth = ''): string {
  const entries = (playlist.entries || []).map((entry) => entryToXml(entry, `${depth}  `));
  const blanks = (playlist.blanks || []).map((blank) => blankToXml(blank, `${depth}  `));
  const producers = (playlist.producers || []).map((producer) => producerToXml(producer, `${depth}  `));
  const playlists = (playlist.playlists || []).map((p) => playlistToXml(p, `${depth}  `));
  const tractors = (playlist.tractors || []).map((tractor) => tractorToXml(tractor, `${depth}  `));
  const multitracks = (playlist.multitracks || []).map((multitrack) => multitrackToXml(multitrack, `${depth}  `));
  const chains = (playlist.chains || []).map((chain) => chainToXml(chain, `${depth}  `));
  return objToXml(playlist, 'playlist', PLAYLIST_ATTRIBUTES_SET, PLAYLIST_PROPERTIES_SET, [...entries, ...blanks, ...producers, ...playlists, ...tractors, ...multitracks, ...chains], depth);
}
