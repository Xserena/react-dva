import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import style from './index.less';

export default class index extends Component{
// export default function index() {
    rederTable() {
        const columns = [
            {
                title: '尺寸',
                dataIndex: 'size',
                key: 'size',
                render: (text,record) => {
                    return <span>{text}</span>
                }
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (text,record) => {
                    return <span>{text}</span>
                }
            },
            {
                title: '加入',
                key: 'action',
                render: (text,record) => {
                    const obj = {
                        children: (
                            <Button className={style['add-btn']}>
                                <Icon type='plus'/>
                            </Button>
                        ),
                        props: []
                    }
                    if (!record.price) {
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
        ]
        //创建一个json格式的data
        let data = {
            1: {
                name: '榴莲pizza',
                description: '最好吃的pizza',
                option: [
                    {
                        size: 9,
                        price: 38
                    },
                    {
                        size: 12,
                        price: 48
                    }
                ]
            },
            2: {
                name: '意大利pizza',
                description: '第二好吃的pizza',
                option: [
                    {
                        size: 9,
                        price: 38
                    },
                    {
                        size: 12,
                        price: 48
                    }
                ]
            },
            3: {
                name: '水果pizza',
                description: '第三好吃的pizza',
                option: [
                    {
                        size: 9,
                        price: 38
                    },
                    {
                        size: 12,
                        price: 48
                    }
                ]
            },
        }
    
        //处理数据格式
        let dataSource = [];
        for (const key in data) {
            const item = data[key];
            dataSource.push({
                key: item.name,
                size: item.name
            });
            item.option.forEach((ele,index) => {
                // console.log(ele)  //ele : {size: 12,price: 48}
                dataSource.push({
                    ...ele,  //因为ele是一个对象，里面有两个属性，所以把2个属性都取出来，而不是作为整体
                    key: `${key}-${index}`,  //必须设置key,react的diff原理
                    name: item.name
                })
            })   
        }
        console.log(dataSource)
    
        return <Table className='menus-table' dataSource={dataSource} columns={columns} pagination={false}/>
    }
    render() {
        return (
            <Row>
                <Col>
                {this.rederTable()}
                </Col>
            </Row>
            
        )
    }
}