import React from 'react';
import d3_scale from 'd3-scale';
import _ from 'lodash';
const colorScale = d3_scale.viridis();
import './Map.css';


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    }
    this.clearInfo = this.clearInfo.bind(this);
    this.changeInfo = _.debounce(this.changeInfo.bind(this), 100);
  }
  queryToRegexp(query) {
    //const cleanedQuery = query.replace(/-/g, '');
    //if (query[0] === '-' && query.slice(-1) === '-') {return new RegExp(`.${cleanedQuery}.`, 'i')}
    //if (query.slice(-1) === '-') {return new RegExp(`^${cleanedQuery}`, 'i')}
    //if (query[0] === '-') {return new RegExp(`${cleanedQuery}$`, 'i')}
    //
    //return new RegExp(`${cleanedQuery}`, 'i');

    const result = query.split('/').map(q => {
      const cleaned = q.replace(/-/g, '');
      if (q[0] === '-' && q.slice(-1) === '-') {return `.${cleaned}.`}
      else if (q.slice(-1) === '-') {return `^${cleaned}`}
      else if (q[0] === '-') {return `${cleaned}$`}
      else {return cleaned}
    }).join('|');

    return new RegExp(result, 'i');
  }
  clearInfo() {
    this.setState({
      info: ''
    })
  }
  changeInfo(e) {
    this.setState({
      info: e.target.getAttribute('title')
    })
  }
  render() {
    const {data, lang, query, path} = this.props;
    const myRegexp = this.queryToRegexp(query);

    let percentages = {};
    let placenames = {};
    let maxPercent = 0;
    let totalCount = 0;

    data.forEach((x)=>{

      let hits = x.filter((y)=> y[lang].match(myRegexp));
      let count = hits.length;

      totalCount += count;
      percentages[x.id] = count/x.length;

      placenames[x.id] = `${(percentages[x.id] * 100).toFixed(0)}% of place names have suffix \'${this.props.query}\': ${hits.map((y)=> y[lang]).join(", ")}`;

      // count only bins with at least 20 villages or towns for color scale maximum
      if(x.length > 20) {
        maxPercent = Math.max(maxPercent, percentages[x.id]);
      }
    });

    colorScale.domain([maxPercent, 0]);

    const dots = data.map((x)=>{
      const color = colorScale(percentages[x.id]);
      const title = (percentages[x.id] > 0) ? placenames[x.id] : null;
      return (
        <g key={x.id}>
          <path d={path} transform={`translate(${x.x}, ${x.y})`} style={{fill: color}} onMouseEnter={this.changeInfo} title={title} />
        </g>
      )
    });

    return (
      <div className="map-tile">
        <div className="info">{this.state.info}</div>
        <svg width="600" height="600">
          <g>
            {dots}
          </g>
        </svg>
      </div>
    );
  }
}
export default Map;
