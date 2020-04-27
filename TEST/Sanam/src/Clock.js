import React, { Component } from "react";

class Clock extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     date: this.props.date,
  //     counter: 0,
  //   };
  // }

  // componentDidMount() {
  //   this.timerId = setInterval(() => this.tick(), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

  // tick() {
  //   this.setState((state, props) => ({
  //     date: new Date(),
  //     counter: state.counter + 1,
  //   }));
  // }

  render() {
    return (
      <div>
        <h1>This is Pockedex</h1>
      </div>
    );
  }
}

export default Clock;
