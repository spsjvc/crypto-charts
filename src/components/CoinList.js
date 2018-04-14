import React, { Component } from 'react';
import { List, Avatar, Card } from 'antd';

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
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default CoinList;
