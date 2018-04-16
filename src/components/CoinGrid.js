import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import { Button, Card, Icon } from 'antd';

import CoinChart from './CoinChart';

import { gridConfig } from '../utils/constants';
import { saveLayoutToStorage } from '../utils/storageHelper';

class CoinGrid extends Component {
  static propTypes = {
    displayedCharts: PropTypes.array.isRequired,
    onDeleteChart: PropTypes.func.isRequired,
    savedLayouts: PropTypes.array.isRequired,
    layout: PropTypes.object
  };

  state = {
    layout: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.layout !== this.props.layout) {
      this.setState({
        layout: nextProps.layout ? nextProps.layout.layout : []
      });

      return;
    }

    const { layout } = this.state;

    const oldNumberOfSavedLayouts = this.props.savedLayouts.length;
    const newNumberOfSavedLayouts = nextProps.savedLayouts.length;

    if (newNumberOfSavedLayouts > oldNumberOfSavedLayouts) {
      saveLayoutToStorage({
        name: nextProps.savedLayouts[newNumberOfSavedLayouts - 1],
        layout
      });

      return;
    }

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

    let xCoordinate;
    let yCoordinate;

    if (layout.length === 0) {
      xCoordinate = 0;
      yCoordinate = 0;
    } else {
      const lastLayout =
        layout.length === 0 ? { x: 0, y: 0 } : layout[layout.length - 1];
      xCoordinate = lastLayout.x === 8 ? 0 : lastLayout.x + 4;
      yCoordinate = lastLayout.x === 8 ? lastLayout.y + 5 : lastLayout.y;
    }

    const updatedLayout =
      newNumberOfCharts > oldNumberOfCharts
        ? layout.concat([
            {
              ...gridConfig,
              x: xCoordinate,
              y: yCoordinate,
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
