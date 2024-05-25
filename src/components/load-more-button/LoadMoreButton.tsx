import { useEffect, useState } from "react";
import "./load-more-button.css";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const PRODUCT_PER_LOAD = 10;
const LOAD_LIMIT = 5;

export default function LoadMoreButton() {
  const [products, setProducts] = useState<Product[]>([]);
  const [noOfLoads, setNoOfLoads] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    else if (err && typeof err === "object" && "message" in err)
      return String(err.message);
    else if (typeof err === "string") return err;
    else return "Something went wrong.";
  };

  const loadMore = () => {
    setNoOfLoads(noOfLoads + 1);
  };

  useEffect(() => {
    const fetchProducts = async (): Promise<Product[]> => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCT_PER_LOAD}&skip=${
            PRODUCT_PER_LOAD * noOfLoads
          }&select=title,price,images`
        );
        const responseJSON = await response.json();

        return responseJSON.products;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        return [];
      }
    };

    fetchProducts().then((p) => {
      setProducts([...products, ...p]);
    });
  }, [noOfLoads]);

  useEffect(() => {
    if (noOfLoads === LOAD_LIMIT - 1) setDisableBtn(true);
  }, [noOfLoads]);

  if (error) return <div>{error}</div>;
  if (!products.length) return <div>Loading...</div>;

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products.length
          ? products.map((p) => {
              return (
                <div key={p.id} className="product-card">
                  <img src={p.images[0]}></img>
                  <h2>{p.title}</h2>
                </div>
              );
            })
          : null}
      </div>
      {products.length ? (
        <div>
          <button
            disabled={disableBtn}
            onClick={loadMore}
            className={disableBtn ? "disabled-btn" : "active-btn"}
          >
            Load more
          </button>
          {disableBtn ? <div>You have reached to 100 products</div> : null}
        </div>
      ) : null}
    </div>
  );
}
