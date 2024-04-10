import { ReactElement, useEffect, useState } from "react";
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

  const fetchProducts = async (): Promise<Product[]> => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=${PRODUCT_PER_LOAD}&skip=${
        PRODUCT_PER_LOAD * noOfLoads
      }&select=title,price,images`
    )
      .then((res) => res.json())
      .catch((err) => {
        if (err instanceof Error) throw new Error(err.message);
      });

    return data.products;
  };

  const handleLoadMore = () => {
    if (noOfLoads === LOAD_LIMIT - 1) return;
    setNoOfLoads(noOfLoads + 1);
  };

  useEffect(() => {
    fetchProducts().then((p) => {
      setProducts([...products, ...p]);
    });
  }, [noOfLoads]);

  let pageContent: ReactElement | ReactElement[] = <div>Loading...</div>;
  if (products.length) {
    pageContent = products.map((p) => {
      return (
        <div key={p.id} className="product-card">
          <div className="img-container">
            <img src={p.images[0]}></img>
          </div>
          <h2>{p.title}</h2>
        </div>
      );
    });
  }

  const limitReached = noOfLoads === LOAD_LIMIT - 1;

  return (
    <div>
      <div className="box">{pageContent}</div>
      {products.length ? (
        <div>
          <button
            disabled={limitReached}
            onClick={handleLoadMore}
            className={limitReached ? "disabled-btn" : "active-btn"}
          >
            Load more
          </button>
          {limitReached ? <div>Reached 100 products</div> : null}
        </div>
      ) : null}
    </div>
  );
}
