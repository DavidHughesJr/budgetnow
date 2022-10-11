import { Button, Card, Space } from 'antd'
import React, { useState, useEffect } from 'react'

import InvestmentForm from '../events/InvestmentForm'

const Investment = () => {


  const [isShown, setIsShown] = useState(false)
  


  return (
    <>
      {
        !isShown ? '' :
          <InvestmentForm isShown={isShown} setIsShown={setIsShown} />
      }
      <div className={!isShown ? 'layout' : 'layout popup-background'} >
        <h2> Investments </h2>
        <div style={{ marginBottom: 8 }}>
          <Button onClick={() => setIsShown(true)} type='primary'> Add Stock </Button>
          
        </div>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Card className='card-wide' hoverable={true}>
            Money available
          </Card>
          <Card className='card-wide' hoverable={true}>
            current holdings
          </Card>
          <div className='investment-layout' >
            <Card className='card-xl' hoverable={true}>
              Stock Graph
            </Card>
            <Card className='card-large' hoverable={true}>
              watchlist
            </Card>
          </div>
        </Space>
      </div>
    </>
  )
}

export default Investment