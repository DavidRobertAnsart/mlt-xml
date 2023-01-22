import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

/**
 * A filter is a service that may modify the output of a single producer.
 */
export type Filter = XmlObj<
  'filter',
  {
    // -- inline attributes --
    /** Id of the filter */
    id: string;
    /** When to start, what is started is service-specific */
    in?: string;
    /** When to stop */
    out?: string;

    // -- properties --
    mlt_service?: string;
    /** The index of the track of a multitrack on which the filter is applied */
    track?: string;
    /** A reference to the service to which this filter is attached. */
    service?: string;
    /** Set this to disable the filter while keeping it in the object model. Currently this is not cleared when the filter is detached. */
    disable?: boolean;
  } & Partial<Record<string, unknown>>
>;

export const isFilter = (obj: XmlObj): obj is Filter => obj.name === 'filter';

const FILTER_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out']);
export function filterToXml(filter: Filter, depth?: string) {
  const propertiesSet = new Set(Object.keys(filter.attributes).filter((key) => !FILTER_ATTRIBUTES_SET.has(key)));
  return objToXml(filter, FILTER_ATTRIBUTES_SET, propertiesSet, [], depth);
}
