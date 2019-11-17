import React, { Component } from "react";
import "./MyHeader.css";
import { Layout, Row, Col, Button } from "antd";
import RequirementsModal from "./RequirementsModal";

const { Header } = Layout;

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    activeTab: 1,
    okText: "Next"
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    if (this.state.activeTab == 1) {
      this.setState({
        activeTab: 2,
        okText: "Done"
      });
    } else {
      this.handleDone();
    }
  };

  handleCancel = () => {
    this.handleDone();
  };

  handleDone() {
    this.setState(
      {
        visible: false
      },
      () => {
        this.setState({
          activeTab: 1,
          okText: "Next"
        });
      }
    );
  }

  render() {
    const { visible, activeTab, okText } = this.state;
    return (
      <Header>
        <Row>
          <Col span={8}>
            <h1>AHP Calculator</h1>
          </Col>

          <Col span={4} offset={12}>
            <Button
              type="primary"
              size="large"
              className="headerbtn"
              onClick={this.showModal}
            >
              Add / Remove Requirements
            </Button>
            <RequirementsModal
              visible={visible}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              activeTab={activeTab}
              okText={okText}
              requirements={this.props.requirementsArr}
            />
          </Col>
        </Row>
      </Header>
    );
  }
}
