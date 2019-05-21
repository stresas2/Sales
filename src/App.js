import React from 'react';
import './App.css';
import Sales from './sales.json';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
                  sales: Sales,
                  createIteam: false,
                  modalIsOpen: false,
                  model: "",
                  newItem:
                          {
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
                          },
                  updateItem:
                          {
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
                          },
                  deleteIteam: {
                            id: null,
                            title: ""
                            }
                }
  }

  componentWillMount(){
    this.setState({ sales: Sales});
    Modal.setAppElement('body');

  }

  openCreateIteam = () => {
    this.setState({
                    sales: this.state.sales,
                    createIteam: true,
                    newItem:
                            {
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
  }

  closeIteam = () => {
    this.setState({ sales: this.state.sales, createIteam: false });
  }

  newItem = (event) => {

      const newItem = this.state.newItem

      if(event.target.id === "country" || event.target.id === "city" || event.target.id === "street" ||  event.target.id === "coor")
      {
        newItem["Location"][event.target.id] = event.target.value;
      }
      else
      {
        newItem[event.target.id] = event.target.value;
      }

      this.setState({
                      sales: this.state.sales,
                      newItem: newItem
                    })
  };

  freeNumber = (nums) => {
      const hashMap = {};
      for (let i = 0; i < nums.length; i++) {
        let value = nums[i];
        hashMap[value] = hashMap[value] + 1 || 1;
      }

      let count = 1;
      while (hashMap[count]) {
        count++;
      }

      return count;
  }

  submit = () => {

    const allItems = this.state.sales;
    let freeId = this.state.sales.map(a => a.id);

    const newItem = {
                id: this.freeNumber(freeId),
                Title: this.state.newItem.Title,
                Description: this.state.newItem.Description,
                Price: this.state.newItem.Price,
                Stock: this.state.newItem.Stock,
                Location: {
                  country: this.state.newItem.Location.country,
                  city: this.state.newItem.Location.country,
                  street: this.state.newItem.Location.country,
                  coor: this.state.newItem.Location.country
                }
              };

    allItems.push(newItem);

    this.setState({ sales: allItems });

    this.closeIteam();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () =>  {
    this.setState({ modalIsOpen: false, model: "" });
  }

  openDeleteModal = (event) => {
    this.setState({ modalIsOpen: true });
    let id = Number(event.target.getAttribute("path"));

    const result = this.state.sales.find( iteam => iteam.id === id );

    this.setState({deleteIteam: { id: result.id, title: result.Title }, model: "delete"});

  }

  deleteIteam = () => {

    let allItems = this.state.sales;

    for( var i = 0; i < allItems.length; i++){
       if ( allItems[i].id === Number(this.state.deleteIteam.id)) {
         allItems.splice(i, 1);
       }
    }

    this.setState({ sales: allItems, modalIsOpen: false, model: "" });

  }

  openSale = (id) => {
    const result = this.state.sales.find( iteam => iteam.id === id );

    this.setState({
                    updateItem: result,
                    model: "update"
                  })

    this.openModal();
  }

  update = (id) => {
    const updateItem = {
                id: id,
                Title: document.getElementById("updateTitle").value,
                Description: document.getElementById("updateDescription").value,
                Price: document.getElementById("updatePrice").value,
                Stock: document.getElementById("updateStock").value,
                Location: {
                  country: document.getElementById("updateCountry").value,
                  city: document.getElementById("updateCity").value,
                  street: document.getElementById("updateStreet").value,
                  coor: document.getElementById("updateCoor").value
                }
              };

    const index = this.state.sales.findIndex(x => x.id === id)
    let items = this.state.sales;
    items[index] = updateItem;

    this.setState({ sales: items, modalIsOpen: false, model: "" });
  }

  filter = (event) => {
    var input, filter, tbody, tr, td, i, txtValue;
    input = event.target.value
    filter = input.toUpperCase();
    tbody = document.getElementById("tbody");
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];

        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
  }

  render() {

    const listItems = this.state.sales.map((sales) =>
    <tr className="hoverTable" key={sales.id}>
      <th scope="row"  onClick={() => this.openSale(sales.id)}>{sales.id}</th>
      <td id="title" onClick={() => this.openSale(sales.id)}>{sales.Title}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Price}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Stock}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Location.country}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Location.city}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Location.street}</td>
      <td onClick={() => this.openSale(sales.id)}>{sales.Location.coor}</td>
      <td><i className="fa fa-close" style={{fontSize: "24px", color: "red"}} path={sales.id} onClick={this.openDeleteModal}></i></td>
    </tr>
    );

    const fullList =
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Country</th>
          <th scope="col">City</th>
          <th scope="col">Street</th>
          <th scope="col">Coordinates</th>
          <th></th>
        </tr>
      </thead>
      <tbody  id="tbody">
        {listItems}
      </tbody>
    </table>;

    const newItem =
    <form className="p-2">
      <div className="row">
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Title:</label>
          <input type="text" className="form-control form-control-sm" id="Title" onKeyUp={this.newItem}/>
        </div>
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Price:</label>
          <input type="text" className="form-control form-control-sm" id="Price" onKeyUp={this.newItem} />
        </div>
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Stock:</label>
          <input type="text" className="form-control form-control-sm" id="Stock" onKeyUp={this.newItem} />
        </div>
        </div>
        <hr />
        <p>Location:</p>
        <div className="row mt-md-3">
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Country" id="country" onKeyUp={this.newItem} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="City" id="city" onKeyUp={this.newItem} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Street" id="street" onKeyUp={this.newItem} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Coordinates" id="coor" onKeyUp={this.newItem} />
          </div>

        </div>
        <hr />
        <p>Description:</p>
        <div className="row">
          <div className="col">
            <textarea  type="text" className="form-control form-control-sm" rows="5" id="Description" onKeyUp={this.newItem} />
          </div>
        </div>


          <center> <button type="button" className="btn align-middle btn-primary m-2 ml-0" onClick={this.submit}>Submit</button> </center>

    </form>;

    const updateItem =
    <form className="p-2">
      <div className="row">
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Title:</label>
          <input type="text" className="form-control form-control-sm" id="updateTitle" defaultValue={this.state.updateItem.Title} />
        </div>
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Price:</label>
          <input type="text" className="form-control form-control-sm" id="updatePrice" defaultValue={this.state.updateItem.Price}  />
        </div>
        <div className="col-12 col-md-4 py-1 py-md-0">
          <label>Stock:</label>
          <input type="text" className="form-control form-control-sm" id="updateStock" defaultValue={this.state.updateItem.Stock}  />
        </div>
        </div>
        <hr />
        <p>Location:</p>
        <div className="row mt-md-3">
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Country" id="updateCountry" defaultValue={this.state.updateItem.Location.country} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="City" id="updateCity" defaultValue={this.state.updateItem.Location.city} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Street" id="updateStreet" defaultValue={this.state.updateItem.Location.street} />
          </div>
          <div className="col-12 col-md-3 py-1 py-md-0">
            <input type="text" className="form-control form-control-sm" placeholder="Coordinates" id="updateCoor" defaultValue={this.state.updateItem.Location.coor} />
          </div>

        </div>
        <hr />
        <p>Description:</p>
        <div className="row">
          <div className="col">
            <textarea  type="text" className="form-control form-control-sm" rows="5" id="updateDescription" defaultValue={this.state.updateItem.Description}  />
          </div>
        </div>


          <center> <button type="button" className="btn align-middle btn-primary m-2 ml-0" onClick={() => this.update(this.state.updateItem.id)}>Update</button> <button type="button" className="btn align-middle btn-primary m-2 ml-0" onClick={this.closeModal}>Cancel</button> </center>

    </form>;

    const button = this.state.createIteam ? <button type="button" className="btn btn-primary m-2" onClick={this.closeIteam}>Close</button> : <button type="button" className="btn btn-primary m-2" onClick={this.openCreateIteam}>Create Iteam</button>;

    const modelDelete = <div>
                          <center><p>Are you sure you want delete this order?</p></center>
                          <center>
                            <p>
                              <b>{this.state.deleteIteam.id}# </b>
                              {this.state.deleteIteam.title}
                            </p>
                          </center>
                          <center>
                            <button className="btn align-middle btn-primary m-2 ml-0" onClick={this.deleteIteam}>Yes</button>
                            <button className="btn align-middle btn-primary m-2 ml-0" onClick={this.closeModal}>Close</button>
                          </center>
                        </div>;

    return(
      <div className="center" style={{width: "80%", minWidth: "700px"}}>

        <div className="bg-light my-2 rounded shadow">
            {button}
            {this.state.createIteam ? newItem : null}

        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          {this.state.model === "delete" ? modelDelete : null}
          {this.state.model === "update" ? updateItem : null}

        </Modal>

        <div className="bg-light my-2 rounded shadow">

          <div className="input-group p-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
            </div>
            <input type="text" className="form-control" onKeyUp={this.filter} placeholder="Enter tittle..." />
          </div>

        </div>

        <div className="bg-light my-2 rounded shadow">

            {fullList}

        </div>
      </div>
    );

  }
}

export default App;
