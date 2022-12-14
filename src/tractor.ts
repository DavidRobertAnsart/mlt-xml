import type { Filter } from './filter';
import { filterToXml } from './filter';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import { multitrackToXml } from './multitrack';
import type { Track } from './track';
import { trackToXml } from './track';
import type { Transition } from './transition';
import { transitionToXml } from './transition';

/**
 * The tractor is a convenience object to manage a multitrack, track filters, and transitions.
 */
export type Tractor = {
  // -- inline attributes --
  id: string;
  /** When to start, what is started is service-specific */
  in?: string;
  /** When to stop */
  out?: string;
  title?: string;

  // -- properties --
  /** Holds a reference to an encapsulated producer */
  producer?: string;

  // -- first relations group --
  // Must have one
  multitrack?: Multitrack;
  tracks?: Track[];

  // -- second relations group --
  filters?: Filter[];
  transitions?: Transition[];
} & Partial<Record<string, unknown>>;

const TRACTOR_ATTRIBUTES_SET = new Set<Partial<keyof Tractor>>(['id', 'in', 'out', 'title']);
export function tractorToXml(tractor: Tractor, depth = ''): string {
  const multitracks = tractor.multitrack !== undefined ? [multitrackToXml(tractor.multitrack, `${depth}  `)] : [];
  const tracks = (tractor.tracks || []).map((track) => trackToXml(track, `${depth}  `));
  const filters = (tractor.filters || []).map((filter) => filterToXml(filter, `${depth}  `));
  const transitions = (tractor.transitions || []).map((transition) => transitionToXml(transition, `${depth}  `));

  const propertiesSet = new Set(Object.keys(tractor).filter((key) => !TRACTOR_ATTRIBUTES_SET.has(key) && key !== 'filters' && key !== 'transitions' && key !== 'multitrack' && key !== 'tracks'));

  return objToXml(tractor, 'tractor', TRACTOR_ATTRIBUTES_SET, propertiesSet, [...multitracks, ...tracks, ...filters, ...transitions], depth);
}
