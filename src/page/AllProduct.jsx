import ProductRow from "../components/ProductRow";
import { useGetAllProductsQuery } from "../features/api/apiSlice";

const AllProduct = () => {
  const { data } = useGetAllProductsQuery();

  return (
    <>
      <div className="product-section">
        <div className="product-section__heading">
          <h4>Product list in your app</h4>
        </div>

        <div className="product-table-container">
          <table>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => <ProductRow key={item.id} item={item} />)
              ) : (
                <p>no item found</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
