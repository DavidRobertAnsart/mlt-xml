import { blankToXml, isBlank } from './blank';
import { chainToXml, isChain } from './chain';
import { consumerToXml, isConsumer } from './consumer';
import { entryToXml, isEntry } from './entry';
import { filterToXml, isFilter } from './filter';
import type { XmlObj } from './lib/obj-to-xml';
import { objToXml } from './lib/obj-to-xml';
import { isLink, linkToXml } from './link';
import { isMultitrack, multitrackToXml } from './multitrack';
import { isPlaylist, playlistToXml } from './playlist';
import { isProducer, producerToXml } from './producer';
import { isProfile, profileToXml } from './profile';
import { isTrack, trackToXml } from './track';
import { isTractor, tractorToXml } from './tractor';
import { isTransition, transitionToXml } from './transition';

const EMPTY_SET = new Set<string>();

export const elementsToXML = <Elements extends XmlObj>(elements: Elements[] = [], depth = ''): string[] => {
  const newDepth = `${depth}  `;
  return elements.map((element) => {
    if (isBlank(element)) {
      return blankToXml(element, newDepth);
    }
    if (isChain(element)) {
      return chainToXml(element, newDepth);
    }
    if (isConsumer(element)) {
      return consumerToXml(element, newDepth);
    }
    if (isEntry(element)) {
      return entryToXml(element, newDepth);
    }
    if (isFilter(element)) {
      return filterToXml(element, newDepth);
    }
    if (isLink(element)) {
      return linkToXml(element, newDepth);
    }
    if (isMultitrack(element)) {
      return multitrackToXml(element, newDepth);
    }
    if (isPlaylist(element)) {
      return playlistToXml(element, newDepth);
    }
    if (isProducer(element)) {
      return producerToXml(element, newDepth);
    }
    if (isProfile(element)) {
      return profileToXml(element, newDepth);
    }
    if (isTrack(element)) {
      return trackToXml(element, newDepth);
    }
    if (isTractor(element)) {
      return tractorToXml(element, newDepth);
    }
    if (isTransition(element)) {
      return transitionToXml(element, newDepth);
    }

    return objToXml(element, EMPTY_SET, new Set(Object.keys(element.attributes)), [], newDepth);
  });
};
