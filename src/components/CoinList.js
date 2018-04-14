import React, { Component } from 'react';
import { List, Avatar } from 'antd';

import { imageBaseUrl } from '../utils/constants';
import { fetchTopCoins } from '../utils/apiHelper';

class CoinList extends Component {
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

  render() {
    const { loading, coins } = this.state;

    return (
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
          </List.Item>
        )}
      />
    );
  }
}

export default CoinList;
