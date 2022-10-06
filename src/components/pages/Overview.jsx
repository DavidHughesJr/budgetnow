
import { Card, Space, Calendar, Typography, Button, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import BudgetInput from '../events/BudgetInput';
import React, { useState, useContext } from 'react'
import { BudgetContext } from '../../context/BudgetContext';


const { Title, Text } = Typography;
const Overview = () => {

    const [isShown, setIsShown] = useState(false)

    const handlePopup = event => {
        setIsShown(true)
    }

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    

    const { budget } = useContext(BudgetContext)
    const { transactions } = useContext(BudgetContext)

    
    console.log(transactions)
 

    return (
        <>
            <Title level={2}>Overview</Title>
            {isShown && (
                <BudgetInput isShown={isShown} setIsShown={setIsShown} />
            )}
            <div className='layout'>
                <Space direction='vertical'>
                    <Card className='card-medium' title="All Transactions" hoverable={true} extra={<Button onClick={handlePopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
                        <List itemLayout="horizontal"
                            dataSource={transactions.slice(0, 2)}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={item.category}
                                    />
                                    <div>${item.cost}</div>
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card className='card-medium' title="Retirement" hoverable={true} >
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-small' title="Investment" hoverable={true}>
                        <p>Card content</p>
                    </Card>
                </Space>
                <Space direction='vertical'>
                    <Card className='card-medium' title="Net Worth" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-medium' title="Money Available" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-small' title="Business" hoverable={true} >
                        <p>Card content</p>
                    </Card>
                </Space>
                <Space direction='vertical'>
                    <Calendar className='card-calendar' fullscreen={false} onPanelChange={onPanelChange} />
                    <Card className='card-large' title="Budget" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Space>
            </div>
        </>

    )
}

export default Overview