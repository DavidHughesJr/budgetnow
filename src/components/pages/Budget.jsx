import { Card, Space, Typography, Progress, Button, Divider, Select } from 'antd'
import React, { useContext, useState } from 'react'
import IncomeForm from '../events/IncomeForm';
import { BudgetContext } from '../../context/BudgetContextProvider'
import { InvestmentContext } from '../../context/InvestmentContextProvider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const Budget = () => {

  const { Title } = Typography
  const { Text } = Typography
  const { Paragraph } = Typography

  const { budget } = useContext(BudgetContext)
  const { categories } = useContext(BudgetContext)
  const { transactions } = useContext(BudgetContext)
  const totalIncome = budget[0].amount + budget[1].amount

  const budgetAndSavings = [
    { text: 'Your Total Income', title: `$${totalIncome}`, subtitle1: 'Primary', subtitle1Text: `$${budget[0].amount}`, subtitle2: 'Secondary', subtitle2Text: `$${budget[1].amount}` },
    { text: 'Your Total Savings', title: `$0`, subtitle1: 'Contributions', subtitle1Text: `$0`, subtitle2: 'Withdrawals', subtitle2Text: `$0` },
  ]

  const totalBudget = categories.reduce((acc, arr) => acc + arr.cap,
    0)


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {

        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "RGB(24, 144, 255, 0.2)",
        borderColor: "RGB(24, 144, 255)"
      },
    ]
  };

  const [isShown, setIsShown] = useState(false)
  const handlePopup = event => {
    setIsShown(true)
  }


  return (
    <div>
      {isShown && (
        <IncomeForm isShown={isShown} setIsShown={setIsShown} />
      )}
      <div className={!isShown ? 'layout' : 'layout popup-background'}>
        <Space className='layout' direction='horizontal' align=''>
          {
            budgetAndSavings?.map(({ text, title, subtitle1, subtitle1Text, subtitle2, subtitle2Text }) =>
              <Card className='card-small no-border' bordered='false'>
                <div key={text}>
                  <div className='flex-between'>
                    <Title level={5}> {text} </Title>
                  </div>
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
          <Card className='card-wide-mini no-border' >
            <Space>
              <Progress width='155px' type="circle" percent={75} format={amount => `$${budget[0].amount}`} />
              <div >
                <Title level={5}> Monthly Limit: ${totalBudget}  </Title>
                <Title level={5}> Remaining:  $15000 </Title>
              </div>
            </Space>
          </Card>
          <Card className='btn-center no-border'>
            <Button onClick={handlePopup}> Add Income </Button>
          </Card>
        </Space>
        <div className='layout-2' direction='horizontal'>
          <Card className='card-large-3 no-fill' title="Activities" hoverable={true} extra={
            <Select defaultValue="week">
              <Select.Option value="week">Week</Select.Option>
              <Select.Option value="month">Month</Select.Option>
            </Select>
          }>
            <div style={{ height: '300px' }}>
              <Line height="100%" width="100%" options={options} data={data} />
            </div>
          </Card>
          <Card className='card-large-2' title="Transaction" hoverable={true}>
            <div className='overflow-scroll'>
              {
                transactions.map((items) => (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Title level={5}> {items.name} </Title>
                        <Text style={{ color: '#001529' }}> {items.category}</Text>
                      </div>
                      <Paragraph style={{ color: '#1890FF', marginRight: '10px' }}> Amount: {items.cost}</Paragraph>
                    </div>
                    <Divider />
                  </>
                ))
              }
            </div>
          </Card>
          <Card className='card-large-1' title="Categories" hoverable={true}>
            <div className='overflow-scroll'>
              {
                categories.map((items) => (
                  <>
                    <Title level={5}> {items.name} </Title>
                    <Text style={{ color: '#1890FF' }}> Limit: {items.cap}</Text>
                    <Divider />
                  </>
                ))
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Budget