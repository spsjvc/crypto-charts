import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';

import ExampleChart from './ExampleChart';

import { gridConfig } from '../utils/constants';

class ExampleGrid extends Component {
  state = {
    layout: [
      { ...gridConfig, i: 'a', x: 0, y: 0, w: 4, h: 4 },
      { ...gridConfig, i: 'b', x: 4, y: 0, w: 4, h: 4 },
      { ...gridConfig, i: 'c', x: 8, y: 0, w: 4, h: 4 },
      { ...gridConfig, i: 'd', x: 0, y: 4, w: 4, h: 4 },
      { ...gridConfig, i: 'e', x: 4, y: 4, w: 4, h: 4 },
      { ...gridConfig, i: 'f', x: 8, y: 4, w: 4, h: 4 },
      { ...gridConfig, i: 'g', x: 0, y: 8, w: 4, h: 4 },
      { ...gridConfig, i: 'h', x: 4, y: 8, w: 4, h: 4 },
      { ...gridConfig, i: 'i', x: 8, y: 8, w: 4, h: 4 }
    ]
  };

  render() {
    const { layout } = this.state;

    return (
      <GridLayout layout={layout} cols={12} rowHeight={50} width={1300}>
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
