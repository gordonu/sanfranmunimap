import React from 'react';

function fetchData(feed) {
  return fetch(`/${feed}`);
}

export default function withPolling(WrappedComponent) {
  return class extends React.Component {
    state = {
      data: undefined
    };

    nextReq() {
      const { interval, stopPolling } = this.props;
      const { data } = this.state;
      if (this.mounted && !stopPolling(data)) {
        this.timeout = setTimeout(this.getData, interval);
      }
    }

    getData = () => {
      const { feed } = this.props;
      fetchData(feed)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error();
        })
        .then(data => {
          this.setState({
            data
          }, () => {
            this.nextReq();
          });
        })
        .catch(err => {
          this.nextReq();
          console.log(err);
        });
    }

    componentDidMount() {
      this.mounted = true;
      this.getData();
    }

    componentWillUnmount() {
      this.mounted = false;
      clearTimeout(this.timeout);
    }

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent
          liveData={data}
          isLive
          {...this.props}
        />
      );
    }
  };
}
