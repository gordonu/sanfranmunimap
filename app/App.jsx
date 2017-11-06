import React from 'react';
import SanFranMap from './SanFranMap'
import axios from 'axios';
import * as d3 from 'd3';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: {},
      date: ''
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    // setInterval(this.getLocation(), 15000)
  }

  componentWillUnmount() {
      clearTimeout(this.timeout);
    }

  // handleChange (val) {
  //   console.log('handleChange executed', val)
  //   d3.select(this.svg).selectAll("circle").remove();
  // }
 
  getLocation() {
    // let uri = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0'
    let uri = `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${Date.now}`

    setInterval(axios.get(uri)
      .then(response => {
        console.log(response)
        this.setState({ locations: response})
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      }), 15000)
  }

  // handleChange (val) {
  //   console.log('handleChange executed', val)
  //   d3.select(this.svg).selectAll("circle").remove();
  // }


  render() {
    return (
      <div>
        <SanFranMap 
        locations={this.state.locations} 
        handleChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;


