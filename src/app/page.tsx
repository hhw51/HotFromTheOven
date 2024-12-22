import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SectionTitle from "./components/AllProducts/SectionTitle";
import ProductGrid from "./components/AllProducts/ProductGrid";
import CatalogButton from "./components/AllProducts/CatalogButton";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <div className="mx-auto max-w-screen-lg px-6">
        <SectionTitle />
        <ProductGrid />
        <CatalogButton />
      </div>
    </div>
  );
}
