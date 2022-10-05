import { Card, Space, Input } from 'antd'
import React from 'react'

const Investment = () => {
  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  return (
    <>
      <h2> Search Bar </h2>
      <div className='search-bar'>
      <Search placeholder="Search Stocks" onSearch={onSearch} enterButton />
      </div>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Card className='card-wide'>
          Money available
        </Card>
        <Card className='card-wide'>
          current holdings
        </Card>
        <div className='investment-layout'>
          <Card className='card-xl'>
            Stock Graph
          </Card>
          <Card className='card-large'>
            watchlist
          </Card>
        </div>
      </Space>
    </>
  )
}

export default Investment