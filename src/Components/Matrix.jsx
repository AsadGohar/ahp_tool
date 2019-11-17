import React, { Component } from "react";
import { Table, Select } from "antd";
import { AHPComponent } from "./AHPComponent";
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
        className: "row_header",
        align: "center"
      }
    ];
    let newMatrixData = this.props.matrixData;
    for (let i = 1; i <= requirements; i++) {
      if (newMatrixData[i] == null) {
        newMatrixData[i] = [];
      }

      let cell = {
        title: "R" + i,
        dataIndex: "R" + i,
        align: "center"
      };

      if (i === 1) {
        cell["className"] = "w125";
      }
      newColumns.push(cell);
    }

    this.props.setMatrixData(newMatrixData);

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
        onChange={value => this.handleMatrixInput(value, row_no, col_no)}
      >
        {matrixOptions.map((item, index) => (
          <Option key={index} value={index}>
            {item}
          </Option>
        ))}
      </Select>
    );
  }

  handleMatrixInput = (index, row_no, col_no) => {
    this.setReci(index, row_no, col_no);
    let newMatrixData = this.props.matrixData;

    newMatrixData[row_no][col_no] = this.getCalculatedValue(
      matrixOptions[index]
    );
    newMatrixData[col_no][row_no] = this.getCalculatedValue(
      recMatrixOptions[index]
    );

    // let val = [
    //   [1, 4, 6, 0.8],
    //   [4, 1, 2, 0.89],
    //   [3, 5, 1, 9],
    //   [1, 0.5, 0.123, 1]
    // ];
    // newMatrixData.push([val]);
    this.props.setMatrixData(newMatrixData);
  };

  getCalculatedValue(value) {
    if (value.length > 1) {
      return value.slice(0, 1) / value.slice(2, 3);
    } else {
      return parseInt(value);
    }
  }

  setReci = (value, row_no, col_no) => {
    let newData = this.state.data;

    //console.log(value + " | " + row_no + " | " + col_no);
    newData[col_no - 1]["R" + row_no] = recMatrixOptions[value];

    // console.log(newData[1]["R2"] + newData[1]["R3"]);

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
