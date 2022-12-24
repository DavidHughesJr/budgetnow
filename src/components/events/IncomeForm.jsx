import {
    Button,
    Form,
    Input,
    Select,
    InputNumber,
    Typography,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';




const IncomeForm = ({ isShown, setIsShown }) => {

    const { budget } = useContext(BudgetContext)
    const { dispatch } = useContext(BudgetContext)

    const [name, setName] = useState([])
    const [amount, setAmount] = useState([])



    const handleClose = (event) => {
        setIsShown(current => !current)
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
    }
    const tester = [
        { name: 'Income', amount: 6000 },
        { name: 'Income', amount: 1000 },
        { name: 'Secondary Income', amount: 500 },
        { name: 'Long Term Savings', amount: 1000 },
        { name: 'Short Term Savings', amount: 200 },
    ]

    const newList = tester.reduce((items, item) => {
        const { name, amount } = item;
        const itemIndex = items.findIndex(item => item.name === name)
        if (itemIndex === -1) {
            items.push(item);
        } else {
            items[itemIndex].amount += amount;
        }

        return items;
    }, []);

 
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