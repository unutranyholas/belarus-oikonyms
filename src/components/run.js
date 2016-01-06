import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';

import d3_request from 'd3-request';
import d3_geo from 'd3-geo';
import d3_hexbin from 'd3-hexbin';

import oikonyms from "file!../data/result.csv"

const projection = d3_geo.geo
  .mercator()
  .center([(21.028 + 34.915) / 2, (56.831 + 50.513) / 2])
  .translate([300, 300])
  .scale(3000);

const hexbin = d3_hexbin.hexbin()
  .x((d) => d.x)
  .y((d) => d.y)
  .size([600, 600])
  .radius(6);

d3_request.csv(oikonyms, (data) => {

  const result = data.map(d => {
    d.label = d.Bel;
    [d.x, d.y] = projection([+d.Longitude, +d.Latitude]);
    return d
  });

  const hbData = hexbin(result).map(d => {
    d.id = `${d.i}/${d.j}`;
    return d;
  });

  ReactDOM.render(<App data={hbData} />, document.getElementById('app'));

});
