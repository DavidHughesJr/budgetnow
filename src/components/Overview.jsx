
import { Card, Space, Calendar } from 'antd'
import React from 'react'


const Overview = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <>
            <h2> Overview </h2>
            <div className='layout'>
                <Space direction='vertical'>
                    <Card className='card-medium' title="Card title" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-medium' title="Card title" hoverable={true} >
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-small' title="Card title" hoverable={true}>
                        <p>Card content</p>
                    </Card>
                </Space>
                <Space direction='vertical'>
                    <Card className='card-medium' title="Card title" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-medium' title="Card title" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card className='card-small' title="Card title" hoverable={true}>
                        <p>Card content</p>
                    </Card>
                </Space>
                <Space direction='vertical'>
                    <Calendar className='card-calendar' fullscreen={false} onPanelChange={onPanelChange} />
                    <Card className='card-large' title="Card title" hoverable={true}>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Space>
            </div>
        </>

    )
}

export default Overview