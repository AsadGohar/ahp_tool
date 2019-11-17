import React, { Component } from "react";
import { Modal, Tabs, Form } from "antd";
import RequirementsForm from "./RequirementsForm";
import Matrix from "./Matrix";
import { stat } from "fs";
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
    requirements: 0,
    dataSource: [],
    columns: []
  };

  setData = x => {
    this.setState({
      dataSource: x
    });
  };

  setColumn = x => {
    this.setState({
      columns: x
    });
  };

  render() {
    const { visible, handleCancel, handleOk, activeTab, okText } = this.props;
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
              dataSource={this.state.setData}
              columns={this.state.setColumn}
            />
          </TabPane>
          <TabPane tab="Relative Intensity" key="2">
            <Matrix />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}
