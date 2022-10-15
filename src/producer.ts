import type { Filter } from './filter';
import { filterToXml } from './filter';
import { objToXml } from './lib/obj-to-xml';

/**
 * A producer is a service that generates audio, video, and metadata.
 * Some day it may also generate text (subtitles).
 * This is not to say a producer "synthesizes," rather that is an origin of data within the service network - that could be through synthesis or reading a stream.
 */
export type Producer = {
  // -- inline attributes --
  /** Id of the producer */
  id: string;
  /** When to start, what is started is service-specific */
  in?: string;
  /** When to stop */
  out?: string;

  // -- properties --
  title?: string;
  /** The name of the service subclass, e.g. mlt_producer */
  mlt_type?: string;
  /** The name of a producer subclass */
  mlt_service?: string;
  /** Sample aspect ratio */
  aspect_ratio?: number;
  /** The duration of the cut in frames */
  length?: string;
  /** The end-of-file behavior, one of: pause, continue, loop */
  eof?: 'pause' | 'continue' | 'loop';
  /** The file name, stream address, or the class name in angle brackets */
  resource?: string;
  /** Stores the data for a "mix" producer */
  mlt_mix?: string;
  /** Set this to temporarily disable the in and out points. */
  ignore_points?: boolean;
  /** holds a reference to a clone's producer, as created by mlt_producer_optimise */
  use_clone?: string;

  // -- relations --
  filters?: Filter[];
} & Partial<Record<string, unknown>>;

const PRODUCER_ATTRIBUTES_SET = new Set<Partial<keyof Producer>>(['id', 'in', 'out']);
export function producerToXml(producer: Producer, depth = '') {
  const propertiesSet = new Set(Object.keys(producer).filter((key) => !PRODUCER_ATTRIBUTES_SET.has(key) && key !== 'filters'));
  const filters = (producer.filters || []).map((filter) => filterToXml(filter, `${depth}  `));
  return objToXml(producer, 'producer', PRODUCER_ATTRIBUTES_SET, propertiesSet, filters, depth);
}
