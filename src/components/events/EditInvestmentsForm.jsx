import { Form, Space, Button, Typography, Select, InputNumber } from 'antd'
import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { InvestmentContext } from '../../context/InvestmentContextProvider'


const { Title } = Typography
const { Text } = Typography


const EditInvestmentForm = ({ setIsShown, setIsEdit }) => {


    const { dispatch } = useContext(InvestmentContext)
    const { holdings } = useContext(InvestmentContext)

    const [isOption, setIsOption] = useState([])

    const [defaultValues, setDefaultValues] = useState([])

    const [isSelected, setIsSelected] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(false)
    const [selectedDelete, setSelectedDelete] = useState(false)



    useEffect(() => {
        const defaultValues = holdings.filter((items) => items.id === isOption)
        if(isSelected)
        setDefaultValues(defaultValues)
    }, [holdings, isOption, isSelected])



    const [editedValuedShares, setEditedValueShares] = useState()
    const [editedValueAvgPrice, setEditedValueAvgPrice] = useState()

    useEffect(() => {
        setEditedValueShares(defaultValues?.[0]?.shares)
        setEditedValueAvgPrice(defaultValues?.[0]?.avgPrice)
    }, [defaultValues])

  


    const handleClose = () => {
        setIsShown(current => !current)
        setIsEdit(current => !current)
    }


    const handleConfirmation = (event) => {
        event.preventDefault()

        const editedHoldings = {
            id: defaultValues?.[0]?.id,
            name: defaultValues?.[0]?.name,
            symbol: defaultValues?.[0]?.symbol,
            shares: editedValuedShares,
            avgPrice: editedValueAvgPrice
        }
        dispatch({
            type: 'EDIT HOLDINGS',
            payload: editedHoldings
        })

        setIsShown(current => !current)
    }

    const handleDelete = (event) => {

        event.preventDefault()

        dispatch({
            type: 'DELETE HOLDINGS',
            payload: isOption,
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
                <Form.Item label="Stock" style={{ marginTop: 20 }}>
                    <Select disabled={selectedEdit || selectedDelete} onSelect={(e) => setIsSelected(true)} onChange={(e) => setIsOption(e)}>
                        {
                            holdings.map((items) => (
                                <Select.Option key={items.id} value={items.id}> {items.name} </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                {
                    !isSelected ? '' :
                        <div className='dbutton-invest'>
                            <Button type='primary' disabled={selectedEdit || selectedDelete} onClick={(e) => { setSelectedEdit(current => !current); isSelected(current => !current) }}> Edit </Button>
                            <Button type='secondary' disabled={selectedEdit || selectedDelete} onClick={(e) => setSelectedDelete(current => !current)}> Delete </Button>
                        </div>

                }
                {
                    !selectedEdit ? '' :
                        <Space direction='vertical'>
                            <Form className='edit-investment'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}>
                                <Title level={5}>
                                    Edit Stock Information
                                </Title>
                                <Form.Item label={<label>Shares</label>} >
                                    <InputNumber defaultValue={defaultValues?.[0].shares} onChange={(e) => setEditedValueShares(e)} min={1} />
                                </Form.Item>
                                <Form.Item label={<label>Avg Price In $</label>}>
                                    <InputNumber defaultValue={defaultValues?.[0].avgPrice} onChange={(e) => setEditedValueAvgPrice(e)} min={1} />
                                </Form.Item>
                                <Text> Are you sure you want to edit this stock? </Text>
                            </Form>
                            <div className='dbutton-invest'>
                                <Button type="primary" onClick={handleConfirmation}> Yes </Button>
                                <Button type='secondary' onClick={(e) => setSelectedEdit(false)}> No </Button>
                            </div>
                        </Space>
                }
                {
                    !selectedDelete ? '' :
                        <Space direction='vertical'>
                            <Text> Are you sure you want to delete this stock? </Text>
                            <div className='dbutton-invest'>
                                <Button type="primary" onClick={handleDelete}> Yes </Button>
                                <Button type='secondary' onClick={(e) => setSelectedDelete(false)}> No </Button>
                            </div>
                        </Space>
                }
            </Form>
        </div>
    )
}

export default EditInvestmentForm