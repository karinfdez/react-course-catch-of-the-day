import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {  //Persist data if store exists
      this.setState({ order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {   //Stores a reference to the database using the store's name and a document of fishes
      context: this,
      state: "fishes"
    }); 
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);  //Removes binding to database reference
  }


  addToOrder = key => {
    const order = { ...this.state.order };
    //Either add to order, or update the numberin our oder
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove that item from order
    delete order[key];  //No need to mirror with firsebase
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  addFish = fish => {
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };

    //2. Add a new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;

    //3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };

    // 2. Update that state
    fishes[key] = updatedFish;

    // 3. Set that to state
    this.setState({fishes})
  }

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state (using this approach  in order to be removed also from firebase)
    fishes[key] = null;
    //3. update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map( key => 
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
