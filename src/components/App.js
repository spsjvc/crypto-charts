import React, { Component, Fragment } from 'react';
import { Row, Col, message, Button, Icon } from 'antd';

import CoinList from './CoinList';
import CoinGrid from './CoinGrid';
import SaveLayoutMenu from './SaveLayoutMenu';
import SavedLayoutsMenu from './SavedLayoutsMenu';
import Tutorial from './Tutorial';

import { checkIsTutorialSeen, setTutorialToSeen } from '../utils/storageHelper';

import {
  loadLayoutsFromStorage,
  removeLayoutFromStorage
} from '../utils/storageHelper';

class App extends Component {
  state = {
    displayedCharts: [],
    savedLayouts: [],
    selectedLayout: null,
    isTutorialVisible: true
  };

  componentWillMount() {
    this.setState({
      isTutorialVisible: !checkIsTutorialSeen()
    });
  }

  addChart = chart => {
    const { displayedCharts } = this.state;

    if (displayedCharts.filter(c => c.key === chart.key).length > 0) {
      message.error(
        'This chart is already on display. Please choose another chart.'
      );
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

  saveLayout = layout => {
    const { savedLayouts, displayedCharts } = this.state;

    if (
      loadLayoutsFromStorage()
        .map(l => l.name)
        .includes(layout)
    ) {
      message.error(
        'Layout with the same name already exists. Please choose another name.'
      );

      return;
    }

    if (displayedCharts.length === 0) {
      message.error("You can't save a layout without any charts.");
      return;
    }

    this.setState(
      {
        savedLayouts: savedLayouts.concat([layout])
      },
      () => {
        message.success(`Layout "${layout}" succesfully saved.`);
      }
    );
  };

  selectLayout = layout => {
    this.setState({
      selectedLayout: layout,
      displayedCharts: layout.layout.map(layout => layout.chart)
    });
  };

  deleteLayout = layout => {
    removeLayoutFromStorage(layout);
  };

  render() {
    const {
      displayedCharts,
      savedLayouts,
      selectedLayout,
      isTutorialVisible
    } = this.state;

    return (
      <Fragment>
        <Tutorial
          isVisible={isTutorialVisible}
          onCancel={() => {
            this.setState(
              {
                isTutorialVisible: false
              },
              () => {
                setTutorialToSeen();
              }
            );
          }}
        />
        <Row>
          <Col span={6}>
            <CoinList onAddChart={this.addChart} />
          </Col>
          <Col span={18}>
            <CoinGrid
              displayedCharts={displayedCharts}
              onDeleteChart={this.deleteChart}
              savedLayouts={savedLayouts}
              layout={selectedLayout}
            />
            <SavedLayoutsMenu
              onSelectLayout={this.selectLayout}
              onDeleteLayout={this.deleteLayout}
            />
            <SaveLayoutMenu onSaveLayout={this.saveLayout} />
            <Button
              type="danger"
              style={{ position: 'fixed', bottom: '25px', left: '777.5px' }}
              onClick={() => {
                this.setState({
                  displayedCharts: [],
                  selectedLayout: null
                });
              }}
            >
              Clear layout <Icon type="delete" />
            </Button>
            <Button
              style={{ position: 'fixed', bottom: '25px', right: '25px' }}
              onClick={() => {
                this.setState({
                  isTutorialVisible: true
                });
              }}
            >
              Help <Icon type="question" />
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default App;
