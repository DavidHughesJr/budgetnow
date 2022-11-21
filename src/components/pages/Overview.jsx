
import { Card, Space, Calendar, Typography, Button, List, Col, Row, Divider } from 'antd'
import { PlusOutlined, CrownTwoTone, FireTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';
import BudgetInput from '../events/BudgetForm';
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

    // const investmentTotal = holdings.reduce((acc, arr) => acc + arr.avgPrice, 0)


    const totals = [
        { budget: budget.reduce((acc, arr) => acc + arr.amount, 0) },
        { categories: categories.reduce((acc, arr) => acc + arr.cap, 0) },
        { transactions: transactions.reduce((acc, arr) => acc + arr.cost, 0) }
    ]
    const netWorth = [
        { icon: <CrownTwoTone />, amount: (totals[0].budget) - totals[2].transactions, text: 'Worth' },
        { icon: <FireTwoTone />, amount: 0, text: 'Debts' },
        { icon: <UpCircleTwoTone />, amount: 10000, text: 'Monthly Earnings' },
        { icon: <DownCircleTwoTone />, amount: totals[2].transactions, text: 'Monthly Spend' },
    ]
    const budgetOverview = [
        { text: 'Income', amount: totals[0].budget },
        { text: 'Expenses', amount: totals[2].transactions },
        { text: 'Budgeted', amount: totals[1].categories },
    ]

    return (
        <>
            <Title level={2}>Overview</Title>
            <div>
                {isShown && (
                    <BudgetInput isShown={isShown} setIsShown={setIsShown} />
                )}
                <div className={!isShown ? 'layout' : 'layout popup-background'}>
                    <Space direction='vertical'>
                        <Card className='card-medium' title="Latest Transactions" hoverable={true} extra={<Button onClick={handlePopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
                            <List itemLayout="horizontal"
                                dataSource={transactions.slice(transactions.length - 2).reverse()}
                                renderItem={item => (
                                    <List.Item>
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
                            {
                                budgetOverview?.map(({ text, amount }) => (
                                    <>
                                        <div className='flex-between'>
                                            <List.Item style={{ padding: 5 }}>
                                                <Title level={5} style={{ margin: 10 }}> {text} </Title>
                                                <Title level={5} style={{ margin: 10 }}> ${amount} </Title>
                                            </List.Item>
                                        </div>
                                        <Divider style={{ margin: 0 }} />
                                    </>
                                ))
                            }
                        </Card>
                        <Card className='card-small' title="Top Categories" hoverable={true} >
                            <List itemLayout="horizontal"
                                dataSource={categories.sort((a, b) => b.cap - a.cap).slice(0, 3)}
                                renderItem={item => (
                                    <List.Item style={{ padding: 5 }}>
                                        <Text> {item.name}</Text>
                                        <Text>${item.cap}</Text>
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
                                                    <Title level={5} style={{ margin: 0 }}> {amount} </Title>
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
                                    dataSource={holdings}
                                    renderItem={item => <List.Item>{item.name} | Shares: {item.shares}</List.Item>}
                                />
                            </div>
                        </Card>
                        <Card className='card-small' title="Retirement" hoverable={true}>
                            <List
                                size="small"
                                dataSource={retirement}
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
