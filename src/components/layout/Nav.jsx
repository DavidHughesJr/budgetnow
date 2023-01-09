
import { Layout, Menu } from 'antd';
import React from 'react'
import { UserOutlined, StockOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Nav = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div className="logo">
                BudgetNow
            </div>
            <Menu theme="dark">
                        <Menu.Item icon={<UserOutlined />}>
                            <Link to='/'> Overview </Link>
                        </Menu.Item>
                        <Menu.Item icon={<DollarOutlined/>}>
                            <Link to='/budget'> Budget </Link>
                        </Menu.Item>
                        <Menu.Item icon={<StockOutlined />}>
                            <Link to='/investment'> Investment </Link>
                        </Menu.Item>
                    </Menu>
        </Sider>
    )
}

export default Nav