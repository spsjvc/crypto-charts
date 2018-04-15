import React, { Component } from 'react';
import { Row, Col, message } from 'antd';

import CoinList from './CoinList';
import CoinGrid from './CoinGrid';

class App extends Component {
  state = {
    displayedCharts: []
  };

  addChart = chart => {
    const { displayedCharts } = this.state;

    if (displayedCharts.filter(c => c.key === chart.key).length > 0) {
      message.error('This chart is already on display.');
      return;
    }

    this.setState({
      displayedCharts: displayedCharts.concat([chart])
    });
  };

  deleteChart = chart => {
    const { displayedCharts } = this.state;

    this.setState({
      displayedCharts: displayedCharts.filter(c => c.key !== chart.key)
    });
  };

  render() {
    const { displayedCharts } = this.state;

    return (
      <div>
        <Row>
          <Col span={6}>
            <CoinList onAddChart={this.addChart} />
          </Col>
          <Col span={18}>
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
