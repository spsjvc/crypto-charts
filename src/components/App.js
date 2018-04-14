import React, { Component } from 'react';
import { Row, Col } from 'antd';

import CoinList from './CoinList';
import CoinGrid from './CoinGrid';

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <CoinList />
          </Col>
          <Col span={20}>
            <CoinGrid />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
