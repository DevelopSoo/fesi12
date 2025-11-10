// src/components/organisms/Products.tsx

import Product from "../molecules/Product";

export default function Products({
  data,
}: {
  data: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Product
          key={item.title}
          title={item.title}
          content={item.description}
        />
      ))}
    </div>
  );
}
