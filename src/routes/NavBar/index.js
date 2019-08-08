import React,{Component} from 'react';
import style from './index.less';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import { getItem, clearItem } from '../../utils/Server'

const {header, logo, left, login, register} = style;
const menus = [
    {
        key: "home",
        to: '/home',
        text:'主页'
    },
    {
        key: "menus",
        to: '/menus',
        text:'菜单'
    },
    {
        key: "admin",
        to: '/admin',
        text:'管理'
    },
    {
        key: "about",
        to: '/about',
        text:'关于我们'
    },
    {
        key: "login",
        to: '/login',
        text:'登录',
        className: login,
        isAuthority:true
    },
    {
        key: "register",
        to: '/register',
        text:'注册',
        className: register,
        isAuthority:true
    }
]

export default class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedKeys:[]
        }
    }

    //当刷新页面是，会执行componentDidMount
    componentDidMount() {
        this.handleSelectedKeys(this.props.location.pathname)
    }
    //点击导航：路由发生变化
    UNSAFE_componentWillReceiveProps(nextProps){
        const { pathname } = this.props.location;
        if (nextProps.location.pathname !== pathname) {
            this.handleSelectedKeys(nextProps.location.pathname)
        }
    }

    handleSelectedKeys (pathname) {
        const temp = pathname.split('/');
        const key=temp && temp.length >0 ? temp[1] : 'home';
        this.setState({
            selectedKeys:[key]
        })
    }

    handleExit = ({key}) => {
        if (key==='logout') {
            clearItem();
            this.props.history.push('/login')
        }
    }

    menu = (
        <Menu onClick={this.handleExit}>
          <Menu.Item key="logout">
            <span>退出</span>
          </Menu.Item>
        </Menu>
      );

    render() {       //使用class的组件要用render渲染
        // console.log(this.props.location.pathname.split('/')[1])
        const users=JSON.parse(getItem('users'));
        return (
            <nav className={header}>
                <a className={logo}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="d-block mx-auto"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                        <line x1="9.69" y1="8" x2="21.17" y2="8" />
                        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                        <line x1="14.31" y1="16" x2="2.83" y2="16" />
                        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                    </svg>
                </a>
                <Menu className={left} mode='horizontal' defaultSelectedKeys={["home"]} selectedKeys={this.state.selectedKeys}>
                    {
                        menus.filter(({isAuthority}) => 
                            !(isAuthority && localStorage.users)
                        ).map(({key,to,text,className}) => (
                            <Menu.Item key={key} className={className}><Link to={to}>{text}</Link></Menu.Item> 
                        ))
                    }
                </Menu> 
                    {
                      localStorage.users && (
                        <Dropdown overlay={this.menu} className={style['dropdown-menu']}>
                        <a className="ant-dropdown-link">
                          <span className={style.email}>{users[0].email}</span> 
                          <Icon type="down" className={style.icon}/>
                        </a>
                      </Dropdown>
                      )
                    }
            </nav>
        )
    }
}