import { useState } from 'react'

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "2-digit" });
};

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

  return (
    <section className="transactions">
      <div className="section-label" data-numeral="iv.">The Register</div>
      <h2>Every entry, as it was written.</h2>
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

      {filteredTransactions.length === 0 ? (
        <div className="transactions-empty">
          Nothing recorded under this view.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entry</th>
              <th>Category</th>
              <th className="col-amount">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="cell-date">{formatDate(t.date)}</td>
                <td className="cell-description">{t.description}</td>
                <td className="cell-category">{t.category}</td>
                <td className={`cell-amount col-amount ${t.type === "income" ? "income" : "expense"}`}>
                  <span className="amt-sign">{t.type === "income" ? "+" : "−"}</span>
                  ${t.amount.toLocaleString("en-US")}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    aria-label="Delete entry"
                    title="Delete"
                    onClick={() => {
                      if (window.confirm("Strike this entry from the register?")) onDelete(t.id);
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionList;
