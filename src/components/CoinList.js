import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Card, Button, Icon } from 'antd';

import { imageBaseUrl } from '../utils/constants';
import { fetchTopCoins } from '../utils/apiHelper';

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

  render() {
    const { onAddChart } = this.props;
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
              <Button
                type="primary"
                onClick={() => {
                  onAddChart(item.Name);
                }}
              >
                <Icon type="plus-circle-o" />
              </Button>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default CoinList;
