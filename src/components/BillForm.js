import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/actions";
import "./BillForm.css";

const BillForm = () => {
  const [bill, setBill] = useState({
    id: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill.description || !bill.category || !bill.amount || !bill.date) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(addBill({ ...bill, id: Date.now() }));

    setBill({ id: "", description: "", category: "", amount: "", date: "" });
  };

  return (
    <div className="bill-form">
      <h3>Add a New Bill</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={bill.description}
          onChange={(e) => setBill({ ...bill, description: e.target.value })}
        />
        <select
          value={bill.category}
          onChange={(e) => setBill({ ...bill, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="FoodNDining">Food & Dining</option>
          <option value="utility">Utility</option>
          <option value="shopping">Shopping</option>
          <option value="education">Education</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Travel">Travel</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={bill.amount}
          onChange={(e) => setBill({ ...bill, amount: e.target.value })}
        />
        <input
          type="date"
          value={bill.date}
          onChange={(e) => setBill({ ...bill, date: e.target.value })}
        />
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default BillForm;
