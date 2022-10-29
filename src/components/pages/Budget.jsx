import { Card, Space, Typography } from 'antd'
import React, { useContext } from 'react'
import { BudgetContext } from '../../context/BudgetContextProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const Budget = () => {

  const { Title } = Typography
  const { Text } = Typography

  const { budget } = useContext(BudgetContext)

  const totalIncome = budget[0].amount + budget[1].amount

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log(budget)

  return (
    <>
      <Space direction='horizontal' align=''>
        <Card hoverable='true' style={{ width: '200px' }}>
        <div>
          <Text> Your Total Income </Text>
          <Title style={{ margin: 10 }}>  ${totalIncome} </Title>
          <div style={{ width: '150px', flexDirection: 'column' }}>
            <div className='flex-between' >
              <Text> Primary:</Text>
              <Text> ${budget[0].amount}</Text>
            </div>
            <div className='flex-between' >
              <Text> Secondary:</Text>
              <Text> ${budget[1].amount}</Text>
            </div>
          </div>
        </div>
        </Card>
        <Card>
        <Doughnut data={data} />
        </Card>
      </Space>
    </>
  )
}

export default Budget