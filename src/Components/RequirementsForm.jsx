import React, { Component } from "react";
import "./RequirementsForm.css";
import { Form, Input, Icon, Button } from "antd";

let id = 0;
let requirements = 0;

export default class RequirementsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
    requirements--;
    this.props.setRequirementCount(requirements);
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
    requirements++;
    this.props.setRequirementCount(requirements);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log("Received values of form: ", values);
        console.log(
          "Merged values:",
          keys.map(key => names[key])
        );
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...formItemLayout}
        label={index === 0 ? "" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please insert a requirement or delete this field."
            }
          ]
        })(
          <Input
            placeholder="Requirements"
            onChange={this.props.setForm(this.props.form)}
            style={{ width: "90%", marginRight: 8 }}
          />
        )}
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(k)}
        />
      </Form.Item>
    ));
    return (
      <Form>
        {formItems}
        <Form.Item {...formItemLayout}>
          <Button
            type="dashed"
            onClick={this.add}
            style={{ width: "60%", marginLeft: "20%" }}
          >
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayout}></Form.Item>
      </Form>
    );
  }
}
