import { Layout } from "antd";
import Nav from "./components/Nav";
import React from "react";
import Overview from "./components/Overview";
import Budget from "./components/Budget"
import Investments from './components/Investment'
import Schedule from './components/Schedule'
import { Routes, Route } from "react-router-dom";
import BudgetContextProvider from "./context/BudgetContext";

const { Header, Content, Footer } = Layout;

const App = () => (
  <BudgetContextProvider>
    <Layout>
      <Nav />
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/investment" element={<Investments />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          DavidHughesJr Design ©2021 Created For Youtube
        </Footer>
      </Layout>
    </Layout>
  </BudgetContextProvider>
);

export default App;
