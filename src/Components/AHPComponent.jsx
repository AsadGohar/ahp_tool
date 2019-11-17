import React, { Component } from 'react'
import { Layout} from "antd";
const { Header, Content, Footer } = Layout;

export default class AHPComponent extends Component {

    constructor(props) {
        super(props);
      }

    render() {

        const {ahp} = this.props
        return (
           <Content>
            <div>
                {ahp}
            </div>
           </Content>
        )
    }
}
