import { http } from "./httpClient";
import type { PokemonDetails, PokemonListResponse } from "../types/pokemon";

export const PokemonApi = {
  getPokemonList: async (limit = 150): Promise<PokemonListResponse> => {
    return http.get<PokemonListResponse>(`/pokemon?limit=${limit}`);
  },

  getPokemonDetails: async (id: number): Promise<PokemonDetails> => {
    return http.get<PokemonDetails>(`/pokemon/${id}`);
  },
};
