import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBill, setFilter, setBudget, highlightBills, editBill } from "../redux/actions";
import "./BillDashboard.css";

const BillDashboard = () => {
  const dispatch = useDispatch();
  const { bills, filter, budget, highlightedBills } = useSelector((state) => state);

  const [budgetInput, setBudgetInput] = useState("");
  const [editingBill, setEditingBill] = useState(null); 
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const filteredBills =
    filter === "All" ? bills : bills.filter((bill) => bill.category === filter);

  const handleSetBudget = () => {
    const parsedBudget = parseFloat(budgetInput);
    if (!isNaN(parsedBudget)) {
      dispatch(setBudget(parsedBudget));
      calculateHighlightedBills(parsedBudget); 
    }
  };

//Using DP to calculate the highlighted bills - The difference between the sum of the bills to be highlighted and the budget should be minimum
  const calculateHighlightedBills = useCallback((budget, billsList = bills) => {
    const n = billsList.length;
    const dp = Array(n + 1).fill().map(() => Array(budget + 1).fill(0));
    const keep = Array(n + 1).fill().map(() => Array(budget + 1).fill(false));
  
    for (let i = 1; i <= n; i++) {
      const bill = billsList[i - 1];
      const amount = parseFloat(bill.amount);
      for (let w = 1; w <= budget; w++) {
        if (amount <= w) {
          if (dp[i - 1][w - amount] + amount > dp[i - 1][w]) {
            dp[i][w] = dp[i - 1][w - amount] + amount;
            keep[i][w] = true;
          } else {
            dp[i][w] = dp[i - 1][w];
          }
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    let w = budget;
    const highlighted = [];
    for (let i = n; i > 0; i--) {
      if (keep[i][w]) {
        highlighted.push(billsList[i - 1].id);
        w -= parseFloat(billsList[i - 1].amount);
      }
    }
  
    dispatch(highlightBills(highlighted));
  }, [bills, dispatch]);

  useEffect(() => {
    calculateHighlightedBills(budget);
  }, [bills, budget, calculateHighlightedBills]);

  const handleRemoveBill = (id) => {
    dispatch(removeBill(id));
  };

  const handleEditClick = (bill) => {
    setEditingBill(bill.id);
    setEditForm({
      description: bill.description,
      amount: bill.amount,
      category: bill.category,
    });
  };

  const handleEditSave = () => {
    dispatch(editBill({ ...editForm, id: editingBill }));
    setEditingBill(null);
    setEditForm({ description: "", amount: "", category: "" });
  };

  const handleEditCancel = () => {
    setEditingBill(null);
    setEditForm({ description: "", amount: "", category: "" });
  };

  return (
    <div className="bill-dashboard">
      <h2>Bill Dashboard</h2>

      <select onChange={(e) => dispatch(setFilter(e.target.value))}>
        <option value="All">All</option>
        <option value="FoodNDining">Food & Dining</option>
        <option value="utility">Utility</option>
        <option value="shopping">Shopping</option>
        <option value="education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>

      <div className="monthly-budget">
        <input
          type="number"
          placeholder="Enter Monthly Budget"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
        />
        <button onClick={handleSetBudget}>Set Budget</button>
      </div>

      <ul>
        {filteredBills.map((bill) => (
          <li
            key={bill.id}
            className={highlightedBills.includes(bill.id) ? "highlighted" : ""}
          >
            {editingBill === bill.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                />
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="FoodNDining">Food & Dining</option>
                  <option value="utility">Utility</option>
                  <option value="shopping">Shopping</option>
                  <option value="education">Education</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Travel">Travel</option>
                </select>
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="bill-details">
            <div><b>Description: </b> {bill.description}</div>
            <div><b>Category: </b>{bill.category}</div><br/>
            <div><b>Amount: </b>₹{bill.amount}</div>
          </div>
          <div className="bill-buttons">
            <button onClick={() => handleEditClick(bill)}>Edit</button>
            <button onClick={() => handleRemoveBill(bill.id)}>Remove</button>
          </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="budget-summary">
        <h3>Budget: ₹{budget}</h3>
        <h4>Bills to be paid:</h4>
        <ul>
          {highlightedBills.map((id) => {
            const bill = bills.find((b) => b.id === id);
            if (!bill) return null; 
            return <li key={id}>
              <div>Description: {bill.description}</div>
              <div>Amount: ₹{bill.amount}</div>
              </li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BillDashboard;
