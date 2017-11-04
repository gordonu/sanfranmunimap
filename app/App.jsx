import React from 'react';
import SanFranMap from './SanFranMap'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = { locations: {} };
  }

  componentDidMount() {

    axios.get('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=N&t=1144953500233')
      .then(response => {
        // console.log(response)
        this.setState({ locations : response })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        {console.log('HERE!',this.state.locations)}
        <SanFranMap locations = {this.state.locations}/>
      </div>
    );
  }
}

export default App;
