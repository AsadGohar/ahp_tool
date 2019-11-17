import React, { Component } from "react";
import MyHeader from "./Components/MyHeader";
import MyContent from "./Components/MyContent";
import "./App.css";
import { Layout } from "antd";

export default class App extends Component {
  state = {
    requirementsArr: []
  };

  setRequirement(x) {
    this.setState({
      requirementsArr: x
    });
  }

  render() {
    return (
      <Layout>
        <MyHeader />
        <MyContent requirements={this.state.requirementsArr} />
      </Layout>
    );
  }
}
