import Hero from "./components/Hero/Hero";
import SectionTitle from "./components/AllProducts/SectionTitle";
import ProductGrid from "./components/AllProducts/ProductGrid";
// import CatalogButton from "./components/AllProducts/CatalogButton";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <SectionTitle />
        <ProductGrid />
        {/* <CatalogButton /> */}
      </div>
    </div>
  );
}

