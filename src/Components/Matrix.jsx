import React, { Component } from "react";
import { Table, Select } from "antd";
import { AHPComponent } from "./AHPComponent"
import { deepEqual } from "assert";
import { throwStatement } from "@babel/types";

const { Option } = Select;

const matrixOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "1/2",
  "1/3",
  "1/4",
  "1/5",
  "1/6",
  "1/7",
  "1/8",
  "1/9"
];

const recMatrixOptions = [
  "1",
  "1/2",
  "1/3",
  "1/4",
  "1/5",
  "1/6",
  "1/7",
  "1/8",
  "1/9",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

export default class Matrix extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    columns: [],
    data: [],
    requirements: this.props.requirements
  };

  componentDidMount() {
    this.setColumns(this.props.requirements);
    this.setData(this.props.requirements);
  }

  componentDidUpdate() {
    if (this.state.requirements != this.props.requirements) {
      this.updateRequirements(this.props.requirements);
      this.setColumns(this.props.requirements);
      this.setData(this.props.requirements);
    }
  }

  updateRequirements(requirements) {
    this.setState({ requirements });
  }

  setColumns(requirements) {
    let newColumns = [
      {
        title: "",
        dataIndex: "row_header",
        className: "row_header"
      }
    ];

    for (let i = 1; i <= requirements; i++) {
      newColumns.push({
        title: "R" + i,
        dataIndex: "R" + i
      });
    }

    this.setState({
      columns: newColumns
    });
  }

  setData(requirements) {
    let newData = [];

    for (let i = 1; i <= requirements; i++) {
      let current = {
        key: i,
        row_header: "R" + i
      };

      current["R" + i] = 1;

      for (let j = i + 1; j <= requirements; j++) {
        current["R" + j] = this.myInput(i, j);
      }

      newData.push(current);
    }

    this.setState({
      data: newData
    });
  }

  myInput(row_no, col_no) {
    return (
      <Select
        style={{ width: 65 }}
        onChange={e => this.setReci(e, row_no, col_no)}
      >
        {matrixOptions.map((item, index) => (
          <Option key={index} value={index}>
            {item}
          </Option>
        ))}
      </Select>
    );
  }

  setReci = (event, row_no, col_no) => {
    let newData = this.state.data;

    // console.log(event + " | " + row_no + " | " + col_no);
    newData[col_no - 1]["R" + row_no] = recMatrixOptions[event];

    this.setState({
      data: newData
    });
  };

  render() {  
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.state.data}
        bordered
        pagination={false}
      />
    );
  }
}
