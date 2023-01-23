import { Card, Space, Typography, Progress, Button, List, } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useContext, useState, useEffect } from 'react'
import IncomeForm from '../events/IncomeAndSavingsForm';
import TransactionForm from '../events/TransactionForm';
import CategoryForm from '../events/CategoryForm';
import { BudgetContext } from '../../context/BudgetContextProvider'
import { fetchOverviewNews } from '../../api/apiConfig';
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
  const { Meta } = Card;


  const { budget } = useContext(BudgetContext)
  const { categories } = useContext(BudgetContext)
  const { transactions } = useContext(BudgetContext)
  const totalIncome = budget[0].amount + budget[1].amount
  const totalSavings = budget[2].amount + budget[3].amount

  const budgetAndSavings = [
    { text: 'Your Total Income', title: `$${totalIncome}`, subtitle1: 'Primary', subtitle1Text: `$${budget[0].amount}`, subtitle2: 'Secondary', subtitle2Text: `$${budget[1].amount}` },
    { text: 'Your Total Savings', title: `$${totalSavings}`, subtitle1: 'Long Term', subtitle1Text: `$${budget[2].amount}`, subtitle2: 'Short Term', subtitle2Text: `$${budget[3].amount}` },
  ]

  const totalCategorized = categories.reduce((acc, arr) => acc + arr.limit, 0)
  const totalTransactions = transactions.reduce((acc, arr) => acc + arr.cost, 0)
  const percentOnBudget = Math.floor(totalTransactions / totalCategorized * 100)


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const [transactionsAdded, setIsTransactionAdded] = useState([])

 useEffect(() => {
   const transactionsAdded = [...transactions].reduce((items, item) => {
     const { category, cost } = item;
     const itemIndex = items.findIndex(item => item.category === category)
     if (itemIndex === -1) {
       items.push(item);
     } else {
       items[itemIndex].cost += cost
     }
     return items
   }, [])
  setIsTransactionAdded(transactionsAdded)
 },[transactions])
  
  const data = {
    labels: transactionsAdded.map(item => item.category),
    datasets: [
      {
        data: [...transactionsAdded.map(item => item.cost)],
        fill: true,
        backgroundColor: "RGB(24, 144, 255, 0.2)",
        borderColor: "RGB(24, 144, 255)"
      },
    ]
  };



  const [incomeTips, setIncomeTips] = useState([])

  useEffect(() => {
      const incomeTips = async () => {
        const getIncomeTips = await fetchOverviewNews('income')
        setIncomeTips(getIncomeTips)
      }
      incomeTips()
  }, [])
   
  console.log(incomeTips)

   

  const [isShown, setIsShown] = useState(false)
  const [isItem, setIsItem] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [isCategory, setIsCategory] = useState(false)

  const handleAddItemsPopup = event => {
    setIsShown(true)
    setIsItem(true)
  }
  const handleTransactionsPopup = event => {
    setIsShown(true)
    setIsTransaction(true)
  }
  const handleCategoriesPopup = event => {
    setIsShown(true)
    setIsCategory(true)
  }


  return (
    <div>
      {isShown && isItem && (
        <IncomeForm isShown={isShown} setIsShown={setIsShown} setIsItem={setIsItem} />
      )}
      {isShown && isTransaction && (
        <TransactionForm isShown={isShown} setIsShown={setIsShown} setIsTransaction={setIsTransaction} />
      )}
      {isShown && isCategory && (
        <CategoryForm isShown={isShown} setIsShown={setIsShown} setIsCategory={setIsCategory} />
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
              {
                <Progress width='155px' type="circle" percent={percentOnBudget} format={amount => percentOnBudget === '100' ? <h1 style={{ color: 'red' }}> ${totalIncome} </h1> : <h1> ${totalIncome} </h1>}
                  strokeColor={percentOnBudget === '100' ? 'red' : '#1890FF'} />
              }

              <div >
                <Title level={5}> Remaining:  ${totalCategorized - totalTransactions} </Title>
                <Title level={5}> Categorized: ${totalCategorized}  </Title>
              </div>
            </Space>
          </Card>
          <Card className='btn-center no-border'>
            <Button onClick={handleAddItemsPopup}> Add Items </Button>
          </Card>
        </Space>
        <div className='layout-2' direction='horizontal'>
          <Card className='card-large-3 no-fill' title="Activities" hoverable={true} extra={
            <h3> Chart </h3>
          }>
            <div style={{ height: '300px' }}>
              <Line height="100%" width="100%" options={options} data={data} />
            </div>
          </Card>
          <Card className='card-large-2' title="Transaction" hoverable={true} extra={<Button onClick={handleTransactionsPopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
            <div className='overflow-scroll'>
              <List itemLayout="horizontal"
                dataSource={transactions.slice().reverse()}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Title level={5}> {item.name} </Title>}
                      description={<Text style={{ color: '#001529' }}> {item.category}</Text>}
                    />
                    <Paragraph style={{ color: '#1890FF', marginRight: '10px' }}> ${item.cost}</Paragraph>
                  </List.Item>
                )}
              />
            </div>
          </Card>
          <Card className='card-large-1' title="Categories" hoverable={true} extra={<Button onClick={handleCategoriesPopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
            <div className='overflow-scroll'>
              <List itemLayout="horizontal"
                dataSource={categories.sort((a, b) => b.limit - a.limit)}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Title level={5}> {item.name} </Title>}
                      description={<Text style={{ color: '#1890FF' }}> Limit: ${item.limit}</Text>}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </div>
      </div>
      <Space style={{ marginTop: 20 }} direction='vertical'>
        <Title level={2}> News & Daily Tips  </Title>
        <div className='flex-between-wrap'>
          {
            incomeTips?.value?.map(data => (
              <a target="_blank" rel="noreferrer" href={data?.url}>
                <Card
                  key={data?.name}
                  title={data?.name.substr(0, 60) + '...'}
                  hoverable
                  style={{
                    marginBottom: 10,
                    width: 300,
                    height: 400
                  }}
                >
                  <p>{data?.description}</p>
                  <Meta title={data?.provider?.[0]?.name} description={data?.url} />
                </Card>
              </a>
            ))
          }
        </div>
      </Space>
    </div>
  )
}

export default Budget