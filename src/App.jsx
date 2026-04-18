import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingByCategory from './SpendingByCategory'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

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

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-left">
          <p className="eyebrow">Vol. I &nbsp;·&nbsp; Issue 04 &nbsp;·&nbsp; A zine about money</p>
          <h1 className="title">The <em>Ledger</em></h1>
          <p className="subtitle">
            Field notes from the quiet arithmetic of everyday life &mdash; dollars in, dollars out, one honest row at a time.
          </p>
        </div>
        <div className="masthead-right">
          <span className="issue">№ 04</span>
          <span className="rule"></span>
          <div>{today}</div>
          <div>Pulp &amp; Ink Press</div>
        </div>
      </header>

      <section>
        <div className="section-label">
          <span className="num">i.</span>
          <span>The State of Things</span>
          <span className="bar"></span>
        </div>
        <Summary transactions={transactions} />
      </section>

      <section>
        <div className="section-label">
          <span className="num">ii.</span>
          <span>Where It Went</span>
          <span className="bar"></span>
        </div>
        <SpendingByCategory transactions={transactions} />
      </section>

      <section>
        <div className="section-label">
          <span className="num">iii.</span>
          <span>Add an Entry</span>
          <span className="bar"></span>
        </div>
        <TransactionForm categories={categories} onAdd={addTransaction} />
      </section>

      <section>
        <div className="section-label">
          <span className="num">iv.</span>
          <span>The Full Record</span>
          <span className="bar"></span>
        </div>
        <TransactionList transactions={transactions} categories={categories} onDelete={deleteTransaction} />
      </section>

      <footer className="colophon">
        <span>Set in Gambarino &amp; Satoshi</span>
        <span className="mark">&mdash; fin &mdash;</span>
        <span>Printed in two colors</span>
      </footer>
    </div>
  );
}

export default App
