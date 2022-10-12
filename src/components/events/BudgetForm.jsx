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
import uuid from 'react-uuid';

const BudgetInput = ({ isShown, setIsShown }) => {

  const { categories } = useContext(BudgetContext)
  const { dispatch } = useContext(BudgetContext)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [cost, setCost] = useState('')

  const handleClose = (event) => {
    setIsShown(current => !current)
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
          <pre> Add Transaction </pre>
        </Typography>
        <Form.Item label="Name">
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Category">
          <Select onChange={(e) => setCategory(e)}>
            {
              categories?.map((arr) => <Select.Option value={arr.name}> {arr.name} </Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item label="Cost" name="input-number" >
          <InputNumber onChange={(e) => setCost(e)} min={1} />
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

export default BudgetInput;