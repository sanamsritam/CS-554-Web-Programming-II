import React, { Component } from "react";
import axios from "axios";

class Machine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: undefined,
    };
  }
  componentWillMount() {
    this.getMachine();
  }
  async getMachine() {
    this.setState({
      loading: true,
    });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
      );

      if (this.props.match.params.id === "page") throw `No page found`;
      this.setState({
        data: response.data,
        loading: false,
      });
    } catch (e) {
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
          <h1>Machine</h1>
          <br />
          Loading...
        </div>
      );
    } else if (this.state.error) {
      body = (
        <div>
          <h1>Error 404 Page Not Found</h1>
        </div>
      );
    } else {
      body = (
        <div>
          <p>
            <h2 className="cap-first-letter">
              Machine Id: {this.state.data.id}
            </h2>
            <br />
            Item name: {this.state.data.item.name} <br />
            Move: {this.state.data.move.name}
            <br />
            Version Group: {this.state.data.version_group.name}
            <br />
          </p>
        </div>
      );
    }
    return body;
  }
}

export default Machine;
