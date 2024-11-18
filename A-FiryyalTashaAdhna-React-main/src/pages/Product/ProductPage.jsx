import { useState, useEffect, useRef, useTransition } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";
import getAllProductCategories from "../../services/getAllProductCategories";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const radioButtonOpts = useRef([
    {
      label: "All",
      value: "all",
    },
  ]);

  const originalProducts = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function fetchAllProducts() {
      const allProducts = getAllProducts();
      originalProducts.current = allProducts.length > 0 ? allProducts : [];
      setProducts(allProducts);
    }

    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories
        .map((cat) => ({ label: cat.name, value: cat.slug }))
        .filter((newCat) => !radioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value));
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
    }

    fetchCategories();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const filtered = originalProducts.current.filter((product) => {
        const matchedCategory = selectedCategory === "all" || product.categorySlug === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchedCategory && matchesSearch;
      });

      setProducts(filtered);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <div className="container mx-auto py-8 px-4">
        {/* Filter Section */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter</h3>
          <div className="flex flex-wrap gap-4">
            <RadioButton options={radioButtonOpts.current} defaultValue={"all"} onChange={handleCategoryChange} />
          </div>
        </div>

        {/* Product Grid */}
        <section>
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CardList products={products} isPending={isPending} />
          </main>
        </section>
      </div>
    </>
  );
}
