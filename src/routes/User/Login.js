import React, { Component } from 'react';
import { connect } from 'dva';
import {message, Form} from 'antd';
import Icon from 'Assets/icon.png';
import style from './account.less'
import { validEmpty } from '../../utils/Validate'
import { addItem, clearItem, getItem } from '../../utils/Server'
// import example from '../../models/example';

@connect()
class index extends Component {
    state = {
        emailEmpty: false,
        pwdEmpty: false,
        shouldLogin:false,
    }
    render() {
        return (
            <div className={style.account}>
                <div className={style.icon}>
                    <img src={Icon} alt=""/>
                </div>
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
                    <button className={style.btn} onClick={this.checkValue}>登陆</button>
                </div>
                </div>
        )
    }
    checkValue = () => {
        const email = this.inputEmail.value;
        const pwd = this.inputPwd.value;
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
        if (validEmpty(email) || validEmpty(pwd)) {
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
        const email = this.inputEmail.value;
        const pwd = this.inputPwd.value;
        let users;
        clearItem('users')
        if (getItem('users')) {
            users = JSON.parse(getItem('users'));
            users.push({
                email: email,
                pwd: pwd
            })
            const musers = JSON.stringify(users);
            addItem('users', musers);
        }else {
            users = [];
            users.push({
                email: email,
                pwd: pwd
            })
            const musers = JSON.stringify(users);
            addItem('users', musers);
        }
        //讲users存储到models里面
        if (users && users.length > 0) {
            this.props.dispatch({   //dispatch本身也是一个promise
                type: 'example/setUserInfo',
                payload:users
            }).then(() => {
                //页面跳转
                // console.lo(res)
                this.props.dispatch(
                    {
                        type: 'example/setUserInfo',
                        payload:users 
                    }
                )
                console.log(this.state.user)
                this.props.history.push('/')
            })
        } else {
            message.error('请重新输入')
        }
        console.log(users);
    }
}

export default Form.create()(index);