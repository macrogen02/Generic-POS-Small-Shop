import { useEffect, useState } from 'react';
import CartPanel from './components/CartPanel';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SalesHistory from './components/SalesHistory';

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [productsData, salesData] = await Promise.all([
        fetchJson('/api/products'),
        fetchJson('/api/sales')
      ]);
      setProducts(productsData);
      setSales(salesData);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (form) => {
    await fetchJson('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    await loadData();
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          return prev;
        }
        return prev.map((item) =>
          item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          maxStock: product.stock
        }
      ];
    });
  };

  const changeQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const nextQty = item.quantity + delta;
          if (nextQty > item.maxStock) return item;
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const checkout = async () => {
    setLoadingCheckout(true);
    try {
      await fetchJson('/api/sales/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          paymentMethod: 'Cash',
          cashier: 'Owner'
        })
      });

      setCartItems([]);
      await loadData();
    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-xl bg-slate-900 p-4 text-white shadow">
          <h1 className="text-2xl font-bold">Sari-Sari Store POS</h1>
          <p className="text-sm text-slate-200">Simple React + Tailwind + MongoDB point-of-sale system.</p>
        </header>

        {error && <p className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <ProductForm onCreate={handleCreateProduct} />
            <CartPanel
              cartItems={cartItems}
              onChangeQty={changeQuantity}
              onCheckout={checkout}
              loading={loadingCheckout}
            />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <ProductList products={products} onAddToCart={addToCart} />
            <SalesHistory sales={sales} />
          </div>
        </section>
      </div>
    </main>
  );
}
