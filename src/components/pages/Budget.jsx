import { Card, Space, Typography, Progress, Button } from 'antd'
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

  const budgetAndSavings = [
    { text: 'Your Total Income', title: `${totalIncome}`, subtitle1: 'Primary', subtitle1Text: `$${budget[0].amount}`, subtitle2: 'Secondary', subtitle2Text: `$${budget[1].amount}` },
    { text: 'Your Total Savings', title: `$0`, subtitle1: 'Contributions', subtitle1Text: `$0`, subtitle2: 'Withdrawals', subtitle2Text: `$0` },
  ]

  const totalBudget = categories.reduce((acc, arr) => acc + arr.cap,
    0)


  return (
    <>
      <Space className='layout' direction='horizontal' align=''>
        {
          budgetAndSavings?.map(({ text, title, subtitle1, subtitle1Text, subtitle2, subtitle2Text }) =>
            <Card className='card-small' hoverable='true' bordered='false'>
              <div>
                <Text> {text} </Text>
                <Title style={{ margin: 21.5 }}>  {title} </Title>
                <div>
                  <div className='flex-between' >
                    <Text> {subtitle1} </Text>
                    <Text> {subtitle1Text}</Text>
                  </div>
                  <div className='flex-between' >
                    <Text> {subtitle2} </Text>
                    <Text> {subtitle2Text}</Text>
                  </div>
                </div>
              </div>
            </Card>
          )
        }
        <Card className='card-wide-mini' hoverable='true' >
          <Space>
            <Progress width='155px' type="circle" percent={75} format={amount => `$${budget[0].amount}`} />
            <div >
              <Title level={5}> Monthly Limit: ${totalBudget}  </Title>
              <Title level={5}> Remaining:  $15000 </Title>
            </div>
          </Space>
        </Card>
        <Card className='btn-center'>
          <Button> Add Income </Button>
        </Card>
      </Space>
      <Space  className='layout' direction='horizontal'>
        <Card className='card-large-3' title="Activities" hoverable={true}>
          Activities
        </Card>
        <Card className='card-large-2' title="Transaction" hoverable={true}>
          Transaction
        </Card>
        <Card className='card-large' title="Categories" hoverable={true}>
          Categories
        </Card>
      </Space>
    </>
  )
}

export default Budget