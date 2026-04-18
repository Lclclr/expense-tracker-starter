import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const PALETTE = ["#2d5a3d", "#8b3a1f", "#b8935a", "#4a6b52", "#a8642f", "#6b5230", "#3d5545"];

function SpendingByCategory({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <section className="chart">
      <div className="section-label" data-numeral="ii.">Outflow by category</div>
      <div className="chart-frame">
        {data.length === 0 ? (
          <p className="chart-empty">No expenses recorded yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="2 4" />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={{ stroke: "#d4c9b5" }}
                tick={{ textTransform: "uppercase" }}
                dy={4}
              />
              <YAxis
                tickFormatter={(v) => `$${v}`}
                tickLine={false}
                axisLine={false}
                width={56}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString("en-US")}`, "Spent"]}
                labelFormatter={(l) => l}
                cursor={{ fill: "rgba(26,24,20,0.04)" }}
              />
              <Bar dataKey="amount" radius={[2, 2, 0, 0]} maxBarSize={64}>
                {data.map((entry, i) => (
                  <Cell key={entry.category} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default SpendingByCategory;
