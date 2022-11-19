import { Card, Space } from 'antd'
import React from 'react'

const Budget = () => {
  return (
    <>
      <h2> Budget </h2>
      <div className='layout'>
        <Space direction='vertical'>
          <Card className='card-medium' title="Card title" hoverable={true}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className='card-large' title="Card title" hoverable={true} >
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
        <Space direction='vertical'>
          <Card className='card-medium' title="Card title" hoverable={true}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card className='card-small' title="Card title" hoverable={true}>
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
          <Card className='card-large' title="Card title" hoverable={true} >
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
    </>
  )
}

export default Budget