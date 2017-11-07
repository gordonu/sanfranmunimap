const React = require(‘react’);
const ReactDOM = require(‘react-dom’);
const MyTooltipComponent = require('my-tooltip-component');
  
class MyGraphComponent extends React.Component {
  componentDidMount() {
    this.drawChart();
  }
  
  shouldComponentUpdate() {
    return false;
  }
  
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tooltipTarget);
  }
  
  drawChart() {
    /* 
      D3 code to create our visualization by appending onto this.svg 
    */
    
    // At some point we render a child, say a tooltip
    const tooltipData = ...
    this.renderTooltip([50, 100], tooltipData);
  }
  
  render() {
    return (
      <div>
        <div ref={(elem) => { this.tooltipTarget = elem; }} />
        <svg ref={(elem) => { this.svg = elem; }}>
        </svg>
      </div>
    );
  }
  
  renderTooltip(coordinates, tooltipData) {
    const tooltipComponent = (
      <MyTooltipComponent
        coordinates={coordinates}
        data={tooltipData} />
    );
     
    ReactDOM.render(tooltipComponent, this.tooltipTarget);
  }
}