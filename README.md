# mlt-xml

This module will construct [Media Lovin' Toolkit (MLT)](https://www.mltframework.org/) projects and export them in XML.

It has typescript definitions for the ressources used by the framework. You can define your MTL project with A JSON object and export it to XML.

## Install

```bash
yarn add mlt-xml
```

or with npm

```bash
npm install mlt-xml --save
```

## Example

```typescript
import { mltToXml } from 'mlt-xml';

console.log(
  mltToXml({
    title: 'watermarkOnVideo',
    elements: [
      {
        name: 'producer',
        attributes: {
          id: 'video',
          in: '0',
          out: '1000',
          resource: 'clip.mpeg',
        },
      },
      {
        name: 'producer',
        attributes: {
          id: 'watermark',
          in: '0',
          out: '1000',
          resource: 'watermark.png',
          mlt_service: 'qimage',
          length: '1000',
        },
      },
      {
        name: 'tractor',
        attributes: {
          id: 'tractor0',
        },
        elements: [
          {
            name: 'multitrack',
            attributes: {
              id: 'multitrack0',
            },
            elements: [
              {
                name: 'playlist',
                attributes: {
                  id: 'video_track',
                  in: '0',
                  out: '1000',
                },
                elements: [
                  {
                    name: 'entry',
                    attributes: {
                      producer: 'video',
                      in: '0',
                      out: '1000',
                    },
                  },
                ],
              },
              {
                name: 'playlist',
                attributes: {
                  id: 'watermark_track',
                  in: '0',
                  out: '1000',
                },
                elements: [
                  {
                    name: 'entry',
                    attributes: {
                      producer: 'watermark',
                      in: '0',
                      out: '1000',
                    },
                  },
                ],
              },
            ],
          },
          {
            name: 'transition',
            attributes: {
              id: 'transition0',
              a_track: 0,
              b_track: 1,
              geometry: '85%/5%:10%x10%',
              factory: 'loader',
              progressive: 1,
              mlt_service: 'composite',
              fill: 1,
              sliced_composite: 1,
            },
          },
        ],
      },
    ],
  }),
);
```

Returns:

```xml
<?xml version="1.0" encoding="utf-8"?>
<mlt title="watermarkOnVideo">
  <producer id="video" in="0" out="1000">
    <property name="resource">clip.mpeg</property>
  </producer>
  <producer id="watermark" in="0" out="1000">
    <property name="resource">watermark.png</property>
    <property name="mlt_service">qimage</property>
    <property name="length">1000</property>
  </producer>
  <tractor id="tractor0">
    <multitrack id="multitrack0">
      <playlist id="video_track" in="0" out="1000">
        <entry producer="video" in="0" out="1000"/>
      </playlist>
      <playlist id="watermark_track" in="0" out="1000">
        <entry producer="watermark" in="0" out="1000"/>
      </playlist>
    </multitrack>
    <transition id="transition0">
      <property name="a_track">0</property>
      <property name="b_track">1</property>
      <property name="geometry">85%/5%:10%x10%</property>
      <property name="factory">loader</property>
      <property name="progressive">1</property>
      <property name="mlt_service">composite</property>
      <property name="fill">1</property>
      <property name="sliced_composite">1</property>
    </transition>
  </tractor>
</mlt>
```

## Contributing

Contributions, issues and feature requests are welcome!

## License

Copyrigth 2022 [David Robert-Ansart](mailto:david.robertansart@gmail.com)  
This project is [MIT](https://github.com/DavidRobertAnsart/mlt-xml/blob/main/LICENSE) licensed.
