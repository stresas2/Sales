import React, { Component } from "react";
import Sales from "../sales.json";
import { Transition } from "react-spring/renderprops";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: Sales,
      modalIsOpen: false,
      modalType: null,
      deleteIteam: {
        id: null,
        title: ""
      },
      updateItem: null,
      search: "",
      filtredSales: Sales
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.sale !== prevProps.sale) {
      const prop = this.props.sale;
      const data = this.state.sales;
      let idValues = [];

      data.forEach(data => {
        idValues.push(data.id);
      });
      const id = this.unusedId(idValues);
      prop.id = id;
      data.push(prop);

      this.setState({ sales: data }, () => {
        this.search();
      });
    }
    if (this.props.search !== prevProps.search) {
      this.setState({ search: this.props.search }, () => {
        this.search();
      });
    }
  };

  search = () => {
    let input = this.state.search.toUpperCase();
    let { sales } = this.state;
    let data = [];
    sales.forEach(sale => {
      if (sale.Title.toUpperCase().indexOf(input) > -1) {
        data.push(sale);
      }
    });
    this.setState({ filtredSales: data });

    console.log(this.state.filtredSales);
  };

  unusedId = ids => {
    let id = ids.sort((a, b) => {
      return a - b;
    });

    for (let i = 1; i < 1000000; i++) {
      if (!id.includes(i)) return i;
    }
  };
  openSaleModal = id => {
    let data = JSON.parse(JSON.stringify(this.state.sales));
    data = data.filter(data => data.id === id);
    this.setState({ updateItem: data[0] });
    this.setState({ modalIsOpen: true, modalType: "update" });
  };

  updateSales = id => {
    let data = this.state.sales;
    data[data.findIndex(el => el.id === id)] = this.state.updateItem;
    this.setState({ sales: data, modalIsOpen: false }, () => {
      this.search();
    });
  };

  updateItem = e => {
    let item = this.state.updateItem;
    if (
      e.target.name === "city" ||
      e.target.name === "coor" ||
      e.target.name === "country" ||
      e.target.name === "street"
    ) {
      item["Location"][e.target.name] = e.target.value;
    } else {
      item[e.target.name] = e.target.value;
    }

    this.setState({ updateItem: item });
  };

  openDeleteModal = id => {
    let data = this.state.sales;
    data = data.filter(data => data.id === id);
    this.setState({ deleteIteam: { id: data[0].id, title: data[0].Title } });
    this.setState({ modalIsOpen: true, modalType: "delete" });
  };

  deleteIteam = () => {
    let data2 = this.state.sales;
    data2 = data2.filter(data => data.id !== this.state.deleteIteam.id);
    this.setState({ sales: data2, modalIsOpen: false, modalType: null }, () => {
      this.search();
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalType: null });
  };

  render() {
    const updateItem = this.state.updateItem ? (
      <form>
        <div className="row">
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Title:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              defaultValue={this.state.updateItem.Title}
              onKeyUp={this.updateItem}
              name="Title"
            />
          </div>
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Price:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              defaultValue={this.state.updateItem.Price}
              onKeyUp={this.updateItem}
              name="Price"
            />
          </div>
          <div className="col-12 col-md-4 py-1 py-md-0">
            <label>Stock:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              defaultValue={this.state.updateItem.Stock}
              onKeyUp={this.updateItem}
              name="Stock"
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
              defaultValue={this.state.updateItem.Location.country}
              onKeyUp={this.updateItem}
              name="country"
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="City"
              defaultValue={this.state.updateItem.Location.city}
              onKeyUp={this.updateItem}
              name="city"
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Street"
              defaultValue={this.state.updateItem.Location.street}
              onKeyUp={this.updateItem}
              name="street"
            />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Coordinates"
              defaultValue={this.state.updateItem.Location.coor}
              onKeyUp={this.updateItem}
              name="coor"
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
              defaultValue={this.state.updateItem.Description}
              onKeyUp={this.updateItem}
              name="Title"
            />
          </div>
        </div>

        <center>
          <button
            type="button"
            className="btn align-middle btn-primary m-2 ml-0"
            onClick={() => this.updateSales(this.state.updateItem.id)}
          >
            Update
          </button>
          <button
            type="button"
            className="btn align-middle btn-primary m-2 ml-0"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </center>
      </form>
    ) : null;

    const deleteModal = (
      <div>
        <center>
          <p>Are you sure you want delete this order?</p>
        </center>
        <center>
          <p>
            <b>{this.state.deleteIteam.id}# </b>
            {this.state.deleteIteam.title}
          </p>
        </center>
        <center>
          <button
            className="btn align-middle btn-primary m-2 ml-0"
            onClick={this.deleteIteam}
          >
            Yes
          </button>
          <button
            className="btn align-middle btn-primary m-2 ml-0"
            onClick={this.closeModal}
          >
            Close
          </button>
        </center>
      </div>
    );

    let listData2 = Array.isArray(this.state.filtredSales)
      ? "filtredSales"
      : "sales";

    let list = this.state[listData2];

    const listItems = (
      <Transition
        items={list}
        //config={{ duration: 3000 }}
        keys={list.map(sale => sale.id)}
        from={{ opacity: 0, maxHeight: 0 }}
        enter={{ opacity: 1, maxHeight: "auto" }}
        leave={{ opacity: 0, maxHeight: 0, border: 0 }}
      >
        {item => props => {
          return (
            <tr className="hovertable" style={props}>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 ml-2 small">{item.id}</p>
                </div>
              </td>
              <td
                id="title"
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Title}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Price}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Stock}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Location.country}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Location.city}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Location.street}</p>
                </div>
              </td>
              <td
                onClick={() => this.openSaleModal(item.id)}
                className="p-0"
                style={props}
              >
                <div style={props}>
                  <p className="p-2 m-0 small">{item.Location.coor}</p>
                </div>
              </td>
              <td className="p-0" style={props}>
                <div style={props}>
                  <i
                    className="fa fa-close p-2 small"
                    style={{
                      fontSize: "24px",
                      color: "red"
                    }}
                    path={item.id}
                    onClick={this.openDeleteModal.bind(this, item.id)}
                  />
                </div>
              </td>
            </tr>
          );
        }}
      </Transition>
    );

    const fullList = (
      <div className="table-responsive scroll-wrapper ">
        <table className="table text-wrap m-0">
          <thead>
            <tr>
              <th scope="col small">ID</th>
              <th scope="col small">Title</th>
              <th scope="col small">Price</th>
              <th scope="col small">Stock</th>
              <th scope="col small">Country</th>
              <th scope="col small">City</th>
              <th scope="col small">Street</th>
              <th scope="col small">Coordinates</th>
              <th scope="col small"></th>
            </tr>
          </thead>
          <tbody id="tbody">{listItems}</tbody>
        </table>
      </div>
    );

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="frame">
            <div className="modal-body">
              {this.state.modalType === "delete" ? deleteModal : null}
              {this.state.modalType === "update" ? updateItem : null}
            </div>
          </div>
        </Modal>
        <div>{fullList}</div>
      </div>
    );
  }
}

export default Board;
