import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import BillDashboard from "./components/BillDashboard";
import BillForm from "./components/BillForm";
import TimeSeriesChart from "./components/TimeSeriesChart";
import "./App.css"; 

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="app-header">Bill Manager</h1>
        <BillForm />
        <BillDashboard />
        <TimeSeriesChart />
      </div>
    </Provider>
  );
};

export default App;
