import { useState } from 'react'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const fmt = (n) => n.toLocaleString('en-US');

  return (
    <div className="transactions">
      <h2>The <em>full</em> record</h2>
      <p className="transactions-sub">Every line, in chronological order, nothing hidden.</p>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "−"}${fmt(t.amount)}
              </td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm("Tear this entry out?")) onDelete(t.id);
                  }}
                >
                  Strike
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
