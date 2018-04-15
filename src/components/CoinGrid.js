import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import { Button, Card, Icon } from 'antd';

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

    const oldNumberOfCharts = this.props.displayedCharts.length;
    const newNumberOfCharts = nextProps.displayedCharts.length;

    const chart =
      newNumberOfCharts > oldNumberOfCharts
        ? nextProps.displayedCharts.filter(
            c => !this.props.displayedCharts.includes(c)
          )[0]
        : this.props.displayedCharts.filter(
            c => !nextProps.displayedCharts.includes(c)
          )[0];

    const updatedLayout =
      newNumberOfCharts > oldNumberOfCharts
        ? layout.concat([
            {
              ...gridConfig,
              x: 0,
              y: 0,
              w: gridConfig.minW,
              h: gridConfig.minH,
              i: chart.key,
              chart
            }
          ])
        : layout.filter(l => l.chart.key !== chart.key);

    this.setState({
      layout: updatedLayout
    });
  }

  render() {
    const { onDeleteChart, displayedCharts } = this.props;
    const { layout } = this.state;

    return (
      <Card
        bordered
        style={{
          overflow: 'auto',
          margin: '15px 15px 15px 0',
          height: 'calc(100vh - 30px)'
        }}
      >
        {displayedCharts.length === 0 ? (
          <div>
            Hmmm...
            <br />
            Looks like you haven't added any charts yet. Check out the menu on
            the left to add some.
          </div>
        ) : (
          <GridLayout layout={layout} cols={12} rowHeight={50} width={1200}>
            {layout.map(item => (
              <div
                style={{
                  border: '1px solid #e8e8e8',
                  borderRadius: '2px',
                  padding: '10px 15px 70px 15px'
                }}
                key={item.chart.key}
              >
                <h4>{`${item.chart.name} - ${item.chart.interval}`}</h4>
                <CoinChart chart={item.chart.key} />
                <Button
                  style={{ marginLeft: '-2.5px' }}
                  type="danger"
                  onClick={() => {
                    onDeleteChart(item.chart);
                  }}
                >
                  <Icon type="delete" />
                </Button>
              </div>
            ))}
          </GridLayout>
        )}
      </Card>
    );
  }
}

export default CoinGrid;
