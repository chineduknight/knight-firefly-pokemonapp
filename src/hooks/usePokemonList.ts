import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonApi } from "../api/pokemonApi";
import type { PokemonListItem, PokemonListResponse } from "../types/pokemon";

const TOTAL_LIMIT = 150;
const PAGE_SIZE = 30;

interface UsePokemonListOptions {
  searchTerm?: string;
  showFavoritesOnly?: boolean;
}

interface UsePokemonListResult {
  items: PokemonListItem[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  loadMore: () => void;
  hasMore: boolean;
  refetch: () => void;
}

export const usePokemonList = (
  options: UsePokemonListOptions = {}
): UsePokemonListResult => {
  const { searchTerm = "", showFavoritesOnly = false } = options;

  // How many items we are *currently* showing (for infinite scroll UI)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, isLoading, isError, error, refetch } =
    useQuery<PokemonListResponse>({
      queryKey: ["pokemonList"],
      queryFn: () => PokemonApi.getPokemonList(TOTAL_LIMIT),
      staleTime: 1000 * 60, // 1 minute cache
    });

  // Apply filters (search + favorites only) on the full list
  const filteredItems = useMemo(() => {
    if (!data?.items) return [];

    let items = data.items;

    if (showFavoritesOnly) {
      items = items.filter((item) => item.isFavorite);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(term));
    }

    return items;
  }, [data, searchTerm, showFavoritesOnly]);

  // Slice for infinite scroll: show up to visibleCount
  const slicedItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const hasMore = slicedItems.length < filteredItems.length;

  const loadMore = () => {
    if (!hasMore) return;
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return {
    items: slicedItems,
    total: filteredItems.length,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    loadMore,
    hasMore,
    refetch,
  };
};
