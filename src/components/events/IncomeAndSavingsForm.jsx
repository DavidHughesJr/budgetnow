import {
    Button,
    Form,
    Select,
    InputNumber,
    Typography,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';




const IncomeForm = ({ isShown, setIsShown, setIsItem }) => {

    const { budget } = useContext(BudgetContext)
    const { dispatch } = useContext(BudgetContext)

    const [name, setName] = useState([])
    const [amount, setAmount] = useState([])



    const handleClose = () => {
        setIsShown(current => !current)
        setIsItem(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const budget = {
            name: name,
            amount: amount,
        }

        dispatch({
            type: 'ADD BUDGET',
            payload: budget,
        })
        setIsShown(current => !current)
        setIsItem(current => !current)
    }


    return (
        <div style={{ display: isShown ? 'block' : 'none' }}>
            <Form className='popup-form'
                labelCol={{
                    span: 5,
                }}
                layout="horizontal"
                size={'small'}
            >
                <div style={{ display: 'flex' }}>
                    <Button onClick={handleClose} className='btn-form-close'> Close </Button>
                </div>
                <Typography>
                    <pre> Add Income Or Savings </pre>
                </Typography>
                <Form.Item label="Type">
                    <Select onChange={(e) => setName(e)}>
                        {
                            budget?.map((arr) => <Select.Option value={arr.name}> {arr.name} </Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Amount" name="input-number" >
                    <InputNumber onChange={(e) => setAmount(e)} min={1} />
                </Form.Item>
                <Form.Item label="">
                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default IncomeForm