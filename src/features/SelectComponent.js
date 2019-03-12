import React, { Component } from "react";

class SelectComponent extends Component {
  state = {
    value: "india"
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    this.props.onOptionChange(this.state.value);
    event.preventDefault();
  };
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "4%" }}>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="india">India</option>
            <option value="france">France</option>
            <option value="canada">Canada</option>
            <option value="china">China</option>
            <option value="greece">Greece</option>
            <option value="japan">Japan</option>
          </select>
          <input
            type="submit"
            className="close-btn"
            style={{
              background: "rgb(244, 114, 61)"
            }}
            value="Search"
          />
        </form>
      </div>
    );
  }
}

export default SelectComponent;
