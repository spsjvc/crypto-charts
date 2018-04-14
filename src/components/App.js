import React, { Component } from 'react';
import { Row, Col } from 'antd';

import CoinList from './CoinList';
import CoinGrid from './CoinGrid';

class App extends Component {
  state = {
    displayedCharts: []
  };

  addChartForCoin = coin => {
    const { displayedCharts } = this.state;

    this.setState({
      displayedCharts: displayedCharts.concat([coin])
    });
  };

  deleteChartForCoin = coin => {
    const { displayedCharts } = this.state;

    this.setState({
      displayedCharts: displayedCharts.filter(c => c !== coin)
    });
  };

  render() {
    const { displayedCharts } = this.state;

    return (
      <div>
        <Row>
          <Col span={4}>
            <CoinList onAddChart={this.addChartForCoin} />
          </Col>
          <Col span={20}>
            <CoinGrid
              displayedCharts={displayedCharts}
              onDeleteChart={this.deleteChartForCoin}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
