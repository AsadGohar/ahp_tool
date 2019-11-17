import React, { Component } from "react";
import MyHeader from "./Components/MyHeader";
import AHPComponent from "./Components/AHPComponent";
import "./App.css";
import { Layout } from "antd";

export default class App extends Component {
  state = {
    requirementsArr: [],
    ahp: []
  };

  setRequirement = x => {
    this.setState({
      requirementsArr: x
    });
  };

  setAhp = x => {
    this.setState({
      ahp: x
    });
  };

  render() {
    return (
      <Layout>
        <MyHeader setAhp={this.setAhp} setRequirement={this.setRequirement} />
        <AHPComponent
          ahp={this.state.ahp}
          requirementsArr={this.state.requirementsArr}
        />
      </Layout>
    );
  }
}
