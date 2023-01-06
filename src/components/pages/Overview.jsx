
import { Card, Space, Calendar, Typography, Button, List, Col, Row } from 'antd'
import { PlusOutlined, CrownTwoTone, FireTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';
import TransactionForm from '../events/TransactionForm';
import React, { useState, useContext } from 'react'
import { BudgetContext } from '../../context/BudgetContextProvider';
import { InvestmentContext } from '../../context/InvestmentContextProvider';


const { Title } = Typography;
const { Text } = Typography;
const Overview = () => {

    const [isShown, setIsShown] = useState(false)
    const handlePopup = event => {
        setIsShown(true)
    }
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const { budget } = useContext(BudgetContext)
    const { transactions } = useContext(BudgetContext)
    const { categories } = useContext(BudgetContext)

    const { holdings } = useContext(InvestmentContext)
    const { retirement } = useContext(InvestmentContext)

    const totals = [
        { budget: budget[0].amount + budget[1].amount },
        { savings: budget[2].amount + budget[3].amount },
        { categories: categories.reduce((acc, arr) => acc + arr.limit, 0) },
        { transactions: transactions.reduce((acc, arr) => acc + arr.cost, 0) }
    ]
    const netWorth = [
        { icon: <CrownTwoTone />, amount: (totals[0].budget) - totals[3].transactions, text: 'Worth' },
        { icon: <FireTwoTone />, amount: 0, text: 'Debts' },
        { icon: <UpCircleTwoTone />, amount: totals[0].budget, text: 'Monthly Earnings' },
        { icon: <DownCircleTwoTone />, amount: totals[3].transactions, text: 'Monthly Spend' },
    ]
    const budgetOverview = [
        { text: 'Income', amount: totals[0].budget },
        { text: 'Savings', amount: totals[1].savings },
        { text: 'Expenses', amount: totals[3].transactions },
        { text: 'Budgeted', amount: totals[2].categories },
    ]

  

    return (
        <>
            <Title level={2}>Overview</Title>
            <div>
                {isShown && (
                    <TransactionForm isShown={isShown} setIsShown={setIsShown} />
                )}
                <div className={!isShown ? 'layout' : 'layout popup-background'}>
                    <Space direction='vertical'>
                        <Card className='card-medium' title="Latest Transactions" hoverable={true} extra={<Button onClick={handlePopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
                            <List itemLayout="horizontal"
                                dataSource={transactions.slice(transactions.length - 3).reverse()}
                                renderItem={item => (
                                    <List.Item style={{padding: 2}}>
                                        <List.Item.Meta 
                                            title={item.name}
                                            description={item.category}
                                        />
                                        <div>${item.cost}</div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Card className='card-medium' title="Budget" hoverable={true}>
                        <List itemLayout="horizontal"
                                dataSource={budgetOverview}
                                renderItem={({text, amount}) => (
                                    <List.Item style={{ padding: 5 }}>
                                        <Text> {text}</Text>
                                        <Text> ${amount}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Card className='card-small' title="Top Categories" hoverable={true} >
                            <List itemLayout="horizontal"
                                dataSource={categories.sort((a, b) => b.limit - a.limit).slice(0, 3)}
                                renderItem={item => (
                                    <List.Item style={{ padding: 5 }}>
                                        <Text> {item.name}</Text>
                                        <Text>${item.limit}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Space>
                    <Space direction='vertical'>
                        <Card className='card-medium' title="Net Worth" hoverable={true}>
                            <Row gutter={[16, 16]}>
                                {
                                    netWorth.map(({ icon, amount, text }) => (
                                        <Col span={12} >
                                            <div className='net-worth-overview'>
                                                {icon}
                                                <div>
                                                    <Title level={5} style={{ margin: 0 }}> ${amount} </Title>
                                                    <Text type='secondary'> {text}  </Text>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Card>
                        <Card className='card-medium' title="Investment" hoverable={true}>
                            <div className='flex-list'>
                                <List
                                    size="small"
                                    dataSource={holdings.slice(0, 4)}
                                    renderItem={item => <List.Item>{item.name} | Shares: {item.shares}</List.Item>}
                                />
                            </div>
                        </Card>
                        <Card className='card-small' title="Retirement" hoverable={true}>
                            <List
                                size="small"
                                dataSource={retirement.slice(0, 4)}
                                renderItem={item => <List.Item>{item.name} | {item.symbol}</List.Item>}
                            />
                        </Card>
                    </Space>
                    <Space direction='vertical'>
                        <Calendar className='card-calendar' fullscreen={false} onPanelChange={onPanelChange} />
                        <Card className='card-large' title="Agenda" hoverable={true} >
                            <Text> Test </Text>
                        </Card>
                    </Space>
                </div>
            </div>
        </>

    )
}

export default Overview
