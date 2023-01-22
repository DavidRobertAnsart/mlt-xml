import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

/**
 * A transition may modify the output of a producer based on the output of a second producer.
 */
export type Transition = XmlObj<
  'transition',
  {
    // -- inline attributes --
    id: string;
    /** When to start, what is started is service-specific */
    in?: string | number;
    /** When to stop */
    out?: string | number;

    // -- properties --
    /** The name of a transition subclass */
    mlt_service?: string;
    /** The track index (0-based) of a multitrack of the first producer */
    a_track?: number;
    /** The track index (0-based) of a multitrack of the second producer */
    b_track?: number;
    /** A flag to indicate if the transition should accept blank frames */
    accepts_blanks?: boolean;
    /** A flag to indicate that the in and out points do not apply */
    always_active?: boolean;
    /** Set this to disable the transition while keeping it in the object model. */
    disable?: boolean;
  } & Partial<Record<string, unknown>>
>;

export const isTransition = (obj: XmlObj): obj is Transition => obj.name === 'transition';

const TRANSITION_ATTRIBUTES_SET = new Set<string>(['id', 'in', 'out']);
export function transitionToXml(transition: Transition, depth?: string) {
  const propertiesSet = new Set(Object.keys(transition.attributes).filter((key) => !TRANSITION_ATTRIBUTES_SET.has(key)));
  return objToXml(transition, TRANSITION_ATTRIBUTES_SET, propertiesSet, [], depth);
}
