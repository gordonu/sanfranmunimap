import React from 'react';
import * as d3 from 'd3';
import './main.css';
import Checkbox from './Checkbox'

class SanFranMap extends React.Component {

  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    d3.select(this.svg).selectAll("circle").remove();
    this.drawLocations();
  }

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  drawMap() {
    /*
      D3 code to create our visualization by appending onto this.svg
    */

    var width = 920
    var height = 800

    //Set svg widgth & height
    var svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    //Select checkbox**********************************************
    // d3.select("#nValue").on("change", function () {
    //   // console.log(this.value)
    //   // update(+this.value);
    // });

    //Define path generator, using the Albers USA projection
    var projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);


    var path = d3.geoPath()
      .projection(projection);

    //Load in GeoJSON data
    d3.json("../sfmaps/arteries.json", function (json) {
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "arteries")
        .attr("d", path);

    });

    d3.json("../sfmaps/freeways.json", function (json) {
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "freeways")
        .attr("d", path);

    });

    d3.json("../sfmaps/neighborhoods.json", function (json) {
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "neighborhoods")
        .attr("d", path);

    });

    d3.json("../sfmaps/streets.json", function (json) {
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "streets")
        .attr("d", path);

    });
  }

  drawLocations() {

    //persist object storing status of routes in state
    //when checkbox is checked it triggers a rerender of the component
    //when component rerenders it triggers removal and drawLocations in componentDidUpdate
    //drawLocations renders locations based on object in state using filter method
    //drawlocations always renders based on selections.

    let locations = this.props.locations
    let selections = this.props.selections

    let data = locations.filter(function (ele) {
      return selections[ele.routeTag] === true
    })

    var width = 920
    var height = 800
    //Set svg widgth & height
    var svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    var projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);

    var formatAsThousands = d3.format(",");

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", 5)
      .attr("id", function (d) {
        return d.routeTag
      })
      .style("fill", "purple")
      .style("stroke", "gray")
      .style("stroke-width", 0.25)
      .style("opacity", 0.75)
      .append("title")			//Simple tooltip
      .text(function (d) {
        return d.place + ": Pop. " + formatAsThousands(d.population);   //*********** */
      });
  }

  render() {
    return (
      <div>
        <h1>San Francisco Muni Locations</h1>
        <svg className="chart" ref={(elem) => { this.svg = elem; }}>
        </svg>
        <h2>Select Routes</h2>

        <input type="button" value="Select All" onClick={(event) => { this.props.handleSelectAll(event) }} />
        <input type="button" value="Select None" onClick={(event) => { this.props.handleSelectAll(event) }} />
        
        <Checkbox
          routes={this.props.routes}
          selections={this.props.selections}
          handleInputChange={this.props.handleInputChange}
        />
      </div>
    );
  }
}

export default SanFranMap;

