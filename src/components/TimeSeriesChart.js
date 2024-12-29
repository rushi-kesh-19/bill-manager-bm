import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./TimeSeriesChart.css";

const TimeSeriesChart = () => {
  const { bills } = useSelector((state) => state);

  const data = bills.reduce((acc, bill) => {
    const date = new Date(bill.date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;
    const existing = acc.find((item) => item.monthYear === monthYear);
    if (existing) {
      existing.amount += parseFloat(bill.amount);
    } else {
      acc.push({ monthYear, amount: parseFloat(bill.amount) });
    }
    return acc;
  }, []);

  // Sorting the data by month and year so that the later months appear later on the x axis
  const sortedData = data.sort((a, b) => {
    const [monthA, yearA] = a.monthYear.split(" ");
    const [monthB, yearB] = b.monthYear.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateA - dateB;
  });

  return (
    <div className="time-series-chart">
      <h3>Monthly Bills Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
