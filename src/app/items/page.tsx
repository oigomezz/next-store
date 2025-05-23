"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api";

export default function ItemsPage({
  searchParams,
}: {
  readonly searchParams: { readonly search: string };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetch() {
      const search = searchParams.search;
      const res = await fetchProducts(search);
      if (!res) throw new Error("Failed to fetch products");
      if (res.length === 0) {
        setProducts([]);
        return;
      }
      setProducts(res);
    }
    fetch();
  }, []);

  return (
    <section>
      <article className="grid">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b-2 border-gray-200 p-4"
            >
              <img
                className="h-32 w-32 object-cover"
                src={item.images[0]?.replace(/-I\./, "-O.") ?? ""}
                alt={item.title ?? "No title available"}
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {item.title ?? "No title available"}
                </h2>
                <p className="text-gray-500">${item.price ?? "N/A"}</p>
                <p className="text-gray-500">
                  {item.category?.name ?? "Unknown category"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex gap-4 border-b-2 border-gray-200 p-4">
            <p className="text-gray-500">No results found</p>
          </div>
        )}
      </article>
    </section>
  );
}
