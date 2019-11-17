import React, { Component } from "react";
import { Table, Typography, Input } from "antd";

const { Text } = Typography;
const InputGroup = Input.Group;

const columns = [
  {
    title: "",
    dataIndex: "row_header",
    className: "row_header"
  },
  {
    title: "R1",
    dataIndex: "R1"
  },
  {
    title: "R2",
    dataIndex: "R2"
  },
  {
    title: "R3",
    dataIndex: "R3"
  },
  {
    title: "R4",
    dataIndex: "R4"
  }
];

export default class Matrix extends Component {
  state = {
    data: [
      {
        key: "1",
        row_header: "R1",
        R1: 1,
        R2: this.myInput(1, 2),
        R3: this.myInput(1, 3),
        R4: this.myInput(1, 4)
      },
      {
        key: "2",
        row_header: "R2",
        R2: 1,
        R3: this.myInput(2, 3),
        R4: this.myInput(2, 4)
      },
      {
        key: "3",
        row_header: "R3",
        R3: 1,
        R4: this.myInput(3, 4)
      },
      {
        key: "4",
        row_header: "R4",
        R4: 1
      }
    ]
  };

  myInput(row_no, col_no) {
    return (
      <Input
        style={{ width: "40px" }}
        onChange={e => this.setReci(e, row_no, col_no)}
      />
    );
  }

  setReci = (event, row_no, col_no) => {
    let newData = this.state.data;
    newData[col_no - 1]["R" + row_no] = "1/" + event.target.value;

    this.setState({
      data: newData
    });
  };

  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        bordered
        pagination={false}
      />
    );
  }
}
