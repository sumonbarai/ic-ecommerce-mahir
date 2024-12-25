import ProductCard from "../components/ProductCard";
import { useGetAllProductsQuery } from "../features/api/apiSlice";

const Shop = () => {
  const { data = [], isLoading, error } = useGetAllProductsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && error) {
    content = <p>{error}</p>;
  }
  if (!isLoading && data.length) {
    content = data.map((pro) => <ProductCard key={pro.id} product={pro} />);
  }

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__details">
          <div className="page-banner__details__title">
            <h1>Our E-commerce Website</h1>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="section__head">
            <div className="product__details__title">
              <h2>All Products</h2>
            </div>
          </div>
          <div className="section__content">
            <div className="grid three">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
