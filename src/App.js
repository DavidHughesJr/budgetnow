import { Layout } from "antd";
import React from "react";
import { Overview, Budget, Investment } from './components/pages/allPages'
import { Nav } from './components/layout/allLayout'
import { Routes, Route } from "react-router-dom";
import BudgetContextProvider from "./context/BudgetContextProvider";
import InvestmentContextProvider from "./context/InvestmentContextProvider";

const { Header, Content, Footer } = Layout;

const App = () => (
  <BudgetContextProvider>
    <InvestmentContextProvider>
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
              <Route path="/investment" element={<Investment />} />
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
    </InvestmentContextProvider>
  </BudgetContextProvider>
);

export default App;
