import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingByCategory from './SpendingByCategory'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const formatIssue = () => {
  const d = new Date();
  const vol = d.getFullYear() - 2025 + 1;
  const issue = d.getMonth() + 1;
  return `Vol. ${String(vol).padStart(2, "0")} · No. ${String(issue).padStart(2, "0")}`;
};

const formatToday = () => {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const addTransaction = (fields) => {
    const newTransaction = {
      id: Date.now(),
      ...fields,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-meta">
          <span>{formatIssue()}</span>
          <span>{formatToday()}</span>
          <span>Private Edition</span>
        </div>
        <div className="masthead-meta">
          <span>est. mmxxv</span>
        </div>
      </header>

      <h1 className="masthead-title">
        The Ledger<span className="amp">&</span>Record
      </h1>
      <p className="subtitle">
        A private account of what comes in, what goes out, and what remains &mdash;
        kept honestly, tallied daily.
      </p>

      <Summary transactions={transactions} />
      <SpendingByCategory transactions={transactions} />
      <TransactionForm categories={categories} onAdd={addTransaction} />
      <TransactionList transactions={transactions} categories={categories} onDelete={deleteTransaction} />

      <footer className="app-footer">
        <span>Kept by hand · No accounts, no cloud</span>
        <span className="app-footer-mark">fin.</span>
        <span>{transactions.length} entries on file</span>
      </footer>
    </div>
  );
}

export default App
