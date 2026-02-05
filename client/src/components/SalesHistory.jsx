import { formatPhp } from '../lib/currency';

export default function SalesHistory({ sales }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent Sales</h2>
      <div className="space-y-2">
        {sales.length === 0 ? (
          <p className="text-sm text-slate-500">No sales yet.</p>
        ) : (
          sales.map((sale) => (
            <div key={sale._id} className="rounded border border-slate-100 p-2 text-sm">
              <p className="font-semibold">{formatPhp(sale.total)}</p>
              <p className="text-xs text-slate-500">
                {new Date(sale.createdAt).toLocaleString('en-PH')} • {sale.paymentMethod}
              </p>
              <p className="text-xs text-slate-600">Items: {sale.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
