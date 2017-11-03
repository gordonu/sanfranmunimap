import React from 'react';
import * as d3 from 'd3';
import './main.css';

class SanFranMap extends React.Component {

  componentDidMount() {
    console.log("HELLLOOOO!!!")
    this.drawChart();
  }

  // componentDidUpdate() {
  //   d3.select(this.svg).selectAll("g").remove();
  //   this.drawChart();
  // }

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  drawChart() {
    /*
      D3 code to create our visualization by appending onto this.svg
    */

    var width = 960
    var height = 500
    //Set svg widgth & height
    var svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    //Define path generator, using the Albers USA projection

    var projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);


    var path = d3.geoPath()
      .projection(projection);


    // var path = d3.geoPath()
    //   .projection(d3.geoAlbersUsa());

    //Load in GeoJSON data
    d3.json("../sfmaps/freeways.json", function (json) {
      console.log(json)
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);

    });



  }

  render() {
    return (
      <div>
        <h1>HELLLLOOO!!!!!</h1>
        <svg className="chart" ref={(elem) => { this.svg = elem; }}>
        </svg>
      </div>
    );
  }
}

export default SanFranMap;

