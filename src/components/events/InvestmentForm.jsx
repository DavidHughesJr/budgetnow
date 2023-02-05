import { Form, Input, Button, Spin, Typography, List, Space, Divider, InputNumber, } from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import { fetchSymbolSearch } from '../../api/apiConfig'
import { InvestmentContext } from '../../context/InvestmentContextProvider'
import uuid from 'react-uuid'

const { Search } = Input;
const { Title } = Typography
const { Text } = Typography


const InvestmentForm = ({ setIsShown, setIsAdd }) => {

    const [search, setSearch] = useState('')
    const [marketSearchData, setMarketSearchData] = useState([])

    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState([])
    const [avgPrice, setAvgPrice] = useState([])

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showSpin, setShowSpin] = useState(false)
    const [toWatchList, setToWatchList] = useState(false)

    const { dispatch } = useContext(InvestmentContext)

    useEffect(() => {
        const symbolSearchData = async (search) => {
            const getSymbol = await fetchSymbolSearch(search)
            setMarketSearchData(getSymbol)
        }

        symbolSearchData(search)
    }, [search])

    const handleClose = () => {
        setIsShown(current => !current)
        setIsAdd(current => !current)
    }

    const handleSearch = (value) => {
        setShowSpin(true)
        setTimeout(() => {
            setShowSpin(false)
        }, 3000);
        setSearch(value)

    }
    const addInvestment = (name, symbol) => {
        setName(name)
        setSymbol(symbol)
        setShowConfirmation(true)
    }
    const handleConfirmation = (event) => {
        event.preventDefault()

        const holdings = {
            id: uuid(),
            name: name,
            symbol: symbol,
            shares: shares,
            avgPrice: avgPrice
        }
        const watchList = {
            id: uuid(),
            name: name,
            symbol: symbol,
        }

        toWatchList ?
            dispatch({
                type: 'ADD WATCHLIST',
                payload: watchList,
            }) :
            dispatch({
                type: 'ADD HOLDINGS',
                payload: holdings,
            })

        setIsShown(current => !current)
        setIsAdd(current => !current)
    }


    return (
        <div>
            <Form className='popup-form'>
                <div style={{ display: 'flex' }}>
                    <Title level={3}> Add Stock </Title>
                    <Button onClick={handleClose} className='btn-form-close'> Close </Button>
                </div>
                <Search maxLength='30' allowClear onSearch={handleSearch} className='search-bar' placeholder="Search Stock Symbol" enterButton />
                <div className='investment-form-tickers'>
                    {
                        showSpin ? <Space align='center'> <Spin size="large" /> </Space> :
                            <List
                                itemLayout='vertical'
                                dataSource={marketSearchData?.data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<div> <Title level={5}> {item.instrument_name} | {item.symbol} </Title> <Text style={{ fontSize: 'smaller' }} type='secondary'> {item.exchange} | {item.instrument_type} </Text> </div>}
                                            description={item.country}
                                        />
                                        <Space>
                                            <Button disabled={showConfirmation || toWatchList} onClick={(e) => { addInvestment(item.instrument_name, item.symbol); setShowConfirmation(true); setToWatchList(false);}} type='primary'> Add </Button>
                                            <Button disabled={showConfirmation || toWatchList} onClick={(e) => { addInvestment(item.instrument_name, item.symbol); setToWatchList(true); setShowConfirmation(false) }} type='secondary'> Watch </Button>
                                        </Space>
                                        <Divider />
                                    </List.Item>

                                )}
                            />
                    }

                </div>
            </Form>
            {
                showConfirmation ? 
                    <Form className='confirm-investment'
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}>
                        <div className='flex-end-btn'>
                            <Button onClick={(e) => setShowConfirmation(current => !current)}> Cancel </Button>
                        </div>
                        <Title level={5} style={{ color: 'white' }}>
                            Confirm Stock Info
                        </Title>
                        <Form.Item label={<label style={{ color: "white" }}>Shares</label>} >
                            <InputNumber onChange={(e) => setShares(e)} min={1} />
                        </Form.Item>
                        <Form.Item label={<label style={{ color: "white" }}>Avg Price In $</label>}>
                            <InputNumber onChange={(e) => setAvgPrice(e)} min={1} />
                        </Form.Item>
                        <Button onClick={handleConfirmation}> Confirm </Button>
                    </Form> : ''
            }
            {
                toWatchList ? 
                    <Form className='confirm-investment'
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}>
                        <div className='flex-end-btn'>
                            <Button onClick={(e) => setToWatchList(current => !current)}> Cancel </Button>
                        </div>
                        <Title level={5} style={{ color: 'white' }}>
                            Do you want to add this to your watch list?
                        </Title>
                        <Button onClick={handleConfirmation}> Confirm </Button>
                    </Form> : ''
            }
        </div>
    )
}

export default InvestmentForm