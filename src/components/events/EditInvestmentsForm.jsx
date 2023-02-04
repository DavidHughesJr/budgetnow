import { Form, Input, Button, Typography, Select } from 'antd'
import React, { useState, useContext } from 'react'
import { InvestmentContext } from '../../context/InvestmentContextProvider'
import uuid from 'react-uuid'

const { Title } = Typography
const { Text } = Typography


const EditInvestmentForm = ({ setIsShown, setIsEdit }) => {


    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [shares, setShares] = useState([])
    const [avgPrice, setAvgPrice] = useState([])

    const [isSelected, setIsSelected] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(false)
    const [selectedDelete, setSelectedDelete] = useState(false)


    const [toWatchList, setToWatchList] = useState(false)

    const { dispatch } = useContext(InvestmentContext)
    const { holdings } = useContext(InvestmentContext)


    const handleClose = (event) => {
        setIsShown(current => !current)
        setIsEdit(current => !current)
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
    }


    return (
        <div>
            <Form className='popup-form'>
                <div style={{ display: 'flex' }}>
                    <Title level={3}> Edit Stock </Title>
                    <Button onClick={handleClose} className='btn-form-close'> Close </Button>
                </div>
                <Form.Item label="Stock" style={{ marginTop: 20}}>
                    <Select onSelect={setIsSelected(true)}>
                        {
                            holdings.map((items) => (
                                <h3>
                                    {items.name}
                                </h3>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Button> Edit </Button>
                <Button> Delete </Button>
            </Form>
        </div>
    )
}

export default EditInvestmentForm