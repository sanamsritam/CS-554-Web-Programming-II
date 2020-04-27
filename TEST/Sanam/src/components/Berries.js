import React, { Component } from "react";
import axios from "axios";

class Berries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: undefined,
    };
  }
  componentWillMount() {
    this.getBerry();
  }
  async getBerry() {
    this.setState({
      loading: true,
    });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
      );

      if (this.props.match.params.id === "page") throw `No page found`;
      this.setState({
        data: response.data,
        loading: false,
      });
    } catch (e) {
      console.log(`error ${e}`);
      this.setState({
        loading: false,
        error: `${e}`,
      });
    }
  }
  render() {
    let body = null;

    if (this.state.loading) {
      body = (
        <div>
          <h1>Berry</h1>
          <br />
          Loading...
        </div>
      );
    } else if (this.state.error) {
      body = (
        <div>
          <h1>404 Page Not Found</h1>
        </div>
      );
    } else if (this.state.data) {
      body = (
        <div>
          <h2 className="cap-first-letter">
            {this.state.data && this.state.data.name}
          </h2>

          <p>
            <br />
            Berry ID: {this.state.data.id}
            <br />
            Growth Time: {this.state.data.growth_time} <br />
            Max Harvest: {this.state.data.max_harvest}
            <br />
            Natural Gift Power: {this.state.data.natural_gift_power}
            <br />
            Size: {this.state.data.size}
            <br />
            Firmness: {this.state.data.firmness.name}
            <br />
          </p>
        </div>
      );
    }
    return body;
  }
}

export default Berries;
