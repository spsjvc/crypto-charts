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

  handleMenuItemClick = (coin, interval) => {
    const { onAddChart } = this.props;

    onAddChart(`${coin}-${interval}`);
  };

  render() {
    const { loading, coins } = this.state;

    return (
      <Card bordered={false} loading={loading}>
        <List
          bordered
          size="small"
          itemLayout="horizontal"
          loading={loading}
          dataSource={coins}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.ImageUrl} />}
                title={item.FullName}
              />
              <Dropdown
                overlay={
                  <Menu
                    onClick={menuItem => {
                      this.handleMenuItemClick(item.Name, menuItem.key);
                    }}
                  >
                    {menuItems.map(menuItem => (
                      <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus-circle-o" />
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
