"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsGrid from "@/components/product/ProductsGrid";

const TOP_CATEGORIES = [
  { id: "hombre", label: "Hombre" },
  { id: "mujer", label: "Mujer" },
  { id: "arabe", label: "Árabe" },
  { id: "coleccion", label: "Colección" },
  { id: "kit", label: "Kit Emprendedor" },
] as const;

type CategoryId = (typeof TOP_CATEGORIES)[number]["id"];

export default function ProductCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamValue = searchParams?.get("search") ?? "";

  const [searchQuery, setSearchQuery] = useState<string>(searchParamValue);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("hombre");

  useEffect(() => {
    setSearchQuery(searchParamValue);
  }, [searchParamValue]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const trimmed = value.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    const currentString = searchParams?.toString() ?? "";

    if (queryString !== currentString) {
      router.replace(queryString ? `?${queryString}` : "", { scroll: false });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3">
          {TOP_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "border-gold bg-gold text-black shadow-gold/40"
                    : "border-white/15 bg-white/5 text-gray-300 hover:border-gold/40 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
      <ProductsGrid
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchChange}
        activeCategory={activeCategory}
      />
    </div>
  );
}
