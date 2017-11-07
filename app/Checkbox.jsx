import React from 'react';

class Checkbox extends React.Component {

  render() {
    let boxes = this.props.routes.map((ele, i) => {
      return (
        <div key={i} className="col-sm-3" >

          <label>
            <input key={i} name={ele.tag} type="checkbox" checked={this.props.selections[`${ele.tag}`]} onChange={this.props.handleInputChange} />
            {ele.title}
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