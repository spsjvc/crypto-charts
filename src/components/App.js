import React, { Component } from 'react';
import { Row, Col } from 'antd';

import CoinList from './CoinList';
import CoinGrid from './CoinGrid';

class App extends Component {
  state = {
    displayedCharts: []
  };

  addChart = chart => {
    const { displayedCharts } = this.state;

    this.setState({
      displayedCharts: displayedCharts.concat([chart])
    });
  };

  deleteChart = chart => {
    const { displayedCharts } = this.state;

    this.setState({
      displayedCharts: displayedCharts.filter(c => c !== chart)
    });
  };

  render() {
    const { displayedCharts } = this.state;

    return (
      <div>
        <Row>
          <Col span={4}>
            <CoinList onAddChart={this.addChart} />
          </Col>
          <Col span={20}>
            <CoinGrid
              displayedCharts={displayedCharts}
              onDeleteChart={this.deleteChart}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
