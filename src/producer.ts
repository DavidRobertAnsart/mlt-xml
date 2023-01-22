import { elementsToXML } from './elements';
import type { Filter } from './filter';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

export type AnyProducer<SubProducerName extends string, AdditionalAttributes extends Partial<Record<string, unknown>> = Partial<Record<string, unknown>>> = XmlObj<
  SubProducerName,
  {
    // -- inline attributes --
    /** Id of the producer */
    id: string;
    /** When to start, what is started is service-specific */
    in?: string | number;
    /** When to stop */
    out?: string | number;

    // -- properties --
    title?: string;
    /** The name of the service subclass, e.g. mlt_producer */
    mlt_type?: string;
    /** The name of a producer subclass */
    mlt_service?: string;
    /** Sample aspect ratio */
    aspect_ratio?: number;
    /** The duration of the cut in frames */
    length?: string | number;
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
  } & AdditionalAttributes &
    Partial<Record<string, unknown>>
>;

/**
 * A producer is a service that generates audio, video, and metadata.
 * Some day it may also generate text (subtitles).
 * This is not to say a producer "synthesizes," rather that is an origin of data within the service network - that could be through synthesis or reading a stream.
 */
export interface Producer extends AnyProducer<'producer'> {
  // -- relations --
  elements?: Filter[];
}

export const isProducer = (obj: XmlObj): obj is Producer => obj.name === 'producer';

const PRODUCER_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out']);
export function producerToXml(producer: Producer, depth = '') {
  const propertiesSet = new Set(Object.keys(producer.attributes).filter((key) => !PRODUCER_ATTRIBUTES_SET.has(key)));
  const children = elementsToXML(producer.elements || [], depth);
  return objToXml(producer, PRODUCER_ATTRIBUTES_SET, propertiesSet, children, depth);
}
