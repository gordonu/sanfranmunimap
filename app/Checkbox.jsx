import React from 'react';

class Checkbox extends React.Component {

  render() {
    let boxes = this.props.routes.map((ele) => {
      return (
        <div className="col-sm-3" >
          <label>
            {ele.title}
            <input name={ele.tag} type="checkbox" checked={this.props.selections[`${ele.tag}`]} onChange={this.props.handleInputChange} />
          </label>
        </div>
      )
    })
    return (
      <form>
        {boxes}
      </form>
    );
  }
}

export default Checkbox;