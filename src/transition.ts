import { objToXml } from './lib/obj-to-xml';

/**
 * A transition may modify the output of a producer based on the output of a second producer.
 */
export type Transition = {
  // -- inline attributes --
  id: string;
  /** When to start, what is started is service-specific */
  in?: string;
  /** When to stop */
  out?: string;

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
} & Partial<Record<string, unknown>>;

const TRANSITION_ATTRIBUTES_SET = new Set<Partial<keyof Transition>>(['id', 'in', 'out']);
export function transitionToXml(transition: Transition, depth?: string) {
  const propertiesSet = new Set(Object.keys(transition).filter((key) => !TRANSITION_ATTRIBUTES_SET.has(key)));
  return objToXml(transition, 'transition', TRANSITION_ATTRIBUTES_SET, propertiesSet, [], depth);
}
