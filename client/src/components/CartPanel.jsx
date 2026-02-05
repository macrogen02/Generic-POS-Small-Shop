import { formatPhp } from '../lib/currency';

export default function CartPanel({ cartItems, onChangeQty, onCheckout, loading }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Cart</h2>
      <div className="space-y-2">
        {cartItems.length === 0 ? (
          <p className="text-sm text-slate-500">No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId} className="rounded border border-slate-100 p-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">{formatPhp(item.price * item.quantity)}</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => onChangeQty(item.productId, -1)}
                  className="rounded border border-slate-300 px-2"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onChangeQty(item.productId, 1)}
                  className="rounded border border-slate-300 px-2"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 border-t border-slate-200 pt-3">
        <p className="font-semibold text-slate-900">Total: {formatPhp(total)}</p>
        <button
          disabled={cartItems.length === 0 || loading}
          onClick={onCheckout}
          className="mt-2 w-full rounded bg-emerald-600 px-3 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? 'Processing...' : 'Checkout Sale'}
        </button>
      </div>
    </section>
  );
}
