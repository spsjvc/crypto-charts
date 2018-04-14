import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';

import ExampleChart from './ExampleChart';

import { gridConfig } from '../utils/constants';

class ExampleGrid extends Component {
  state = {
    layout: [
      { ...gridConfig, i: 'a', x: 0, y: 0, w: 4, h: 4 },
      { ...gridConfig, i: 'b', x: 6, y: 0, w: 6, h: 4 },
      { ...gridConfig, i: 'c', x: 0, y: 6, w: 12, h: 4 }
    ]
  };

  render() {
    const { layout } = this.state;

    return (
      <GridLayout layout={layout} cols={12} rowHeight={50} width={1200}>
        {layout.map(item => (
          <div key={item.i}>
            <ExampleChart key={item.i} />
          </div>
        ))}
      </GridLayout>
    );
  }
}

export default ExampleGrid;
