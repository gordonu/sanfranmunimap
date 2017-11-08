import React from 'react';
import * as d3 from 'd3';
import './main.css';
import Checkbox from './Checkbox';


class SanFranMap extends React.Component {
  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    d3.select(this.svg).selectAll('circle').remove();
    this.drawLocations();
  }

  drawMap() {
    const width = 920;
    const height = 800;

    // Set svg widgth & height
    const svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    // Define path generator, using the geoMercator projection
    const projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);

    // Tell path generator to reference projection when generating paths
    const path = d3.geoPath()
      .projection(projection);

    // Load in GeoJSON data
    d3.json('../sfmaps/arteries.json', (json) => {
      // Bind data and create one path per GeoJSON feature
      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('class', 'arteries')
        .attr('d', path);
    });

    d3.json('../sfmaps/freeways.json', (json) => {
      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('class', 'freeways')
        .attr('d', path);
    });

    d3.json('../sfmaps/neighborhoods.json', (json) => {
      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('class', 'neighborhoods')
        .attr('d', path);
    });

    d3.json('../sfmaps/streets.json', (json) => {
      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('class', 'streets')
        .attr('d', path);
    });
  }

  drawLocations() {
    const locations = this.props.locations;
    const selections = this.props.selections;

    // Filter locations to be rendered based on selections
    const data = locations.filter((ele) => {
      return selections[ele.routeTag] === true;
    });

    const width = 920;
    const height = 800;

    // Set svg widgth & height
    const svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    // Define path generator, using the geoMercator projection
    const projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);

    // Create circles for each location
    // Position each circle according to geo coordinates
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return projection([d.lon, d.lat])[0];
      })
      .attr('cy', (d) => {
        return projection([d.lon, d.lat])[1];
      })
      .attr('r', 4)
      .attr('id', (d) => {
        return d.routeTag;
      })
      .style('fill', '#2B3A67')
      .style('stroke', 'gray')
      .style('stroke-width', 0.25)
      .style('opacity', 0.75);
  }


  render() {
    return (
      <div className="col-md-12">
        <div className="text-center">
          <h1>San Francisco Muni Locations</h1>

          {/* Root SVG element */}
          <svg className="map" ref={(elem) => { this.svg = elem; }} />
        </div>
        <h2>Select Routes</h2>

        <input
          type="button"
          value="Select All"
          onClick={(event) => { this.props.handleSelectAll(event); }}
        />

        <input
          type="button"
          value="Select None"
          onClick={(event) => { this.props.handleSelectAll(event); }}
        />

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
