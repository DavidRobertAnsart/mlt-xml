import { objToXml } from './lib/obj-to-xml';

/**
 * A blank space
 */
export type Blank = {
  // -- inline attributes --
  /** the duration of the blank */
  length: string;
};

const BLANK_ATTRIBUTES_SET = new Set<keyof Blank>(['length']);
const BLANK_PROPERTIES_SET = new Set<string>();
export function blankToXml(blank: Blank, depth?: string) {
  return objToXml(blank, 'blank', BLANK_ATTRIBUTES_SET, BLANK_PROPERTIES_SET, [], depth);
}
