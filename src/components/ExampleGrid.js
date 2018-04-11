import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';

const divStyle = {
  color: 'white',
  fontSize: '2rem',
  textAlign: 'center',
  backgroundColor: 'steelblue'
};

class ExampleGrid extends Component {
  state = {
    layout: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ]
  };

  render() {
    const { layout } = this.state;

    return (
      <GridLayout layout={layout} cols={12} rowHeight={30} width={1200}>
        {layout.map(item => (
          <div key={item.i} style={divStyle}>
            {item.i}
          </div>
        ))}
      </GridLayout>
    );
  }
}

export default ExampleGrid;
