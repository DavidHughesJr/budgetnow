import {
    Button,
    Form,
    Typography,
    Radio,
} from 'antd';
import React, { useState, useContext } from 'react';
import { InvestmentContext } from '../../context/InvestmentContextProvider';


const DeleteCategories = ({ isShown, setIsShown, setIsDeleteWatchList }) => {

    const { dispatch } = useContext(InvestmentContext)
    const { watchList } = useContext(InvestmentContext)

    const [deleteThisWatchList, setDeleteThisWatchList] = useState([])



    const handleClose = () => {
        setIsShown(current => !current)
        setIsDeleteWatchList(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({
            type: 'DELETE WATCHLIST',
            payload: deleteThisWatchList,
        })
        setIsShown(current => !current)
        setIsDeleteWatchList(current => !current)
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
                        watchList.map((item) => (
                            <Form.Item onChange={(e) => setDeleteThisWatchList(e.target.value)}>
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