import React from 'react';

const Checkbox = (props) => {
  const boxes = props.routes.map((ele) => {
    return (
      <div key={ele.tag} className="col-sm-3" >
        <label htmlFor="checkboxes">
          <input key={ele.tag} name={ele.tag} type="checkbox" checked={props.selections[`${ele.tag}`]} onChange={props.handleInputChange} />
          {ele.title}
        </label>
      </div>
    );
  });
  // Render checkboxes for all routes(
  return (
    <form>
      {boxes}
    </form >
  );
};

export default Checkbox;
