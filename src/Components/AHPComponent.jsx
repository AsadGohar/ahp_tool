import React, { Component } from 'react'
import { Layout , Table} from "antd";
const { Header, Content, Footer } = Layout;

const val = [1,1,3,4,5,6,1/9]

const columns = [
    // {
    //     title: "",
    //     dataIndex: "row_header"
    // },
    // {
    //     title: 'R1',
    //     dataIndex: 'R1',
        
    // },
    // {
    //     title: 'R2',
    //     dataIndex: 'R2',
    // },
    // {
    //     title: 'R3',
    //     dataIndex: 'R3',
    // },
    
   
];

for(let i=1; i<val.length;i++)
{
    columns.push(
        {
            title: "R" + i,
            dataIndex: "R" + i
        }
    )
}


const data = [
    {
        key: '1',
        row_header: "R1",
        R1: 1,
        R2: 5,
        R3: 7,
    },
    {
        row_header: "R2",
        key: '2',
        R1: '1/5',
        R2: 1,
        R3: '1/7',
    },
    {
        row_header: "R3",
        key: '3',
        R1: '1/7',
        R2: '1/6',
        R3: 1,
       
    }
    
];

const secondStepCol = [
    {
        
            title: 'Row Sum',
            dataIndex: 'R1',

    }
]



const secondStepData = [
    {
        R1: 1
    },
    {
        R1: 5
    },
    {
        R1: 7
    }
]

const lastStepCol = [
    {
        
            title: 'Priority',
            dataIndex: 'R1',

    }
]



const lastStepData = [
    {
        R1: 1
    },
    {
        R1: 5
    },
    {
        R1: 7
    }
]


export default class AHPComponent extends Component {

    constructor(props) {
        super(props);
      }

      state = {
          ahpVal : []
      }

    //   setAhpVal = x =>
    //   {
    //       for(let i = 0 ; i <x.length)
    //   }

    render() {
        
        const {ahp} = this.props
        return (
           <Content style={{ padding: '50px 50px' }}>

                <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}

                
            />
                <br/>

                <Table
                columns={secondStepCol}
                dataSource={secondStepData}
                bordered
                pagination={false}
            />

                <br/>

                <Table
                columns={lastStepCol}
                dataSource={lastStepData}
                bordered
                pagination={false}
            />
            
           </Content>
        )
    }
}
