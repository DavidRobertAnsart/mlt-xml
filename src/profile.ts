import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

export type Profile = XmlObj<
  'profile',
  {
    // -- inline attributes --
    name?: string;
    colorspace?: string;
    description?: string;
    display_aspect_den?: number;
    display_aspect_num?: number;
    frame_rate_den: number;
    frame_rate_num: number;
    height: number;
    progressive: boolean;
    sample_aspect_den: number;
    sample_aspect_num: number;
    width: number;
  }
>;

export const isProfile = (obj: XmlObj): obj is Profile => obj.name === 'profile';

const PROFILE_ATTRIBUTES_SET = new Set<string>([
  'name',
  'colorspace',
  'description',
  'display_aspect_den',
  'display_aspect_num',
  'frame_rate_den',
  'frame_rate_num',
  'height',
  'name',
  'progressive',
  'sample_aspect_den',
  'sample_aspect_num',
  'width',
]);
const PROFILE_PROPERTIES_SET = new Set<string>();
export function profileToXml(profile: Profile, depth?: string) {
  return objToXml(profile, PROFILE_ATTRIBUTES_SET, PROFILE_PROPERTIES_SET, [], depth);
}
