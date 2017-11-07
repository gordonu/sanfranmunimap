import React from 'react';
import SanFranMap from './SanFranMap'
import axios from 'axios';
import * as d3 from 'd3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      routes: [],
      selections: {},
      firstRunFlag: true
    };

    this.getLocationConcurrent = this.getLocationConcurrent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentDidMount() {
    this.getLocationConcurrent();
  }

  getLocationConcurrent() {

    let firstRunFlag = true

    let vehicleLocations = `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${Date.now}`
    let routeList = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni'

    function getVehicleLocations() {
      return axios.get(vehicleLocations);
    }

    function getRouteList() {
      return axios.get(routeList);
    }

    axios.all([getVehicleLocations(), getRouteList()])
      .then(axios.spread((locations, routes) => {
        
        // Both requests are now complete
        if (this.state.firstRunFlag === true) {
          let obj = {};

          let routeAry = routes.data.route.map((ele) => {
            return ele.tag
          }).forEach((ele) => {
            obj[ele] = true
          })

          this.setState({
            locations: locations.data.vehicle,
            routes: routes.data.route,
            selections: obj,
            firstRunFlag: false
          })


        } else {
          this.setState({
            locations: locations.data.vehicle,
            routes: routes.data.route
          })
        }

      }));

    setTimeout(() => { this.getLocationConcurrent() }, 15000)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let selections = Object.assign({}, this.state.selections);    //creating copy of object
    selections[name] = value;                        //updating value
    this.setState({ selections });
  }

  handleSelectAll(event) {
    const target = event.target;
    const value = target.value

    const bool = target.value === 'Select All' ? true : false;

    let selections = Object.assign({}, this.state.selections);    //creating copy of object
    let selectionKeys = Object.keys(selections);

    selectionKeys.forEach((ele) => {
      selections[ele] = bool;
    })

    this.setState({ selections })
  }

  
  render() {
    return (
      <div>

        <SanFranMap
          locations={this.state.locations}
          routes={this.state.routes}
          selections={this.state.selections}
          handleInputChange={this.handleInputChange}
          handleSelectAll={this.handleSelectAll}
        />

      </div>
    );
  }
}

export default App;


