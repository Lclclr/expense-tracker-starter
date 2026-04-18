function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const fmt = (n) => n.toLocaleString('en-US');

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income &mdash; in</h3>
        <p className="income-amount"><span className="currency">$</span>{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses &mdash; out</h3>
        <p className="expense-amount"><span className="currency">$</span>{fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card">
        <h3>Balance &mdash; net</h3>
        <p className="balance-amount"><span className="currency">$</span>{fmt(balance)}</p>
      </div>
    </div>
  );
}

export default Summary;
