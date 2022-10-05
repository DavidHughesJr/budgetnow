
import { Card, Space, Calendar, Typography } from 'antd'
import React, { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext';


const { Title, Text } = Typography;


const Overview = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const { budget } = useContext(BudgetContext)

    return (
        <>
            <Title level={2}>Overview</Title>
            <div className='layout'>
                <Space direction='vertical'>
                    <Card className='card-medium' title="All Transaction" hoverable={true}>
                        <Text> {budget} </Text>
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
                    <Card className='card-small' title="Business" hoverable={true}>
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