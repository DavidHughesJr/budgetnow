import { Button, Card, Space, Typography } from 'antd'
import React, { useState, useContext } from 'react'
import InvestmentForm from '../events/InvestmentForm'
import { InvestmentContext } from '../../context/InvestmentContextProvider'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';



const Investment = () => {


  const { Title } = Typography
  const { Text } = Typography


  const [isShown, setIsShown] = useState(false)

  const { holdings } = useContext(InvestmentContext)
  const { watchList } = useContext(InvestmentContext)
  


  const holdingsAmount = holdings.reduce((acc, arr) => acc + arr.avgPrice * arr.shares, 0)


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
            <Space>
              <div>
                <Title level={5}> Total Investment Value </Title>
                <Title style={{margin: 0}}> ${holdingsAmount} </Title>
              </div>
              <div>
                <Title level={5}> Total Share Amount </Title>
                <Title style={{ margin: 0 }}> ${holdingsAmount} </Title>
              </div>
              <div>
                <Title level={5}> Average Price Per All Shares </Title>
                <Title style={{ margin: 0 }}> ${holdingsAmount} </Title>
              </div>
            </Space>
          </Card>
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={8}
              spaceBetween={5}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 8,
                },
              }}
            >
            {
              holdings.map((item) =>
              <SwiperSlide> 
                <Card hoverable={true} title={item.name}>
                  <p> Shares: {item.shares} </p>
                  <p> Average Price: ${item.avgPrice} </p>
                  </Card>
                </SwiperSlide>
              )
            } 
            </Swiper>
          </div>
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