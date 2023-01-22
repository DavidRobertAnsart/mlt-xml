import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

/**
 * A blank space
 */
export type Blank = XmlObj<
  'blank',
  {
    // -- inline attributes --
    /** the duration of the blank */
    length: string;
  }
>;
export const isBlank = (obj: XmlObj): obj is Blank => obj.name === 'blank';

const BLANK_ATTRIBUTES_SET = new Set<string>(['length']);
const BLANK_PROPERTIES_SET = new Set<string>();
export function blankToXml(blank: Blank, depth?: string) {
  return objToXml(blank, BLANK_ATTRIBUTES_SET, BLANK_PROPERTIES_SET, [], depth);
}
