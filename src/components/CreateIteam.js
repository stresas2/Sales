import React, { Component } from "react";
import { animated, Transition } from "react-spring/renderprops"; // this import works

class CreateIteam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createIteam: false,
      newItem: {
        id: null,
        Title: "",
        Description: "",
        Price: null,
        Stock: null,
        Location: {
          country: "",
          city: "",
          street: "",
          coor: ""
        }
      }
    };
  }

  submit = props => {
    this.props.data(JSON.parse(JSON.stringify(this.state.newItem)));
  };

  openCreateIteam = () => {
    this.setState({
      createIteam: true,
      newItem: {
        id: null,
        Title: "",
        Description: "",
        Price: null,
        Stock: null,
        Location: {
          country: "",
          city: "",
          street: "",
          coor: ""
        }
      }
    });
  };

  closeIteam = () => {
    this.setState({
      sales: this.state.sales,
      createIteam: false
    });
  };

  newItem = event => {
    const newItem = this.state.newItem;

    if (
      event.target.id === "country" ||
      event.target.id === "city" ||
      event.target.id === "street" ||
      event.target.id === "coor"
    ) {
      newItem["Location"][event.target.id] = event.target.value;
    } else {
      newItem[event.target.id] = event.target.value;
    }

    this.setState({ sales: this.state.sales, newItem: newItem });
  };

  render() {
    const newItem = (
      <form className="p-2">
        <div className="row">
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Title:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="Title"
              onKeyUp={this.newItem}
            />
          </div>
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Price:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="Price"
              onKeyUp={this.newItem}
            />
          </div>
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Stock:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="Stock"
              onKeyUp={this.newItem}
            />
          </div>
        </div>
        <hr />
        <p>Location:</p>
        <div className="row mt-md-3">
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Country"
              id="country"
              onKeyUp={this.newItem}
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="City"
              id="city"
              onKeyUp={this.newItem}
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Street"
              id="street"
              onKeyUp={this.newItem}
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Coordinates"
              id="coor"
              onKeyUp={this.newItem}
            />
          </div>
        </div>
        <hr />
        <p>Description:</p>
        <div className="row">
          <div className="col">
            <textarea
              type="text"
              className="form-control form-control-sm"
              rows="5"
              id="Description"
              onKeyUp={this.newItem}
            />
          </div>
        </div>

        <center>
          <button
            type="button"
            className="btn align-middle btn-primary m-2 ml-0"
            onClick={this.submit}
          >
            Submit
          </button>
        </center>
      </form>
    );

    const button = this.state.createIteam ? (
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={this.closeIteam}
      >
        Close
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={this.openCreateIteam}
      >
        Create Iteam
      </button>
    );

    return (
      <div className="overflow">
        {button}
        <Transition
          native
          items={this.state.createIteam}
          from={{ opacity: 0, height: 0 }}
          enter={[{ opacity: 1, height: "auto" }]}
          leave={[{ opacity: 0, height: 0 }]}
        >
          {show =>
            show &&
            (props => <animated.div style={props}>{newItem}</animated.div>)
          }
        </Transition>
      </div>
    );
  }
}

export default CreateIteam;
