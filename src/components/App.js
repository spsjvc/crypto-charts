import React, { Component } from 'react';

import ExampleGrid from './ExampleGrid';

import { imageBaseUrl } from '../utils/constants';
import { fetchTopCoins } from '../utils/httpHelper';

class App extends Component {
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
      <div>
        <ExampleGrid />

        {loading ? (
          <div>Loading coins...</div>
        ) : (
          <div>
            <ul>
              {coins.map(coin => (
                <div key={coin.Name}>
                  {`${coin.FullName} (${coin.Name})`}
                  <img
                    alt={coin.FullName}
                    src={coin.ImageUrl}
                    style={{ width: '25px', height: '25px' }}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;
