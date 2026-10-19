type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  isAdded: boolean;
  onAddToCart: () => void;
};

function ProductCard({
  name,
  price,
  image,
  isAdded,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h3>{name}</h3>

        <p className="product-price">
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>

        <button
          className={`cart-button ${isAdded ? "added" : ""}`}
          onClick={onAddToCart}
          disabled={isAdded}
        >
          {isAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
