import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { minBy, maxBy } from 'lodash';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import {
  formatToUsd,
  liveFormatToUsd,
  smartFormatToUsd
} from '../utils/formatHelper';
import { fetchDataForChart, fetchLiveDataForChart } from '../utils/apiHelper';

class CoinChart extends Component {
  static propTypes = {
    chart: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    data: null,
    isLive: false
  };

  componentWillMount() {
    const { chart } = this.props;

    const coin = chart.split('-')[0];
    const interval = chart.split('-')[1];

    if (interval === 'live') {
      fetchLiveDataForChart(coin).then(response => {
        this.setState(
          {
            data: response.data.Data,
            isLive: true
          },
          () => {
            this.liveInterval = setInterval(() => {
              fetchLiveDataForChart(coin).then(response => {
                this.setState({
                  data: response.data.Data
                });
              });
            }, 60000);
          }
        );
      });

      return;
    }

    fetchDataForChart(coin, interval).then(response => {
      this.setState({
        data: response.data.Data
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.liveInterval);
  }

  render() {
    const { data, isLive } = this.state;

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
            tickFormatter={tick =>
              isLive
                ? moment.unix(tick).format('LTS')
                : moment.unix(tick).format('LL')
            }
          />
          {isLive ? (
            <YAxis
              type="number"
              domain={[minBy(data, d => d.low), maxBy(data, d => d.high)]}
              tickFormatter={tick => smartFormatToUsd(tick)}
            />
          ) : (
            <YAxis tickFormatter={tick => smartFormatToUsd(tick)} />
          )}

          <Tooltip
            formatter={(value, name, props) =>
              isLive ? liveFormatToUsd(value) : formatToUsd(value)
            }
            labelFormatter={tick =>
              isLive
                ? moment.unix(tick).format('LTS')
                : moment.unix(tick).format('LL')
            }
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
