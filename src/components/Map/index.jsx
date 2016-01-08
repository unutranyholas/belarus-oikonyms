import React from 'react';
import d3_scale from 'd3-scale';
import _ from 'lodash';
const colorScalePer = d3_scale.viridis();
const colorScaleCount = d3_scale.viridis();
import './Map.css';


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.toggleActive = this.toggleActive.bind(this);
  }
  queryToRegexp(query) {
    const result = query.split('/').map(q => {
      const cleaned = q.replace(/-/g, '');
      if (q[0] === '-' && q.slice(-1) === '-') {return `.${cleaned}.`}
      else if (q.slice(-1) === '-') {return `^${cleaned}`}
      else if (q[0] === '-') {return `${cleaned}$`}
      else {return cleaned}
    }).join('|');

    return new RegExp(result, 'i');
  }
  toggleActive(e) {
    const result = (e.target.getAttribute('title') !== this.state.active) ? e.target.getAttribute('title') : null;
    this.setState({
      active: result
    })
  }
  render() {
    const {data, lang, query, path} = this.props;
    const myRegexp = this.queryToRegexp(query);

    let percentages = {};
    let placenames = {};
    let maxPercent = 0;
    let totalCount = 0;
    let maxCount = 0;
    let active, activeRegion, info;

    data.forEach((x)=>{
      if (x.id === this.state.active) {active = x}

      const hits = x.filter((y)=> y[lang].match(myRegexp));
      const count = hits.length;

      totalCount += count;
      percentages[x.id] = count/x.length;

      placenames[x.id] = {
        percentage: (percentages[x.id] * 100).toFixed(0),
        points: hits.map(y => y[lang])
      };

      // count only bins with at least 20 villages or towns for color scale maximum
      if(x.length > 20) {
        maxPercent = Math.max(maxPercent, percentages[x.id]);
      }

      maxCount = Math.max(maxCount, count);
    });

    colorScalePer.domain([Math.max(maxPercent, 0.01), 0]);
    colorScaleCount.domain([Math.max(maxCount, 0.01), 0]);

    const dots = data.map((x)=>{
      const color = (this.props.query.replace(/-/g, '') !== '') ? colorScalePer(percentages[x.id]) : colorScaleCount(placenames[x.id].points.length);
      return (
        <g key={x.id}>
          <path d={path} transform={`translate(${x.x}, ${x.y})`} style={{fill: color}} onClick={this.toggleActive} title={x.id} />
        </g>
      )
    });

    if (this.props.query.replace(/-/g, '') !== '') {

      if (this.state.active !== null) {
        activeRegion =
          (<g className="active">
            <path d={path} transform={`translate(${active.x}, ${active.y})`} onClick={this.toggleActive}
                  title={active.id}/>
            <line x1="0" x2="0" y1="5" y2="600" transform={`translate(${active.x}, ${active.y})`}/>
          </g>);

        info = (placenames[this.state.active].percentage === '0') ?
          (<div className="info"><h2>Тут няма населеных пунктаў з патэрнам <strong>{this.props.query}</strong></h2>
          </div>) :
          (<div className="info"><h2>Тут {placenames[this.state.active].percentage}% населеных пунктаў утрымліваюць
            патэрн <strong>{this.props.query}</strong></h2>
            <ul>
              {placenames[this.state.active].points.map((p, i) => {
                return (<li key={i}>{p}</li>)
              })}
            </ul>
          </div>);
      } else {
        info = (totalCount === 0) ?
          (<div className="info"><h2>У Беларусі няма населеных пунктаў з патэрнам <strong>{this.props.query}</strong>
          </h2></div>) :
          (<div className="info"><h2>Усяго {(totalCount / this.props.total * 100).toFixed(1)}% населеных пунктаў
            утрымліваюць патэрн <strong>{this.props.query}</strong></h2>
            <p>Калі дакладней, то {totalCount} з {this.props.total}.</p>
          </div>)
      }

    } else {

      if (this.state.active !== null) {
        activeRegion =
          (<g className="active">
            <path d={path} transform={`translate(${active.x}, ${active.y})`} onClick={this.toggleActive}
                  title={active.id}/>
            <line x1="0" x2="0" y1="5" y2="600" transform={`translate(${active.x}, ${active.y})`}/>
          </g>);

        info = (placenames[this.state.active].percentage === '0') ?
          (<div className="info"><h2>Тут няма населеных пунктаў з патэрнам <strong>{this.props.query}</strong></h2>
          </div>) :
          (<div className="info"><h2>Тут {placenames[this.state.active].points.length} населеных пунктаў</h2>
            <ul>
              {placenames[this.state.active].points.map((p, i) => {
                return (<li key={i}>{p}</li>)
              })}
            </ul>
          </div>);
      } else {
        info = (<div className="info">
            <h2>Няма патэрну, таму вы бачыце агульную статыстыку</h2>
            <p>Усяго — {totalCount} населеных пунктаў.</p>
          </div>)
      }

    }

    return (
      <section className="map">
        <svg width="625" height="500">
          <g>
            {dots}
            {activeRegion}
          </g>
        </svg>
        {info}
      </section>
    );
  }
}

export default Map;
