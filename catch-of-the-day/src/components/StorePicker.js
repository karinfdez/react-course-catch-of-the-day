import React, { Fragment } from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  //Creating properties of StorePicker (myInput and goToStore)
  myInput = React.createRef(); //To create a ref

  //Use this syntax to access component instance inside("this")
  goToStore = event => {
    //Stops the form from submitting
    event.preventDefault();
    //get data from user's input
    const storeName = this.myInput.value.value;
    //Change the page's router(Going to StorePicker we can see its props (history, location,  etc))
    this.props.history.push(`/store/${storeName}`); //Because the StorePicker is the child of the Router it has access to its props
  };

  render() {
    return (
      <Fragment>
        {/* In order to add multiples childrens */}
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          {/* Attach myInput ref  to React  elements via the ref attribute.*/}
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
