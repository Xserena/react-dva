import React, { Component } from 'react';
// import {Form, Input, Button} from 'antd';
import Icon from 'Assets/icon.png';
import style from './account.less'

export default class extends Component {
    render() {
        return (
            <div className={style.account}>
                <div className={style.icon}>
                    <img src={Icon} alt=""/>
                </div>
                {/* <Form className="account-from" > */}
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
                {/* </Form> */}
                <div>
                    <p>邮箱：</p>
                    <input type="text" className={style.input}/>
                </div>
                <div>
                    <p>密码：</p>
                    <input type="password" className={style.input}/>
                </div>
                <div>
                    <p>确认密码：</p>
                    <input type="password" className={style.checkinput}/>
                </div>
                <div>
                    <button className={style.btn}>登陆</button>
                </div>
                </div>
        )
    }
}