import { Form, Input, Button, Spin, Typography, List } from 'antd'
import React, { useState, useEffect } from 'react'
import { fetchSymbolSearch } from '../../api/apiConfig'


const { Search } = Input;

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
        setSearch(value)

    }

    console.log(marketSearchData?.data)
    console.log(search)

    return (
        <Form className='popup-form'>
            <div style={{ display: 'flex' }}>
                <h3> Add Stock </h3>
                <Button onClick={handleClose} className='btn-form-close'> Close </Button>
            </div>
            <Search maxLength='30' allowClear onSearch={handleSearch} className='search-bar' placeholder="Search Stock Symbol" enterButton />
            <div className='investment-form-tickers'>
                {
                    showSpin ? <Spin /> :
                        <List
                            itemLayout="horizontal"
                            dataSource={marketSearchData?.data}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button type='primary' size='small' key="list-loadmore-more">Add</Button>]}
                                >
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.instrument_name}</a>}
                                        description={item.country}
                                    />
                                    <div> Symbol: {item.symbol}</div>
                                </List.Item>

                            )}
                        />
                }
            </div>
        </Form>
    )
}

export default InvestmentForm