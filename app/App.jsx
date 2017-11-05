import React from 'react';
import SanFranMap from './SanFranMap'
import axios from 'axios';

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

  getLocation() {
    let uri = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=N&t=0'

    setInterval(axios.get(uri)
      .then(response => {
        console.log(response)
        this.setState({ locations: response})
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      }), 15000)
  }

  render() {
    return (
      <div>
        <SanFranMap locations={this.state.locations} />
      </div>
    );
  }
}

export default App;


