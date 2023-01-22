import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';

/**
 * A consumer is a service that pulls audio and video from the connected producers, filters, and transitions.
 * Typically a consumer is used to output audio and/or video to a device, file, or socket.
 */
export type Consumer = XmlObj<
  'consumer',
  {
    // -- inline attributes --
    /** Id of the consumer */
    id: string;

    // -- properties --
    /** The name of a consumer subclass */
    mlt_service?: string;
    /** The scaling algorithm to pass on to all scaling filters, defaults to "bilinear" */
    rescale?: string;
    /** The number of frames to use in the asynchronous render thread, defaults to 25 */
    buffer?: number;
    /** The number of frames to render before commencing output when real_time <> 0, defaults to the size of buffer */
    prefill?: number;
    /** The maximum number of consecutively dropped frames, defaults to 5 */
    drop_max?: number;
    /** The audio sample rate to use in Hertz, defaults to 48000 */
    frequency?: number;
    /** The number of audio channels to use, defaults to 2 */
    channels?: number;
    /** The layout of the audio channels, defaults to auto. other options include: mono, stereo, 5.1, 7.1, etc. */
    channel_layout?: string;
    /** The asynchronous behavior: 1 (default) for asynchronous with frame dropping, -1 for asynchronous without frame dropping, 0 to disable (synchronous) */
    real_time?: -1 | 0 | 1;
    /** The name of a resource to use as the test card, defaults to environment variable MLT_TEST_CARD. If undefined, the hard-coded default test card is white silence. A test card is what appears when nothing is produced. */
    test_card?: string;
    /** The numerator of the video frame rate, overrides mlt_profile_s */
    frame_rate_num?: number;
    /** The denominator of the video frame rate, overrides mlt_profile_s */
    frame_rate_den?: number;
    /** The horizontal video resolution, overrides mlt_profile_s */
    width?: number;
    /** The vertical video resolution, overrides mlt_profile_s */
    height?: number;
    /** A flag that indicates if the video is interlaced or progressive, overrides mlt_profile_s */
    progressive?: boolean;
    /** The video sample (pixel) aspect ratio as floating point (read only) */
    aspect_ratio?: number;
    /** The numerator of the sample aspect ratio, overrides mlt_profile_s */
    sample_aspect_num?: number;
    /** The denominator of the sample aspect ratio, overrides mlt_profile_s */
    sample_aspect_den?: number;
    /** The video frame aspect ratio as floating point (read only) */
    display_ratio?: number;
    /** The numerator of the video frame aspect ratio, overrides mlt_profile_s */
    display_aspect_num?: number;
    /** The denominator of the video frame aspect ratio, overrides mlt_profile_s */
    display_aspect_den?: number;
    /** The OS scheduling priority for the render threads when real_time is not 0. */
    priority?: string;
    /** When not progressive, whether interlace field order is top-field-first, defaults to 0. Set this to -1 if the consumer does not care about the field order. */
    top_field_first?: -1 | 0 | 1;
    /** The image format to request in rendering threads, defaults to yuv422 */
    mlt_image_format?: string;
    /** The audio format to request in rendering threads, defaults to S16 */
    mlt_audio_format?: string;
    /** Whether or not to disable audio processing */
    audio_off?: boolean;
    /** Whether or not to disable video processing */
    video_off?: boolean;
    /** The number of video frames not rendered since starting consumer */
    drop_count?: number;
    /** The color range as tv/mpeg (limited) or pc/jpeg (full); default is unset, which implies tv/mpeg */
    color_range?: string;
    /** The color transfer characteristic (gamma), default is unset */
    color_trc?: string;
    /** The deinterlace algorithm to pass to deinterlace filters, defaults to "yadif" */
    deinterlacer?: string;
    /** video frames per second as floating point (read only) */
    fps?: number;
  } & Partial<Record<string, unknown>>
>;

export const isConsumer = (obj: XmlObj): obj is Consumer => obj.name === 'consumer';

const CONSUMER_ATTRIBUTES_SET = new Set<string>(['id']);
export function consumerToXml(consumer: Consumer, depth?: string) {
  const propertiesSet = new Set(Object.keys(consumer.attributes).filter((key) => key !== 'id'));
  return objToXml(consumer, CONSUMER_ATTRIBUTES_SET, propertiesSet, [], depth);
}
