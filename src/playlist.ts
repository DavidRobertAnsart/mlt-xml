import type { Blank } from './blank';
import type { Chain } from './chain';
import { elementsToXML } from './elements';
import type { Entry } from './entry';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import type { Producer } from './producer';
import type { Tractor } from './tractor';

/**
 * A playlist is a sequential container of producers and blank spaces.
 * The class provides all sorts of playlist assembly and manipulation routines.
 * A playlist is also a producer within the framework.
 */
export interface Playlist
  extends XmlObj<
    'playlist',
    {
      // -- inline attributes --
      /** Id of the playlist */
      id: string;
      /** When to start, what is started is service-specific */
      in?: string | number;
      /** When to stop */
      out?: string | number;
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
    }
  > {
  // -- relations --
  elements?: Array<Entry | Blank | Producer | Playlist | Tractor | Multitrack | Chain>;
}

export const isPlaylist = (obj: XmlObj): obj is Playlist => obj.name === 'playlist';

const PLAYLIST_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out', 'title']);
const PLAYLIST_PROPERTIES_SET = new Set<string>(['autoclose', 'meta.fx_cut', 'hide', 'mix_in', 'mix_out']);
export function playlistToXml(playlist: Playlist, depth = ''): string {
  const children = elementsToXML(playlist.elements || [], depth);
  return objToXml(playlist, PLAYLIST_ATTRIBUTES_SET, PLAYLIST_PROPERTIES_SET, children, depth);
}
