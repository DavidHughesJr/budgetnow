import { Calendar, Space } from 'antd';
import React from 'react'

const Schedule = () => {

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <>
      <Space direction='vertical'>
        <h2> Calendar </h2>
        <Calendar className='calendar' onPanelChange={onPanelChange} />
      </Space>

    </>

  )
}

export default Schedule