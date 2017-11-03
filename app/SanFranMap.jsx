import React from 'react';
import * as d3 from 'd3';

class SanFranMap extends React.Component {

  conponentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    d3.select(this.svg).selectAll("g").remote();
    this.drawChart();
  }

  drawChart() {

  }

  render() {
    return (
      <div>
        <svg ref={(elem) => { this.svg = elem; }}>
        </svg>
      </div>
    );
  }
}

export default SanFranMap
