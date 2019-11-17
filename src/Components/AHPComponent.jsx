import React, { Component } from "react";
import { Layout, Table, Row, Col, Typography } from "antd";
import "./AHPComponent.css";
const { Header, Content, Footer } = Layout;

const { Title } = Typography;
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

  setStep2Columns() {
    let newColumns = [
      {
        title: "",
        dataIndex: "row_header",
        className: "row_header",
        align: "center"
      }
    ];

    this.setState({
      step2Columns: newColumns
    });
  }

  setStep2_3Data(step2Arr) {
    let newData = [];
    let data3 = [];

    for (let i = 0; i < step2Arr.length; i++) {
      let current = {
        key: i,
        row_header: this.getFixedValue(step2Arr[i])
      };

      let current3 = {
        key: i,
        row_header: this.getFixedValue(
          step2Arr[i] / this.props.requirementsArr.length
        )
      };

      newData.push(current);
      data3.push(current3);
    }

    this.setState({
      step2Data: newData,
      step3Data: data3
    });
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

    this.setStep2Columns();
  }

  setData(requirements) {
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

    let step2Arr = [];
    for (let i = 1; i <= requirements; i++) {
      let current = {
        key: i,
        row_header: "R" + i
      };

      let temp = 0;
      for (let j = 1; j <= requirements; j++) {
        current["R" + j] = this.getFixedValue(this.getValue(i, j) / sum[j]);
        temp += parseFloat(current["R" + j]);
      }
      step2Arr[i - 1] = temp;
      newData.push(current);
    }

    this.setState({
      step1Data: newData
    });
    this.setStep2_3Data(step2Arr);
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
              columns={this.state.step2Columns}
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
