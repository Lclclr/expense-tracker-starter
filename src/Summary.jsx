const fmtAmount = (n) => {
  const abs = Math.abs(n);
  const whole = Math.floor(abs).toLocaleString("en-US");
  const cents = (abs % 1).toFixed(2).slice(2);
  return { whole, cents };
};

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const { whole, cents } = fmtAmount(balance);
  const sign = balance < 0 ? "−" : "";

  return (
    <>
    <div className="section-label" data-numeral="i.">Statement of account</div>
    <section className="summary">
      <div className="summary-hero">
        <div className="summary-hero-label">Balance on hand</div>
        <div className="summary-hero-value">
          {sign && <span className="sign">{sign}</span>}
          <span>${whole}</span>
          <span className="cents">.{cents}</span>
        </div>
        <div className="summary-hero-caption">
          {balance >= 0
            ? "Income exceeds outflow. Steady as she goes."
            : "Outflow exceeds income. Trim where you can."}
        </div>
      </div>

      <div className="summary-stats">
        <div className="summary-stat income">
          <div className="summary-stat-label">Income</div>
          <div className="summary-stat-value">
            <span className="stat-sign">+</span>${totalIncome.toLocaleString("en-US")}
          </div>
        </div>
        <div className="summary-stat expense">
          <div className="summary-stat-label">Expenses</div>
          <div className="summary-stat-value">
            <span className="stat-sign">−</span>${totalExpenses.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Summary;
