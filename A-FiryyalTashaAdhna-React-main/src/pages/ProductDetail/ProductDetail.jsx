import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
        <h1 className="text-4xl text-pink-600 font-semibold">PRODUCT NOT FOUND.</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 lg:px-24">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faArrowLeftLong} className="text-2xl" />
          </Link>
          <h1 className="text-3xl font-semibold">{product.name ?? "No Label"}</h1>
        </div>

        {/* Product Details */}
        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          {/* Product Image */}
          <div className="flex-1">
            <img
              src={product.imageUrl}
              alt={product.name ?? "No Name"}
              className="w-full max-w-lg mx-auto h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-4xl font-semibold text-gray-800">
              {formatToIDRCurrency(product.price) ?? "Not For Sale"}
            </h2>
            <span
              className={`font-medium ${
                product.stock > 0 ? (product.stock <= 10 ? "text-yellow-500" : "text-green-500") : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? product.stock <= 10
                  ? "Almost out of stock"
                  : "In Stock"
                : "Out of Stock"}
            </span>
            <span className="text-gray-600">Category: {product.category ?? "Uncategorized"}</span>

            {/* Add to Cart Button */}
            <Button
              type="button"
              className={`inline-flex items-center justify-center gap-2 p-4 text-center rounded-lg ${
                product.stock > 0
                  ? "bg-black text-white hover:bg-blue-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={product.stock === 0}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
            </Button>

            {/* Description */}
            <div>
              <h3 className="font-medium text-lg text-gray-800">Description</h3>
              <p className="text-gray-600 max-w-lg">{product.description ?? "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
