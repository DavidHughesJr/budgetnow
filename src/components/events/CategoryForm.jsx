import {
    Button,
    Form,
    Input,
    InputNumber,
    Typography,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';

const CategoryForm = ({ isShown, setIsShown, setIsCategory }) => {

    const { dispatch } = useContext(BudgetContext)

    const [name, setName] = useState('')
    const [limit, setLimit] = useState('')

    const handleClose = () => {
        setIsShown(current => !current)
        setIsCategory(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()


        const categories = {
            name: name,
            limit: limit
        }

        dispatch({
            type: 'ADD CATEGORY',
            payload: categories,
        })
        setIsShown(current => !current)
        setIsCategory(current => !current)
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
                    <pre> Add Category </pre>
                </Typography>
                <Form.Item label="Name">
                    <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Limit" name="input-number" >
                    <InputNumber onChange={(e) => setLimit(e)} min={1} />
                </Form.Item>
                <Form.Item label="">
                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default CategoryForm;