import React, { Component } from "react";
import { Modal, Tabs, Form } from "antd";
import RequirementsForm from "./RequirementsForm";
import Matrix from "./Matrix";
import NewMatrix from "./NewMatrix";

const { TabPane } = Tabs;
const WrappedForm = Form.create({ name: "dynamic_form_item" })(
  RequirementsForm
);

export default class RequirementsModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    requirements: 0
  };

  setRequirementCount = x => {
    this.setState({
      requirements: x
    });
  };

  render() {
    const {
      visible,
      handleCancel,
      handleOk,
      activeTab,
      okText,
      setAhp
    } = this.props;
    const { requirements } = this.state;
    return (
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
      >
        <Tabs activeKey={activeTab.toString()}>
          <TabPane tab="Requirements" key="1">
            <WrappedForm
              setRequirementCount={this.setRequirementCount}
              requirementsArr={this.props.requirementsArr}
              setForm={this.props.setForm}
            />
          </TabPane>
          <TabPane tab="Relative Intensity" key="2">
            <Matrix
              requirements={this.state.requirements}
              setMatrixData={this.props.setMatrixData}
              matrixData={this.props.matrixData}
            />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}
