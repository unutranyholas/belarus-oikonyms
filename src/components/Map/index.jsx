import React from 'react';
import d3_scale from 'd3-scale';
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
    this.removeActive = this.removeActive.bind(this);
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
  removeActive() {
    this.setState({
      active: null
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
    let active;

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

    const activeRegion = (active) ?
      (<g className="active">
        <path d={path} transform={`translate(${active.x}, ${active.y})`} onClick={this.toggleActive} title={active.id}/>
        <line x1="0" x2="0" y1="5" y2="600" transform={`translate(${active.x}, ${active.y})`}/>
      </g>) : null;

    const isQuerySet = (this.props.query.replace(/-/g, '') !== '') ? 'querySet' : 'queryEmpty';
    const isHasResult = (totalCount !== 0) ? 'hasResult' : 'noResult';
    const isSelected = (this.state.active) ? ((placenames[this.state.active].percentage !== '0') ? 'selectedHasRecords' : 'selectedNoRecords') : 'totalStats';
    const cases = `${this.props.lang}-${isQuerySet}-${isHasResult}-${isSelected}`;

    let info = (<div>{cases}</div>);

    switch (cases) {
      case 'Bel-querySet-hasResult-totalStats':
        info = (
          <div>
            <h2>Усяго {(totalCount / this.props.total * 100).toFixed(1)}% населеных пунктаў утрымліваюць патэрн&nbsp;<strong>{this.props.query}</strong></h2>
            <p>Калі дакладней, то {totalCount} з {this.props.total}.</p>
          </div>
        );
        break;
      case 'Bel-querySet-hasResult-selectedHasRecords':
        info = (
          <div>
            <h2>Тут {placenames[this.state.active].percentage}% населеных пунктаў утрымліваюць патэрн&nbsp;<strong>{this.props.query}</strong></h2>
            <ul>
              {placenames[this.state.active].points.map((p, i) => {
                return (<li key={i}>{p}</li>)
              })}
            </ul>
          </div>
        );
        break;
      case 'Bel-querySet-hasResult-selectedNoRecords':
      case 'Bel-querySet-noResult-selectedNoRecords':
        info = (
          <div>
            <h2>Тут няма населеных пунктаў з патэрнам&nbsp;<strong>{this.props.query}</strong></h2>
          </div>
        );
        break;
      case 'Bel-queryEmpty-hasResult-totalStats':
        info = (
          <div>
            <h2>Няма патэрну, таму вы бачыце агульную статыстыку</h2>
            <p>Усяго — {totalCount} населеных пунктаў</p>
          </div>
        );
        break;
      case 'Bel-queryEmpty-hasResult-selectedHasRecords':
        info = (
          <div>
            <h2>Тут {placenames[this.state.active].points.length} населеных пунктаў</h2>
            <ul>
              {placenames[this.state.active].points.map((p, i) => {
                return (<li key={i}>{p}</li>)
              })}
            </ul>
          </div>
        );
        break;
      case 'Bel-querySet-noResult-totalStats':
        info = (
          <div>
            <h2>У Беларусі няма населеных пунктаў з патэрнам&nbsp;<strong>{this.props.query}</strong></h2>
          </div>
        );
        break;
      case 'Eng-querySet-hasResult-totalStats':
        info = (
          <div>
            <h2>A total of {(totalCount / this.props.total * 100).toFixed(1)}% cities and villages contain pattern&nbsp;<strong>{this.props.query}</strong></h2>
            <p>More specifically, {totalCount} from {this.props.total}.</p>
          </div>
        );
        break;
      case 'Eng-querySet-hasResult-selectedHasRecords':
        info = (
          <div>
            <h2>{placenames[this.state.active].percentage}% cities and villages contain pattern&nbsp;<strong>{this.props.query}</strong> here</h2>
            <ul>
              {placenames[this.state.active].points.map((p, i) => {
                return (<li key={i}>{p}</li>)
              })}
            </ul>
          </div>
        );
        break;
      case 'Eng-querySet-hasResult-selectedNoRecords':
      case 'Eng-querySet-noResult-selectedNoRecords':
        info = (
          <div>
            <h2>There are no cities and villages containing the pattern&nbsp;<strong>{this.props.query}</strong> here</h2>
          </div>
        );
        break;
      case 'Eng-queryEmpty-hasResult-totalStats':
        info = (
          <div>
            <h2>The pattern isn’t defined, so you see the summary</h2>
            <p>There are {totalCount} cities and villages in total</p>
          </div>
        );
        break;
      case 'Eng-queryEmpty-hasResult-selectedHasRecords':
        info = (
          <div>
            <h2>There are {placenames[this.state.active].points.length} cities and villages here</h2>
              <ul>
                {placenames[this.state.active].points.map((p, i) => {
                  return (<li key={i}>{p}</li>)
                })}
              </ul>
          </div>
        );
        break;
      case 'Eng-querySet-noResult-totalStats':
        info = (
          <div>
            <h2>There are no cities and villages containing the pattern&nbsp;<strong>{this.props.query} in Belarus</strong></h2>
          </div>
        );
        break;
    }

    return (
      <section className="map">
        <svg width="515" height="500" fill="transparent">
          <rect x="0" y="0" width="625" height="500" onClick={this.removeActive} />
          <g>
            {dots}
            {activeRegion}
          </g>
        </svg>
        <div className="info">
          {info}
        </div>
      </section>
    );
  }
}

export default Map;
