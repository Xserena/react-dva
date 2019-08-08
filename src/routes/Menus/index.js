import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import style from './index.less';

export default class index extends Component{
    state = {
        cart: []
    };
    rederTable() {
        const columns = [
            {
                title: '尺寸',
                dataIndex: 'size',
                key: 'size',
                render: (text,record) => {
                    // return <span>{text}</span>
                    if(record.price) {
                        return <span>{text}</span>
                    }
                    return {
                        children: <strong>{text}</strong>,
                        props:{
                            colSpan:2
                        }
                    }
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
                            <Button className={style['add-btn']} onClick={() => handleAdd(record)}>
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

        const handleAdd = (record) => {
            let { cart } = this.state;
            const index = cart.findIndex(item => item.key === record.key);
            index >= 0 ? cart.splice(index,1,{
                ...cart[index],
                count: cart[index].count + 1
            }) : 
            (
                cart=[
                    ...cart,
                    {
                        ...record,
                        count: 1
                    }
                ]
            )
            // console.log(record)
            //存储到状态中
            this.setState({
                cart
            })
        }
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
        // console.log(dataSource)
    
        return <Table className='menus-table' dataSource={dataSource} columns={columns} pagination={false}/>
    }
    rederCar() {
        const columns=[
            {
                title: '数量',
                dataIndex: 'count',
                key: 'count',
                render: (text,record) => (
                    <span>
                        <Button className={style['cart-btn']} onClick={() => handleDerease(record)}>-</Button>
                        <span>{record.count}</span>
                        <Button className={style['cart-btn']} onClick={() => handleInrease(record)}>+</Button>       
                    </span>
                )
            },
            {
                title: '菜单',
                dataIndex: 'name',
                key: 'name',
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
        ]
        const handleDerease = record => {
            let { cart } = this.state;
            //获取点击的数据下标
            // console.log(cart,record)
            const index = cart.findIndex(item => item.key===record.key);
            const current = cart[index];
            if (current.count <=1) {
                cart.splice(index,1);
            } else {
                cart.splice(index,1,
                {...current,
                count:current.count-1
                })
            }
            this.setState({
                cart
            })
        }
        const handleInrease = record => {
            let { cart } = this.state;
            //获取点击的数据下标
            const index = cart.findIndex(item => item.key===record.key);
            const current = cart[index];
            cart.splice(index,1,{
                ...current,
                count:current.count+1
                })
            this.setState({
                cart
            })
        }
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

        return <Table className='menus-table cart' dataSource={this.state.cart} columns={columns} pagination={false} locale={{emptyText: '购物车没有内容'}}/>
    }
    render() {
        const totalPrice = this.state.cart.reduce((total,item) => (total += item.price*item.count),0)
        return (
            <Row>
                <Col sm={24} md={16}>{this.rederTable()}</Col>
                <Col sm={24} md={8}>
                    {this.rederCar()}
                    <p className={style['total-price']}>总价：{totalPrice}</p>
                    <Button type='primary' className={style['submit-btn']}>提交</Button>
                </Col>
            </Row>
            
        )
    }
}