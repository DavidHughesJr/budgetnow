import { Form, Input, Button, Spin, Typography, List, Space, Divider } from 'antd'
import React, { useState, useEffect } from 'react'
import { fetchSymbolSearch } from '../../api/apiConfig'


const { Search } = Input;
const { Title } = Typography
const { Text } = Typography


const InvestmentForm = ({ isShown, setIsShown }) => {

    const [search, setSearch] = useState('')
    const [marketSearchData, setMarketSearchData] = useState([])
    const [showSpin, setShowSpin] = useState(false)

    useEffect(() => {
        const symbolSearchData = async (search) => {
            const getSymbol = await fetchSymbolSearch(search)
            setMarketSearchData(getSymbol)
        }

        symbolSearchData(search)
    }, [search])

    const handleClose = (event) => {
        setIsShown(current => !current)
    }

    const handleSearch = (value) => {
        setShowSpin(true)
        setTimeout(() => {
           setShowSpin(false)
        }, 3000);
        setSearch(value)
       
    }
    
    console.log(marketSearchData?.data)


    return (
        <Form className='popup-form'>
            <div style={{ display: 'flex' }}>
                <Title level={3}> Add Stock </Title>
                <Button onClick={handleClose} className='btn-form-close'> Close </Button>
            </div>
            <Search maxLength='30' allowClear onSearch={handleSearch} className='search-bar' placeholder="Search Stock Symbol" enterButton />
            <div className='investment-form-tickers'>
                {
                    showSpin ? <Space align='center'> <Spin size="large" /> </Space>  :
                        <List
                            itemLayout='vertical'
                            dataSource={marketSearchData?.data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<div> <Title level={5}> {item.instrument_name} </Title> <Text style={{fontSize: 'smaller'}} type='secondary'> {item.exchange} | {item.instrument_type} </Text> </div>} 
                                        description={item.country}                          
                                    />     
                                    <Button type='primary'> Add </Button>  
                                    <Divider/> 
                                </List.Item>
                                
                            )}
                        />
                }
            </div>
        </Form>
    )
}

export default InvestmentForm