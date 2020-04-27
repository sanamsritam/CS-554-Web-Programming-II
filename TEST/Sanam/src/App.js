import React, { Component } from "react";
import logo from "./img/Pokemon_logo.png";
import ball from "./img/pokeball.png";
import "./App.css";
import "./css/styles.css";
import Clock from "./Clock";
// import DefaultContainer from "./components/DefaultContainer";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { Route, Switch } from "react-router-dom";
import PokemonsList from "./components/PokemonsList";
import BerriesList from "./components/BerriesList";
import MachinesList from "./components/MachinesList";
import Pokemons from "./components/Pokemons";
import Berries from "./components/Berries";
import Machines from "./components/Machines";
import NoSuchRoute from "./components/NoSuchRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={ball} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to the World of Pokemons</h1>
          </header>

          <div className="App-body">
            <table>
              <tr>
                <Link className="btn btn-outline-success" to="/berries/page/0">
                  Berries
                </Link>
              </tr>

              <tr>
                <Link
                  className="btn btn-outline-success"
                  to="/machines/page/0 "
                >
                  Machines
                </Link>
              </tr>

              <tr>
                <Link className="btn btn-outline-success" to="/pokemon/page/0">
                  Pokemons
                </Link>
              </tr>
            </table>
            <p>
              You can meet and recruit Pokémon in a dungeon-crawling adventure
              within their world! Build a rescue team to take on mysterious,
              changing dungeons and strategically plan your moves as you venture
              forth to make the Pokémon world a safer place, and uncover your
              true purpose along the way. As you recruit Pokémon, these trusty
              teammates will need somewhere to stay, so build camps to house,
              manage, and strengthen your Pokémon friends.
            </p>
            <Switch>
              <Route
                exact
                path="/pokemon/page/:page"
                component={PokemonsList}
              />
              <Route exact path="/pokemon/:id" exact component={Pokemons} />
              <Route exact path="/berries/page/:page" component={BerriesList} />
              <Route exact path="/berries/:id" exact component={Berries} />
              <Route
                exact
                path="/machines/page/:page"
                component={MachinesList}
              />
              <Route exact path="/machines/:id" exact component={Machines} />
              <Route exact path="/" component={Clock} />
              <Route path="*" component={NoSuchRoute} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
