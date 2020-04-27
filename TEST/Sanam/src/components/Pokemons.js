import React, { Component } from "react";
import axios from "axios";
import noImage from "../img/noimage.png";

class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: undefined,
    };
  }
  componentWillMount() {
    this.getPokemon();
  }
  async getPokemon() {
    this.setState({
      loading: true,
    });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2${this.props.match.url}`
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
          <h1>Pokemon</h1>
          <br />
          Loading...
        </div>
      );
    } else if (this.state.error) {
      body = (
        <div>
          <h1>404 Not Found</h1>
        </div>
      );
    } else if (this.state.data) {
      let img = null;
      if (this.state.data.sprites) {
        img = <img alt="Pokemon" src={this.state.data.sprites.back_default} />;
      } else {
        img = <img alt="Pokemon" src={noImage} />;
      }
      body = (
        <div>
          <h2 className="cap-first-letter">
            {this.state.data && this.state.data.name}
          </h2>
          {img}
          <br />
          <br />
          <p>
            Id: {this.state.data.id}
            <br />
            Height: {this.state.data.height} <br />
            Weight: {this.state.data.weight}
            <br />
            Order: {this.state.data.order}
            <br />
            Base Experience: {this.state.data.base_experience}
            <br />
          </p>
          <b>Type</b>:
          <ul className="list-unstyled">
            {this.state.data.types.map((ty) => {
              return <li key={ty.type.name}>{ty.type.name}</li>;
            })}
          </ul>
          <b>Abilities</b>:
          <ul className="list-unstyled">
            {this.state.data.abilities.map((ab) => {
              return <li key={ab.ability.name}>{ab.ability.name}</li>;
            })}
          </ul>
          <b>Stats</b>:
          <ul className="list-unstyled">
            {this.state.data.stats.map((st) => {
              return (
                <li key={st.stat.name}>
                  {st.stat.name}: {st.base_stat}
                </li>
              );
            })}
          </ul>
          <b>Moves</b>:
          <ul className="list-unstyled list-inline">
            {this.state.data.moves.map((mv) => {
              return <li key={mv.move.name}>{mv.move.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return body;
  }
}

export default Pokemons;
