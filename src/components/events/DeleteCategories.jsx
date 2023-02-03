import {
    Button,
    Form,
    Typography,
    Radio,
} from 'antd';
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContextProvider';


const DeleteCategories = ({ isShown, setIsShown, setIsDeleteCategory }) => {

    const { dispatch } = useContext(BudgetContext)
    const { categories } = useContext(BudgetContext)

    const [deleteThisCategory, setDeleteThisCategory] = useState([])



    const handleClose = (event) => {
        setIsShown(current => !current)
        setIsDeleteCategory(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({
            type: 'DELETE CATEGORY',
            payload: deleteThisCategory,
        })
        setIsShown(current => !current)
        setIsDeleteCategory(current => !current)
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
                    <pre> Delete Category </pre>
                </Typography>
                <Radio.Group>
                    {
                        categories.map((item) => (
                            <Form.Item onChange={(e) => setDeleteThisCategory(e.target.value)}>

                                <Radio value={item.id}> {item.name} | Limit: {item.limit}  </Radio>

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

export default DeleteCategories;