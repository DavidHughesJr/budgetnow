import { Button, Card, Space } from 'antd'
import React, { useState, useContext } from 'react'
import InvestmentForm from '../events/InvestmentForm'
import { InvestmentContext } from '../../context/InvestmentContextProvider'

const Investment = () => {


  const [isShown, setIsShown] = useState(false)

  const { holdings } = useContext(InvestmentContext)
  const { watchList } = useContext(InvestmentContext)


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
            {
              holdings.map((item) => <div> {item.name} | {item.symbol} {item.shares} {item.avgPrice}</div>)
            }
          </Card>
          <div className='investment-layout' >
            <Card className='card-xl' hoverable={true}>
              Stock Graph
            </Card>
            <Card className='card-large' hoverable={true}>
              {
                watchList.map((item) => <div> {item.name} | {item.symbol} </div>)
              }
            </Card>
          </div>
        </Space>
      </div>
    </>
  )
}

export default Investment