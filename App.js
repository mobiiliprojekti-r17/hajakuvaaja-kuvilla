import React from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Line, Image as SvgImage, Text as SvgText } from 'react-native-svg';

const data = [
    { name: 'Omena',      sugar: 10.0, fiber: 2.4, image: require('./assets/apple.png') },
    { name: 'Rypäle',     sugar: 16.0, fiber: 0.9, image: require('./assets/grape.png') },
    { name: 'Banaani',    sugar: 12.2, fiber: 2.6, image: require('./assets/banana.png') },
    { name: 'Päärynä',    sugar:  9.8, fiber: 3.1, image: require('./assets/pear.png') },
    { name: 'Appelsiini', sugar:  9.0, fiber: 2.4, image: require('./assets/orange.png') },
    { name: 'mandariini', sugar:  8.2, fiber: 1.9, image: require('./assets/mandarine.png') },
    { name: 'Mansikka',   sugar:  4.9, fiber: 2.0, image: require('./assets/strawberry.png') },
    { name: 'Kiivi',       sugar:  8.9, fiber: 3.0, image: require('./assets/kiwi.png') },
    { name: 'Mango',      sugar: 14.0, fiber: 1.6, image: require('./assets/mango.png') },
    { name: 'Ananas',     sugar: 10.0, fiber: 1.4, image: require('./assets/pineapple.png') },
    {name: 'lime',        sugar: 1.7,	fiber: 2.8, image: require('./assets/lime.png')},
    {name: 'vesimelooni', sugar: 6.2,	fiber: 0.4, image: require('./assets/watermelon.png')},
    {name: 'kantaloupe', sugar: 7.9,	fiber: 0.9, image: require('./assets/cantaloupe.png')},
  ];

export default function FruitScatterChart() {
  const width = 400;
  const height = 320;
  const padding = 40;

  const maxX = Math.max(...data.map(d => d.sugar));
  const maxY = Math.max(...data.map(d => d.fiber));

  const scaleX = val => (val / maxX) * (width - padding * 2) + padding;
  const scaleY = val => height - (val / maxY) * (height - padding * 2) - padding;

  const xTicks = [0, maxX * 0.25, maxX * 0.5, maxX * 0.75, maxX];
  const yTicks = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY];

  const imgSize = 35;

  return (
    <View style={{ padding: 10, backgroundColor: '#FFF' }}>
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
        Sokeri vs. kuitu (g / 100 g)
      </Text>
      <Svg width={width} height={height}>
        <G>
          <Line
            x1={padding} y1={height - padding}
            x2={width - padding} y2={height - padding}
            stroke="black" strokeWidth="2"
          />
          <Line
            x1={padding} y1={padding}
            x2={padding} y2={height - padding}
            stroke="black" strokeWidth="2"
          />

          {xTicks.map((xVal, i) => (
            <G key={`xt-${i}`}>
              <Line
                x1={scaleX(xVal)} y1={height - padding}
                x2={scaleX(xVal)} y2={height - padding + 6}
                stroke="black"
              />
              <SvgText
                x={scaleX(xVal)} y={height - padding + 20}
                fontSize="10" textAnchor="middle"
              >
                {xVal.toFixed(1)}
              </SvgText>
            </G>
          ))}
          {yTicks.map((yVal, i) => (
            <G key={`yt-${i}`}>
              <Line
                x1={padding - 6} y1={scaleY(yVal)}
                x2={padding}   y2={scaleY(yVal)}
                stroke="black"
              />
              <SvgText
                x={padding - 10} y={scaleY(yVal) + 4}
                fontSize="10" textAnchor="end"
              >
                {yVal.toFixed(1)}
              </SvgText>
            </G>
          ))}
          <SvgText
            x={width / 2} y={height - 8}
            fontSize="12" textAnchor="middle"
          >
            Sokeri (g)
          </SvgText>
          <SvgText
            x={12} y={height / 2}
            fontSize="12" textAnchor="middle"
            transform={`rotate(-90, 12, ${height/2})`}
          >
            Kuitu (g)
          </SvgText>
        </G>
        {data.map((d, i) => {
          const x = scaleX(d.sugar) - imgSize / 2;
          const y = scaleY(d.fiber) - imgSize / 2;
          return (
            <G key={i}>
              <SvgImage
                x={x} y={y}
                width={imgSize} height={imgSize}
                href={d.image}
              />
              <SvgText
                x={x + imgSize / 2} y={y - 4}
                fontSize="10" textAnchor="middle"
              >
                {d.name}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
