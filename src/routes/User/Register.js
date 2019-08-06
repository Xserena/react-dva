import React, { Component } from 'react';
import {Form, Input, Button} from 'antd';
import Icon from 'Assets/icon.png';
import style from './account.less'

export default class extends Component {
    render() {
        return (
            <div className={style.account}>
                <img src={Icon} alt=""/>
                <Form className="account-from" >
                <div>
                    <p>邮箱：haha</p>
                    <input type="text"/>
                </div>
                    {/* <Form.Item label="邮箱">
                        <Input />
                    </Form.Item> */}
                    {/* <Form.Item label="密码">
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item label="确认密码">
                        <Input  type="password"/>
                    </Form.Item>
                    <Form.Item label="邮箱">
                        <Button className="btn" type="primary">
                            注册
                        </Button>
                    </Form.Item> */}
                </Form>
            </div>
        )
    }
}