
import { Card, Space, Calendar, Typography, Button, List, Col, Row, Divider } from 'antd'
import { PlusOutlined, CrownTwoTone, FireTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';
import BudgetInput from '../events/BudgetForm';
import React, { useState, useContext } from 'react'
import { BudgetContext } from '../../context/BudgetContext';


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

    const { transactions } = useContext(BudgetContext)
    const { categories } = useContext(BudgetContext)
    const { totals } = useContext(BudgetContext)
    const netWorth = [
        { icon: <CrownTwoTone />, amount: 10000, text: 'Worth' },
        { icon: <FireTwoTone />, amount: 10000, text: 'Debts' },
        { icon: <UpCircleTwoTone />, amount: 10000, text: 'Monthly Earnings' },
        { icon: <DownCircleTwoTone />, amount: 10000, text: 'Monthly Spend' },
    ]
    const budget = [
        { text: 'Income', amount: totals[0].budget },
        { text: 'Expenses', amount: totals[2].transactions },
        { text: 'Budgeted', amount: totals[1].categories },
    ]
console.log(categories)
    return (
        <>
            <Title level={2}>Overview</Title>
            <div>
                {isShown && (
                    <BudgetInput isShown={isShown} setIsShown={setIsShown} />
                )}
                <div className={!isShown ? 'layout' : 'layout popup-background'}>
                    <Space direction='vertical'>
                        <Card className='card-medium' title="All Transactions" hoverable={true} extra={<Button onClick={handlePopup} type="primary" size="small"> <PlusOutlined /> </Button>}>
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
                            <div>
                                {
                                    budget?.map(({ text, amount }) => (
                                        <>
                                            <div className='flex-between'>
                                                <Title level={5} style={{ margin: 10 }}> {text} </Title>
                                                <Title level={5} style={{ margin: 10 }}> ${amount} </Title>
                                            </div>
                                            <Divider style={{ margin: 0 }} />
                                        </>
                                    ))
                                }
                            </div>
                        </Card>
                        <Card className='card-small' title="Top Categories" hoverable={true} >
                            <List  itemLayout="horizontal"
                                dataSource={categories.sort((a, b) => b.cap - a.cap).slice(0, 3)}
                                renderItem={item => (
                                    <List.Item style={{padding: 5}}>
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
                        <Card className='card-medium' title="Retirement" hoverable={true}>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        <Card className='card-small' title="Investment" hoverable={true} >
                            <p>Card content</p>
                        </Card>
                    </Space>
                    <Space direction='vertical'>
                        <Calendar className='card-calendar' fullscreen={false} onPanelChange={onPanelChange} />
                        <Card className='card-large' title="Business" hoverable={true} >
                            <Text> Test </Text>
                        </Card>
                    </Space>
                </div>
            </div>
        </>

    )
}

export default Overview
