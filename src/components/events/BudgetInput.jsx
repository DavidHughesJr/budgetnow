import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Typography
} from 'antd';
import React from 'react';

const App = () => {
 

  return (
    <div>
      <Form className='popup-form'
        labelCol={{
          span: 5,
        }}
        layout="horizontal"
        size={'small'}
      >
        <Button> x </Button>
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

export default App;