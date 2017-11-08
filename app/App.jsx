import React from 'react';
import axios from 'axios';
import SanFranMap from './SanFranMap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      routes: [],
      selections: {},
      firstRunFlag: true,
    };

    this.getLocationConcurrent = this.getLocationsRoutesConcurrent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentDidMount() {
    this.getLocationsRoutesConcurrent();
  }

  getLocationsRoutesConcurrent() {
    const vehicleLocations = `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${Date.now}`;
    const routeList = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni';

    // Using axios to perform multiple concurrent requests
    function getVehicleLocations() {
      return axios.get(vehicleLocations);
    }

    function getRouteList() {
      return axios.get(routeList);
    }

    axios.all([getVehicleLocations(), getRouteList()])
      .then(axios.spread((locations, routes) => {
        // Both requests are now complete
        // Set state with response and set all selections to initially be true
        if (this.state.firstRunFlag === true) {
          const obj = {};
          routes.data.route.map((ele) => {
            return ele.tag;
          }).forEach((ele) => {
            obj[ele] = true;
          });

          this.setState({
            locations: locations.data.vehicle,
            routes: routes.data.route,
            selections: obj,
            firstRunFlag: false,
          });

          // Set state with response without overwriting selections
        } else {
          this.setState({
            locations: locations.data.vehicle,
            routes: routes.data.route,
          });
        }
      }));
    // Invoke getLocationConcurrent every 15 seconds
    setTimeout(() => { this.getLocationsRoutesConcurrent(); }, 15000);
  }

  // Handler function for checkboxes
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // Create copy of object
    const selections = Object.assign({}, this.state.selections);
    // Update value
    selections[name] = value;
    this.setState({ selections });
  }

  // Handler function for 'Select All' and 'Select None' buttons
  handleSelectAll(event) {
    const target = event.target;
    const bool = target.value === 'Select All';
    const selections = Object.assign({}, this.state.selections);
    // Create copy of object
    const selectionKeys = Object.keys(selections);

    selectionKeys.forEach((ele) => {
      // Update value
      selections[ele] = bool;
    });

    this.setState({ selections });
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
