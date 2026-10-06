import { monthHeader, pts, relativeDay } from '@/lib/loyalty/format';

export function TransactionItem({ tx }) {
  const plus = tx.points > 0;
  return (
    <li className={`mr-tx ${plus ? 'mr-tx--earn' : 'mr-tx--spend'}`}>
      <span className="mr-tx__sign" aria-hidden="true">
        {plus ? '+' : '−'}
      </span>
      <span className="mr-tx__body">
        <span className="mr-tx__label">{tx.label}</span>
        <span className="mr-tx__date">{relativeDay(tx.date)}</span>
      </span>
      <span className="mr-tx__pts">
        <span className="mr-sr">{plus ? 'ganaste' : 'usaste'} </span>
        {plus ? '+' : '−'}
        {pts(Math.abs(tx.points))}
        <small> PTS</small>
      </span>
    </li>
  );
}

export function ActivityList({ transactions, limit }) {
  const list = limit ? transactions.slice(0, limit) : transactions;
  return (
    <ul className="mr-txList">
      {list.map((tx) => (
        <TransactionItem key={tx.id} tx={tx} />
      ))}
    </ul>
  );
}

/** Full history, grouped by month — lives in a sheet off Home. */
export function ActivityByMonth({ transactions }) {
  const groups = [];
  for (const tx of transactions) {
    const h = monthHeader(tx.date);
    if (groups.at(-1)?.h !== h) groups.push({ h, items: [] });
    groups.at(-1).items.push(tx);
  }
  return groups.map((g) => (
    <section key={g.h} className="mr-txMonth">
      <h3 className="mr-txMonth__h">{g.h}</h3>
      <ActivityList transactions={g.items} />
    </section>
  ));
}
