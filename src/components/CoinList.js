import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Dropdown, Avatar, Card, Button, Icon, Menu } from 'antd';

import { imageBaseUrl } from '../utils/constants';
import { fetchTopCoins } from '../utils/apiHelper';

const menuItems = [
  { key: '7', label: 'Last 7 days' },
  { key: '30', label: 'Last month' },
  { key: '90', label: 'Last 3 months' },
  { key: '180', label: 'Last 6 months' },
  { key: '365', label: 'Last year' }
];

class CoinList extends Component {
  static propTypes = {
    onAddChart: PropTypes.func.isRequired
  };

  state = {
    loading: true,
    coins: []
  };

  componentWillMount() {
    fetchTopCoins().then(response => {
      this.setState({
        loading: false,
        coins: Object.values(response.data.Data).map(coin => ({
          ...coin.CoinInfo,
          ImageUrl: `${imageBaseUrl}${coin.CoinInfo.ImageUrl}`
        }))
      });
    });
  }

  handleMenuItemClick = (coin, menuItem) => {
    const { onAddChart } = this.props;

    onAddChart({
      key: `${coin.Name}-${menuItem.key}`,
      name: coin.FullName,
      interval: menuItem.item.props.children
    });
  };

  render() {
    const { loading, coins } = this.state;

    return (
      <Card
        bordered
        loading={loading}
        style={{
          overflow: 'auto',
          margin: '15px',
          height: 'calc(100vh - 30px)'
        }}
      >
        <List
          size="small"
          loading={loading}
          dataSource={coins}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      marginTop: '15px',
                      height: '15px',
                      width: '15px'
                    }}
                    src={item.ImageUrl}
                  />
                }
                title={item.FullName}
                description={item.Name}
              />
              <Dropdown
                overlay={
                  <Menu
                    onClick={menuItem => {
                      this.handleMenuItemClick(item, menuItem);
                    }}
                  >
                    {menuItems.map(menuItem => (
                      <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Button style={{ marginLeft: 8 }}>
                  Add chart <Icon type="down" />
                </Button>
              </Dropdown>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default CoinList;
