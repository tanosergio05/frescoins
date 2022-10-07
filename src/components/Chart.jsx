import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=true"
      )

      .then((res) => {
        const x = res.data;
        let y = [];
        x.forEach((element) => {
          y.push(element.sparkline_in_7d.price);
        });

        console.log(y);

        this.setState({
          chartData: {
            labels: y,
            datasets: [
              {
                data: y,
              },
            ],
          },
          data: y,
        });
      });
  }

  render() {
    return (
      <div className="chart">
        //*WORKS*
        {/* {this.state.data.map((n, index) => {
                               return (
                                <li key={index}>{n}</li>
                            );
                })} */}
        //*DOES NOT WORK*
        {this.state.chartData.map((n, index) => {
          return <Line key={index} data={n} />;
        })}
      </div>
    );
  }
}

export default Chart;
