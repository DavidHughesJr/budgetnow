import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Typography,
  Space
} from 'antd';
import React, { useState } from 'react';

const BudgetInput = ({isShown, setIsShown}) => {


 const handleClose = event => {
   setIsShown(current => !current)
 }


  return (
    <div style={{display: isShown? 'block' : 'none'}}>
      <Form className='popup-form'
        labelCol={{
          span: 5,
        }}
        layout="horizontal"
        size={'small'}
      >
        <div style={{display: 'flex'}}>
          <Button onClick={handleClose} className='btn-form-close'> Close </Button>
        </div> 
        <Typography>
          <pre> Add Transaction </pre> 
        </Typography>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Category">
          <Select>
            <Select.Option value="demo">Add categories </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Amount" name="input-number" >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
   
  );
};

export default BudgetInput;