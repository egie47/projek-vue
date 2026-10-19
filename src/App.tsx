import { useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: 4999000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
    category: "Audio",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 349000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Nike Air Sneakers",
    price: 899000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "Fashion",
  },
  {
    id: 4,
    name: "Digital Camera",
    price: 3299000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Premium Headphones",
    price: 1299000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Audio",
  },
  {
    id: 6,
    name: "Classic Sneakers",
    price: 599000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
    category: "Fashion",
  },
  {
    id: 7,
    name: "Smart Watch",
    price: 799000,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Everyday Backpack",
    price: 459000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Accessories",
  },
];

const categories = [
  "All Products",
  "Electronics",
  "Audio",
  "Fashion",
  "Accessories",
];

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");

  function addToCart(product: Product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  function removeFromCart(id: number) {
    setCart((currentCart) => {
      const index = currentCart.findIndex((product) => product.id === id);

      if (index === -1) return currentCart;

      return currentCart.filter((_, i) => i !== index);
    });
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Products" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) =>
    price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <main className="store">
      <header className="navbar">
        

        <label className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd>Search</kbd>
        </label>

        <button
          className="cart-link"
          onClick={() =>
            document.getElementById("cart")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <span>🛒</span>
          <span>My Cart</span>
          <b>{cart.length}</b>
        </button>
      </header>

      <nav className="category-nav">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <span className="section-label">HANDPICKED FOR YOU</span>
            <h2>Discover products</h2>
          </div>

          <span className="product-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-wrapper" key={product.id}>
              <span className="category-tag">{product.category}</span>

              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                isAdded={cart.some((item) => item.id === product.id)}
                onAddToCart={() => addToCart(product)}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Products");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="shopping-cart" id="cart">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR SELECTION</span>
            <h2>Shopping cart</h2>
          </div>
          <span className="product-count">{cart.length} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is waiting</h3>
            <p>Produk yang kamu pilih akan muncul di sini.</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((product, index) => (
                <div className="cart-item" key={`${product.id}-${index}`}>
                  <img src={product.image} alt={product.name} />

                  <div className="cart-item-info">
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <aside className="order-summary">
              <h3>Order summary</h3>
              <div>
                <span>Items ({cart.length})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="summary-total">
                <strong>Total</strong>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button
                className="checkout-button"
                onClick={() =>
                  alert("Checkout demo — belum terhubung ke pembayaran.")
                }
              >
                Continue shopping demo →
              </button>
              <p>Secure shopping experience</p>
            </aside>
          </div>
        )}
      </section>

    
    </main>
  );
}

export default App;
