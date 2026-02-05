import { useState } from 'react';

const initialForm = {
  name: '',
  category: 'General',
  sku: '',
  price: '',
  stock: ''
};

export default function ProductForm({ onCreate }) {
  const [form, setForm] = useState(initialForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate(form);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-xl bg-white p-4 shadow">
      <h2 className="text-lg font-semibold text-slate-900">Add Item</h2>
      <input
        className="rounded border border-slate-200 p-2"
        placeholder="Product Name"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        required
      />
      <input
        className="rounded border border-slate-200 p-2"
        placeholder="Category"
        value={form.category}
        onChange={(event) => setForm({ ...form, category: event.target.value })}
      />
      <input
        className="rounded border border-slate-200 p-2"
        placeholder="SKU"
        value={form.sku}
        onChange={(event) => setForm({ ...form, sku: event.target.value })}
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min="0"
          step="0.01"
          className="rounded border border-slate-200 p-2"
          placeholder="Price"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
          required
        />
        <input
          type="number"
          min="0"
          className="rounded border border-slate-200 p-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(event) => setForm({ ...form, stock: event.target.value })}
          required
        />
      </div>
      <button className="rounded bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700">
        Save Product
      </button>
    </form>
  );
}
