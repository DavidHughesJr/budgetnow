import { Button, Card, Space, Typography, List } from 'antd'
import React, { useState, useContext } from 'react'
import InvestmentForm from '../events/InvestmentForm'
import { InvestmentContext } from '../../context/InvestmentContextProvider'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination} from 'swiper';
import { fetchOverviewNews } from '../../api/apiConfig'
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from 'react'



const Investment = () => {

  const { Title } = Typography
  const { Text } = Typography
  const { Meta } = Card;

  const [isShown, setIsShown] = useState(false)

  const { holdings } = useContext(InvestmentContext)
  const { watchList } = useContext(InvestmentContext)
  
  const totalInvestmentAmount = holdings.reduce((acc, arr) => acc + arr.avgPrice * arr.shares, 0)
  const totalShares = holdings.reduce((acc, arr) => acc + arr.shares, 0)
  const avgPricePer = holdings.reduce((acc, arr) => (acc + arr.avgPrice * arr.shares) / (acc + arr.shares), 0).toFixed(2)


  const [investmentTips, setInvestmentTips] = useState([])

  useEffect(() => {
    const getInvestmentTips = async () => {
      const investmentTips = await fetchOverviewNews('investment')
      setInvestmentTips(investmentTips)
    }
    getInvestmentTips()
  }, [])


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
        <Space direction='vertical' style={{ width: '100%'}}>
          <Card className='card-wide' hoverable={true}>
            <Space className='flex-between'>
              <div>
                <Title level={5}> Total Investment Value </Title>
                <Title style={{margin: 0}}> ${totalInvestmentAmount} </Title>
              </div>
              <div>
                <Title level={5}> Total Shares </Title>
                <Title style={{ margin: 0 }}> {totalShares} </Title>
              </div>
              <div>
                <Title level={5}> Average Price Per Share </Title>
                <Title style={{ margin: 0 }}> ${avgPricePer} </Title>
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
              <SwiperSlide key={item.name}> 
                <Card hoverable={true} title={item.name}>
                  <Text> Shares: {item.shares} </Text>
                  <Text> Average Price: ${item.avgPrice} </Text>
                  </Card>
                </SwiperSlide>
              )
            } 
            </Swiper>
          </div>
          <div className='investment-layout' >
            <Card className='card-large overflow-scroll' hoverable={true}>
              <List itemLayout="horizontal"
                dataSource={watchList}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Title level={5}> {item.name} </Title>}
                    />
                    <div> Ticker: {item.symbol} </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Space>
        <Space style={{ marginTop: 20 }} direction='vertical'>
          <Title level={2}> News & Daily Tips  </Title>
          <div className='flex-between-wrap'>
            {
              investmentTips?.value?.map(data => (
                <a target="_blank" rel="noreferrer" href={data?.url}>
                  <Card
                    key={data?.name}
                    title={data?.name.substr(0, 60) + '...'}
                    hoverable
                    style={{
                      marginBottom: 10,
                      width: 300,
                      height: 400
                    }}
                  >
                    <p>{data?.description.substr(0, 200) + '...'}</p>
                    <Meta title={data?.provider?.[0]?.name} description={data?.url} />

                  </Card>
                </a>
              ))
            }
          </div>
        </Space>
      </div>
    </>
  )
}

export default Investment