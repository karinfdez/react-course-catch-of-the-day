import React, { Fragment } from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  //Creating properties of StorePicker (myInput and goToStore)
  myInput = React.createRef();

  //Use this syntax to access component instance inside("this")
  goToStore = event => {
    event.preventDefault(); //Stops the form from submitting
    console.log(this);
  };

  render() {
    return (
      <Fragment>
        {/* In order to add multiples childrens */}
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store -></button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
