import POSForm from "@/components/organisms/point-of-sale/pos-form";
import CategoriesProvider from "@/components/templates/categories-provider";
import ProductsProvider from "@/components/templates/products-provider";

export default function POS() {
  return (
    <div className="flex flex-col w-full h-full justify-center align-middle items-center bg-paper py-4 px-6">
      <CategoriesProvider>
        <ProductsProvider>
          <POSForm />
        </ProductsProvider>
      </CategoriesProvider>
    </div>
  );
}
