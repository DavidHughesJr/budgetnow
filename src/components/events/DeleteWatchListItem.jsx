import {
    Button,
    Form,
    Typography,
    Radio,
    Select
} from 'antd';
import React, { useState, useContext } from 'react';
import { InvestmentContext } from '../../context/InvestmentContextProvider';


const DeleteWatchListItem = ({ setIsShown, setIsWatchList }) => {

    const { dispatch } = useContext(InvestmentContext)
    const { watchList } = useContext(InvestmentContext)

    const [deleteThisWatchList, setDeleteThisWatchList] = useState([])

    const handleClose = () => {
        setIsWatchList(current => !current)
        setIsShown(current => !current)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({
            type: 'DELETE WATCHLIST',
            payload: deleteThisWatchList,
        })
        setIsWatchList(current => !current)
        setIsShown(current => !current)
    }



    return (
        <div>
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
                    <pre> Delete Watchlist Item  </pre>
                </Typography>
                <Radio.Group>
                    <Form.Item>
                        <Select onSelect={(e) => setDeleteThisWatchList(e)} style={{width: '100px'}} >
                            {
                                watchList.map((item) => <Select.Option  value={item.id}> {item.name} </Select.Option>)
                            }
                        </Select>
                    </Form.Item>
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

export default DeleteWatchListItem;