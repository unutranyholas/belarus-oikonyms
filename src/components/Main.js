import 'normalize.css';
import 'styles/App.css';
import Map from './Map';

import React from 'react';

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'чы',
      lang: 'bel'
    }
  }
  render() {
    return (
      <div>
        <Map data={this.props.data} suffix={[this.state.query]} />
      </div>
    );
  }
}

export default AppComponent;
