import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import { Button, Card } from 'antd';

import ExampleChart from './ExampleChart';

import { gridConfig } from '../utils/constants';

class CoinGrid extends Component {
  state = {
    layout: []
  };

  deleteChart = chartId => {
    const { layout } = this.state;

    this.setState({
      layout: layout.filter(l => l.i !== chartId)
    });
  };

  addChart = () => {
    const { layout } = this.state;

    this.setState({
      layout: layout.concat([
        {
          ...gridConfig,
          i: Math.random()
            .toString(36)
            .substring(7),
          x: 0,
          y: 0,
          w: 4,
          h: 4
        }
      ])
    });
  };

  render() {
    const { layout } = this.state;

    return (
      <Card bordered={false}>
        <Button type="primary" onClick={this.addChart}>
          Add Chart
        </Button>
        <GridLayout layout={layout} cols={12} rowHeight={50} width={1300}>
          {layout.map(item => (
            <div key={item.i}>
              <ExampleChart key={item.i} />
              <Button
                type="danger"
                onClick={() => {
                  this.deleteChart(item.i);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </GridLayout>
      </Card>
    );
  }
}

export default CoinGrid;
