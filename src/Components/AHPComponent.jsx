import React, { Component } from "react";
import { Layout, Table, Row, Col } from "antd";
import "./AHPComponent.css";
const { Header, Content, Footer } = Layout;

export default class AHPComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ahpVal: [],
    step1Columns: [],
    step1Data: [],
    step2Columns: [],
    step2Data: [],
    step3Columns: [],
    step3Data: [],
    ahp: this.props.ahp
  };

  componentDidMount() {
    this.setColumns(this.props.requirementsArr.length);
    this.setData(this.props.requirementsArr.length);
  }

  componentDidUpdate() {
    if (this.state.ahp != this.props.ahp) {
      this.updateAhp(this.props.ahp);
      this.setColumns(this.props.requirementsArr.length);
      this.setData(this.props.requirementsArr.length);
    }
  }

  updateAhp(ahp) {
    this.setState({ ahp });
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

    for (let i = 1; i <= requirements; i++) {
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
    this.setState({
      step1Columns: newColumns
    });
  }

  setData(requirements) {
    debugger;
    let newData = [];
    let sum = [];

    for (let i = 1; i <= requirements; i++) {
      for (let j = 1; j <= requirements; j++) {
        if (i == 1) {
          sum[j] = parseFloat(this.getValue(i, j));
        } else {
          sum[j] += parseFloat(this.getValue(i, j));
        }
      }
    }

    for (let i = 1; i <= requirements; i++) {
      let current = {
        key: i,
        row_header: "R" + i
      };

      for (let j = 1; j <= requirements; j++) {
        current["R" + j] = this.getFixedValue(this.getValue(i, j) / sum[j]);
      }
      newData.push(current);
    }

    this.setState({
      step1Data: newData
    });
  }

  getValue(i, j) {
    if (i == j) {
      return 1;
    } else if (this.props.ahp[i] != null) {
      return this.props.ahp[i][j];
    } else {
      return "";
    }
  }

  getFixedValue(value) {
    if (value.toString().length > 1) {
      return value.toString().slice(0, 5);
    } else {
      return value.toString();
    }
  }

  render() {
    const { ahp } = this.props;
    return (
      <Content id="body" style={{ padding: "50px 50px" }}>
        <Row className="m25">
          <Col span={12} offset={6}>
            <Table
              columns={this.state.step1Columns}
              dataSource={this.state.step1Data}
              bordered
              pagination={false}
            />
          </Col>
        </Row>

        <Row className="m25">
          <Col span={12} offset={6}>
            <Table
              columns={this.state.step2Columns}
              dataSource={this.state.step2Data}
              bordered
              pagination={false}
            />
          </Col>
        </Row>

        <Row className="m25">
          <Col span={12} offset={6}>
            <Table
              columns={this.state.step3Columns}
              dataSource={this.state.step3Data}
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Content>
    );
  }
}
