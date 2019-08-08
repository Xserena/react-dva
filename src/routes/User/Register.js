import React, { PureComponent } from 'react';
// import {Form, Input, Button} from 'antd';
import Icon from 'Assets/icon.png';
import style from './account.less';
import { validEmpty } from '../../utils/Validate'
import { Form } from 'antd';
// import Request from '../../utils/Request'

class index extends PureComponent {
    state = {
        emailEmpty: false,
        pwdEmpty: false,
        pwdCheck: false,
        shouldLogin:false,
    }
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
                    <input type="text" className={style.input} ref={input => this.inputEmail = input}/>
                </div>
                <p className={this.state.emailEmpty ? style.markTrue : style.markFalse}>邮箱不能为空</p>
                <div>
                    <p>密码：</p>
                    <input type="password" className={style.input} ref={input => this.inputPwd = input}/>
                </div>
                <p className={this.state.pwdEmpty ? style.markTrue : style.markFalse}>密码不能为空</p>
                <div>
                    <p>确认密码：</p>
                    <input type="password" className={style.checkinput} ref={input => this.inputCheckPwd = input}/>
                </div>
                <p className={this.state.pwdCheck ? style.markTrue : style.markFalse}>密码不一致</p>
                <div>
                    <button className={style.btn} onClick={this.checkValue}>注册</button>
                </div>
                </div>
        )
    }
    checkValue = () => {
        const email = this.inputEmail.value;
        const pwd = this.inputPwd.value;
        const checkPwd = this.inputCheckPwd.value;
        if (validEmpty(email)) {
            this.setState({
                emailEmpty: true,
            })
        } else {
            this.setState({
                emailEmpty: false,
            })
        }
        if (validEmpty(pwd)) {
            this.setState({
                pwdEmpty: true,
            })
        }else {
            this.setState({
                pwdEmpty: false,
            })
        }
        if (pwd !== checkPwd) {
            this.setState({
                pwdCheck: true,
            })
        } else {
            this.setState({
                pwdCheck: false,
            })
        }
        if (validEmpty(email) || validEmpty(pwd) || pwd !== checkPwd) {
            return
        } else {
            this.setState({
                shouldLogin: true,
            },() => {
                this.next()
            })
        }
    }
    next = () => {
        this.props.history.push('/login')
    }
}

export default Form.create()(index);