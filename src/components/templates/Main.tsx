// src/components/templates/Main.tsx

import Header from "../organisms/Header";
import Products from "../organisms/Products";

export default function Main({
  data,
}: {
  data: { title: string; description: string }[];
}) {
  return (
    <div className="container mx-auto">
      <Header />
      <Products data={data} />
    </div>
  );
}
