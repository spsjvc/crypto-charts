import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Dropdown, Menu } from 'antd';

import { loadLayoutsFromStorage } from '../utils/storageHelper';

let didButtonClickFirst = false;

class SavedLayoutsMenu extends Component {
  static propTypes = {
    onSelectLayout: PropTypes.func.isRequired,
    onDeleteLayout: PropTypes.func.isRequired
  };

  state = {
    savedLayouts: []
  };

  handleMenuItemClick = menuItem => {
    if (didButtonClickFirst) {
      didButtonClickFirst = false;
      return;
    }

    const { onSelectLayout } = this.props;
    const { savedLayouts } = this.state;

    if (menuItem.key === 'no-saved-layouts') {
      return;
    }

    onSelectLayout(
      savedLayouts.filter(layout => layout.name === menuItem.key)[0]
    );
  };

  render() {
    const { onDeleteLayout } = this.props;
    const { savedLayouts } = this.state;

    return (
      <Dropdown
        onVisibleChange={visible => {
          if (visible) {
            this.setState({
              savedLayouts: loadLayoutsFromStorage()
            });
          }
        }}
        overlay={
          <Menu
            onClick={menuItem => {
              this.handleMenuItemClick(menuItem);
            }}
          >
            {savedLayouts.length === 0 ? (
              <Menu.Item key="no-saved-layouts">
                You don't have any saved layouts
              </Menu.Item>
            ) : (
              savedLayouts.map(layout => (
                <Menu.Item key={layout.name}>
                  {layout.name}
                  <Button
                    style={{ float: 'right' }}
                    size="small"
                    type="danger"
                    onClick={() => {
                      didButtonClickFirst = true;
                      onDeleteLayout(layout.name);
                    }}
                  >
                    x
                  </Button>
                </Menu.Item>
              ))
            )}
          </Menu>
        }
      >
        <Button style={{ position: 'fixed', bottom: '25px', left: '430px' }}>
          List saved layouts <Icon type="database" />
        </Button>
      </Dropdown>
    );
  }
}

export default SavedLayoutsMenu;
