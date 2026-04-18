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

const RISO_COLORS = [
  "#ff4d6d", // riso pink
  "#2b4cb3", // riso blue
  "#ffc93a", // riso yellow
  "#1f8a8a", // riso teal
  "#ff8042", // warm orange
  "#7a5cff", // ink violet
  "#4a3f35", // ink soft
];

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
    <div className="chart">
      <h2>Where it <em style={{ fontFamily: '"Zodiak", serif', fontStyle: 'italic', color: 'var(--riso-blue)' }}>went</em></h2>
      <p className="chart-sub">Expenses tallied by category, largest first &mdash; printed in two colors and change.</p>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet. The page is blank; the pen is yours.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 16, right: 12, bottom: 4, left: -8 }}>
            <defs>
              {RISO_COLORS.map((c, i) => (
                <pattern
                  key={i}
                  id={`dots-${i}`}
                  x="0"
                  y="0"
                  width="6"
                  height="6"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="6" height="6" fill={c} />
                  <circle cx="3" cy="3" r="1" fill="#1a1714" fillOpacity="0.12" />
                </pattern>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={{ stroke: '#1a1714', strokeWidth: 2 }}
              tick={{ dy: 6 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
              width={56}
            />
            <Tooltip
              cursor={{ fill: 'rgba(26, 23, 20, 0.06)' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'spent']}
              separator=" — "
            />
            <Bar dataKey="amount" radius={[0, 0, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={entry.category}
                  fill={`url(#dots-${i % RISO_COLORS.length})`}
                  stroke="#1a1714"
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategory;
