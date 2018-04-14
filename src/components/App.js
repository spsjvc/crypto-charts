import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import ExampleGrid from './ExampleGrid';
import CoinList from './CoinList';

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <Card bordered={false}>
              <CoinList />
            </Card>
          </Col>
          <Col span={20}>
            <Card bordered={false}>
              <ExampleGrid />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
