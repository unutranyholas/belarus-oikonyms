import 'normalize.css';
import 'styles/App.css';
import _ from 'lodash';
import Map from './Map';

import React from 'react';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '-чы',
      lang: 'Bel'
    };

    this.changeQuery = _.debounce(this.changeQuery.bind(this), 100);
  }
  changeQuery(e) {
    this.setState({query: e.target.value});
  }
  render() {
    return (
      <div>
        <input onChange={this.changeQuery} value={this.state.query} />
        <Map data={this.props.data} query={this.state.query} lang={this.state.lang} path={this.props.path} />
      </div>
    );
  }
}

export default AppComponent;
