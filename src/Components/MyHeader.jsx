import React, { Component } from "react";
import "./MyHeader.css";
import { Layout, Row, Col, Button } from "antd";
import RequirementsModal from "./RequirementsModal";

const { Header } = Layout;

let form;
export default class MyHeader extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    activeTab: 1,
    okText: "Next",
    matrixData: []
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    if (this.state.activeTab == 1) {
      form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values;
          this.props.setRequirement(names);

          this.setState({
            activeTab: 2,
            okText: "Done"
          });
        }
      });
    } else {
      this.handleDone();
    }
  };

  setForm(f) {
    form = f;
  }

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
    this.props.setAhp(this.state.matrixData);
  }

  setMatrixData = matrixData => {
    this.setState({ matrixData });
  };

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
              setMatrixData={this.setMatrixData}
              matrixData={this.state.matrixData}
              setForm={this.setForm}
            />
          </Col>
        </Row>
      </Header>
    );
  }
}
