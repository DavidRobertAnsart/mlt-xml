import { elementsToXML } from './elements';
import type { Filter } from './filter';
import { isFilter } from './filter';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import type { Multitrack } from './multitrack';
import { isMultitrack } from './multitrack';
import type { Track } from './track';
import { isTrack } from './track';
import type { Transition } from './transition';
import { isTransition } from './transition';

/**
 * The tractor is a convenience object to manage a multitrack, track filters, and transitions.
 */
export interface Tractor
  extends XmlObj<
    '',
    {
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
    } & Partial<Record<string, unknown>>
  > {
  // -- first relations group --
  // Must have one
  elements: Array<Multitrack | Track | Filter | Transition>;
}

export const isTractor = (obj: XmlObj): obj is Tractor => obj.name === 'tractor';

const TRACTOR_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out', 'title']);
export function tractorToXml(tractor: Tractor, depth = ''): string {
  const propertiesSet = new Set(Object.keys(tractor.attributes).filter((key) => !TRACTOR_ATTRIBUTES_SET.has(key)));
  const tracks = elementsToXML(
    tractor.elements.filter((elem) => isMultitrack(elem) || isTrack(elem)),
    depth,
  );
  const children = elementsToXML(
    tractor.elements.filter((elem) => isFilter(elem) || isTransition(elem)),
    depth,
  );
  return objToXml(tractor, TRACTOR_ATTRIBUTES_SET, propertiesSet, [...tracks, ...children], depth);
}
