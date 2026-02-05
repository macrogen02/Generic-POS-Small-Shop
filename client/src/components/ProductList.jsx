import { formatPhp } from '../lib/currency';

export default function ProductList({ products, onAddToCart }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Inventory</h2>
      <div className="space-y-2">
        {products.length === 0 ? (
          <p className="text-sm text-slate-500">No products yet. Add your first item.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="flex items-center justify-between rounded border border-slate-100 p-2">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-slate-500">
                  {product.category} • {formatPhp(product.price)} • Stock: {product.stock}
                </p>
              </div>
              <button
                disabled={product.stock <= 0}
                onClick={() => onAddToCart(product)}
                className="rounded bg-blue-600 px-2 py-1 text-sm text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Add
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
