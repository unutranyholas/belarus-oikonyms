import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';

import d3_request from 'd3-request';
import d3_geo from 'd3-geo';
import d3_hexbin from 'd3-hexbin';
import topojson from 'topojson';

import oikonyms from "file!../data/result.csv"

const projection = d3_geo.geo
  .mercator()
  .center([(21.028 + 34.915) / 2, (56.831 + 50.513) / 2])
  .translate([260, 250])
  .scale(3000);

//const bgProjection = d3_geo.geo
//  .mercator()
//  .center([(21.028 + 34.915) / 2, (56.831 + 50.513) / 2])
//  .translate([224 + 20 - 30 + 260 + ((630 - 515) / 2), 152 + 250 - 10])
//  .scale(3000);
//
//var geoPath = d3_geo.geo.path()
//  .projection(bgProjection);

const hexbin = d3_hexbin.hexbin()
  .x((d) => d.x)
  .y((d) => d.y)
  .size([600, 500])
  .radius(6);

const examples = {
  Bel: ['-чы', '-кі', '-ўка', '-ва', '-на', '-цы', '-ны', '-ча', '-ў', '-ішкі', '-шчына', '-ын/-ін', '-ты' ,'акцябр', '- -'],
  Eng: ['-čy', '-ki', '-ŭka', '-va', '-na', '-cy', '-ny', '-ča', '-ŭ', '-iški', '-ščyna', '-yn/-in', '-ty', 'akciabr', '- -']
};

const path = hexbin.hexagon();

d3_request.csv(oikonyms, (data) => {

  const result = data.map(d => {
    [d.x, d.y] = projection([+d.Longitude, +d.Latitude]);
    return d
  });

  const hbData = hexbin(result).map(d => {
    d.id = `${d.i}/${d.j}`;
    return d;
  });

  ReactDOM.render(<App data={hbData} total={data.length} path={path} examples={examples} />, document.getElementById('app'));

});
//
//d3_request.json(bgMap, (data) => {
//  const geoData = topojson.feature(data, data.objects.clipped).features;
//
//  const bgMapSvg = (
//    <svg width="1280" height="840" className="bg-map">
//      <defs>
//        <radialGradient id="whiteGradient">
//          <stop offset="31%" stopColor={'rgba(255, 255, 255, 0)'} />
//          <stop offset="56%" stopColor={'rgba(255, 255, 255, 1)'} />
//        </radialGradient>
//      </defs>
//      {geoData.map((g, i) => {
//        return ( <path d={geoPath(g)} key={i} /> )
//      })}
//      <circle cx={224 + 20 - 30 + 260 + ((630 - 515) / 2)} cy={152 + 250 - 10} r="900" fill="url(#whiteGradient)" />
//    </svg>
//  );
//
//  ReactDOM.render(bgMapSvg, document.getElementById('bg'));
//
//});
