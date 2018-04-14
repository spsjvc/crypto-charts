import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { formatToUsd, formatToUsdUnderOne } from '../utils/formatHelper';
import { fetchDailyDataForCoin } from '../utils/apiHelper';

class CoinChart extends Component {
  static propTypes = {
    coin: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    data: null
  };

  componentWillMount() {
    const { coin } = this.props;

    fetchDailyDataForCoin(coin).then(response => {
      this.setState({
        data: response.data.Data
      });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            tickFormatter={tick => moment.unix(tick).format('LL')}
          />
          <YAxis
            tickFormatter={tick =>
              tick > 1 ? formatToUsd(tick) : formatToUsdUnderOne(tick)
            }
          />
          <Tooltip
            formatter={(value, name, props) =>
              value > 1 ? formatToUsd(value) : formatToUsdUnderOne(value)
            }
            labelFormatter={label => moment.unix(label).format('LL')}
          />
          <Area
            type="monotone"
            dataKey="low"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorLow)"
          />
          <Area
            type="monotone"
            dataKey="high"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorHigh)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default CoinChart;
