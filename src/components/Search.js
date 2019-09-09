import React from "react";

const Search = props => {
  return (
    <div className="input-group p-1">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-search" />
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Enter tittle..."
        onKeyUp={props.handleChange}
      />
    </div>
  );
};

export default Search;
