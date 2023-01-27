import {
    Button,
    Form,
    Typography,
    Radio,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';
import uuid from 'react-uuid';

const DeleteTransactions = ({ isShown, setIsShown, setIsDeleteTransaction }) => {

    const { categories } = useContext(BudgetContext)
    const { dispatch } = useContext(BudgetContext)
    const { transactions } = useContext(BudgetContext)

    const [deleteThisTransaction, setDeleteThisTransaction] = useState([])



    const handleClose = (event) => {
        setIsShown(current => !current)
        setIsDeleteTransaction(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({
            type: 'DELETE TRANSACTION',
            payload: deleteThisTransaction,
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
                <Radio.Group> 
                {
                    transactions.map((item) => (
                        <Form.Item onChange={(e) => setDeleteThisTransaction(e.target.value)}>
                          
                            <Radio value={item.id}> {item.name} | Cost: {item.cost} | Category: {item.cost}  </Radio>
                           
                        </Form.Item>
                    ))
                }
                 </Radio.Group>
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