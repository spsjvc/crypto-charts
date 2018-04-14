import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import { Button, Card } from 'antd';

import CoinChart from './CoinChart';

import { gridConfig } from '../utils/constants';

class CoinGrid extends Component {
  static propTypes = {
    displayedCharts: PropTypes.array.isRequired,
    onDeleteChart: PropTypes.func.isRequired
  };

  state = {
    layout: []
  };

  componentWillReceiveProps(nextProps) {
    const { layout } = this.state;

    const oldNumberOfCoins = this.props.displayedCharts.length;
    const newNumberOfCoins = nextProps.displayedCharts.length;

    const coin =
      newNumberOfCoins > oldNumberOfCoins
        ? nextProps.displayedCharts.filter(
            c => !this.props.displayedCharts.includes(c)
          )[0]
        : this.props.displayedCharts.filter(
            c => !nextProps.displayedCharts.includes(c)
          )[0];

    const updatedLayout =
      newNumberOfCoins > oldNumberOfCoins
        ? layout.concat([
            {
              ...gridConfig,
              x: 0,
              y: 0,
              w: 4,
              h: 4,
              i: coin,
              coin
            }
          ])
        : layout.filter(l => l.coin !== coin);

    this.setState({
      layout: updatedLayout
    });
  }

  render() {
    const { onDeleteChart } = this.props;
    const { layout } = this.state;

    return (
      <Card bordered={false}>
        <GridLayout layout={layout} cols={12} rowHeight={50} width={1300}>
          {layout.map(item => (
            <div key={item.coin}>
              <CoinChart coin={item.coin} />
              <Button
                type="danger"
                onClick={() => {
                  onDeleteChart(item.coin);
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
