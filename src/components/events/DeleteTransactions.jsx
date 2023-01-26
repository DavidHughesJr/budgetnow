import {
    Button,
    Form,
    Checkbox,
    Typography,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';
import uuid from 'react-uuid';

const DeleteTransactions = ({ isShown, setIsShown, setIsDeleteTransaction }) => {

    const { categories } = useContext(BudgetContext)
    const { dispatch } = useContext(BudgetContext)
    const { transactions } = useContext(BudgetContext)

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [cost, setCost] = useState('')

    const handleClose = (event) => {
        setIsShown(current => !current)
        setIsDeleteTransaction(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()


        const transactions = {
            id: uuid(),
            name: name,
            category: category,
            cost: cost
        }

        dispatch({
            type: 'ADD TRANSACTION',
            payload: transactions,
        })
        setIsShown(current => !current)
        setIsDeleteTransaction(current => !current)
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
                    <pre> Delete Transactions </pre>
                </Typography>
                {
                    transactions.map((item) => (
                        <Form.Item>
                            <Checkbox onChange={(e) => console.log(e.target)}>{item.name} </Checkbox>
                        </Form.Item>
                    ))
                }
                <Form.Item label="">
                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default DeleteTransactions;