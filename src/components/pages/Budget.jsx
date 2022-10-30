import { Card, Space, Typography, Progress } from 'antd'
import React, { useContext } from 'react'
import { BudgetContext } from '../../context/BudgetContextProvider'
import { InvestmentContext } from '../../context/InvestmentContextProvider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);



const Budget = () => {

  const { Title } = Typography
  const { Text } = Typography

  const { budget } = useContext(BudgetContext)
  const { categories } = useContext(BudgetContext)

  const totalIncome = budget[0].amount + budget[1].amount



  return (
    <>
      <Space direction='horizontal' align=''>
        <Card hoverable='true' style={{ width: '200px' }}>
          <div>
            <Text> Your Total Income </Text>
            <Title style={{ margin: 21.5 }}>  ${totalIncome} </Title>
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
        <Card style={{ width: '150px', flexDirection: 'column' }} hoverable='true'>
          <Space direction='vertical' style={{ marginTop: '10px', fontSize: '10px' }}>
          <Progress width='98px' type="circle" percent={75} format={amount => `$${budget[0].amount}`} />
            <Text> Monthly Limit: 20000  </Text>
            <Text> Remaining:  15000 </Text>
          </Space>
        </Card>
      </Space>
    </>
  )
}

export default Budget