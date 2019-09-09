import React, { Component } from "react";
import Board from "./components/Board";
import CreateIteam from "./components/CreateIteam";
import Search from "./components/Search";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      newIteam: ""
    };
  }

  setSearchnName = event => {
    this.setState({
      search: event.target.value
    });
  };

  addSale = data => {
    this.setState({ newIteam: data });
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <div className="bg-light mx-2 rounded shadow mb-2 trans">
          <CreateIteam data={this.addSale.bind(this)} />
        </div>

        <div className="bg-light mx-2 rounded shadow mb-2">
          <Search handleChange={this.setSearchnName} />
        </div>
        <div className="bg-light mx-2 rounded shadow">
          <Board sale={this.state.newIteam} search={this.state.search} />
        </div>
      </div>
    );
  }
}

export default App;
