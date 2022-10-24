import { Calendar, Space, Badge } from 'antd';
import React, { useState } from 'react'



const Schedule = () => {

  const [selectedDay, setSelectedDay] = useState(2)

  const getListData = (value) => {
    let listData;

    switch (value.date()) {
      case selectedDay: 
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };


  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('DD'), mode);
  };
  const onSelectChange = (value) => {
    setSelectedDay(+value.format('D'))
    console.log(value.format(''))
  }

  console.log(selectedDay)
  return (
    <>
      <Space direction='vertical'>
        <h2> Calendar </h2>
        <Calendar className='calendar' onPanelChange={onPanelChange} onSelect={onSelectChange} dateCellRender={dateCellRender} />
      </Space>

    </>

  )
}

export default Schedule