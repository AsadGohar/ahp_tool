import React, { Component } from 'react'
import { Table } from 'antd';

const data = [];

const columns = [
    {
      title: '',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'R1',
      width: 100,
      dataIndex: 'age',
      key: 'age',
    
    },
    {
      title: 'R2',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'R3',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'R4',
      dataIndex: 'address',
      key: '3',
      width: 150,
    }


]

    
for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `R${i}`,
      age: 32,
      address: `${i}`,
    });
}

export default class NewMatrix extends Component {
    render() {
        return (
            <Table 
                    columns={columns} 
                    dataSource={data} 
                    scroll={{ x: 1500, y: 300 }} 
            />
            
        )
    }
}
