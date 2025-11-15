import { Flex, Box } from "@chakra-ui/react";
import { useUiState } from "../hooks/useUiState";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import ErrorState from "../components/common/ErrorState";
import FavoritesToggle from "../components/pokemon/FavoritesToggle";
import PokemonDetails from "../components/pokemon/PokemonDetails";
import PokemonList from "../components/pokemon/PokemonListOld";
import SearchBar from "../components/pokemon/SearchBar";
import Loader from "../components/common/Loader";

const HomePage = () => {
  const {
    selectedPokemonId,
    searchTerm,
    showFavoritesOnly,
    setSelectedPokemonId,
    setSearchTerm,
    setShowFavoritesOnly,
  } = useUiState();

  const {
    items,
    total,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
    loadMore,
    hasMore,
    refetch: refetchList,
  } = usePokemonList({ searchTerm, showFavoritesOnly });

  const {
    data: selectedPokemon,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    errorMessage: detailsErrorMessage,
  } = usePokemonDetails(selectedPokemonId);

  const { addFavorite, removeFavorite, isAdding, isRemoving } =
    useFavoriteActions();

  const handleToggleFavorite = () => {
    if (!selectedPokemon) return;

    const payload = {
      pokemonId: selectedPokemon.id,
      name: selectedPokemon.name,
      spriteUrl: selectedPokemon.spriteUrl,
      types: selectedPokemon.types,
    };

    if (selectedPokemon.isFavorite) {
      removeFavorite(selectedPokemon.id);
    } else {
      addFavorite(payload);
    }
  };

  return (
    <Flex gap={4} minH="70vh">
      {/* Left side: list + filters */}
      <Box flexBasis={["100%", "40%"]} maxW={["100%", "40%"]}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <FavoritesToggle
          value={showFavoritesOnly}
          onChange={setShowFavoritesOnly}
        />

        {isListLoading && <Loader message="Loading Pokémon..." />}

        {isListError && (
          <ErrorState
            message={listErrorMessage ?? "Failed to load Pokémon"}
            onRetry={refetchList}
          />
        )}

        {!isListLoading && !isListError && (
          <PokemonList
            items={items}
            total={total}
            selectedId={selectedPokemonId}
            onSelect={setSelectedPokemonId}
            onLoadMore={loadMore}
            hasMore={hasMore}
          />
        )}
      </Box>

      {/* Right side: details */}
      <Box flex="1" display={["none", "block"]}>
        <PokemonDetails
          pokemon={selectedPokemon}
          isLoading={isDetailsLoading}
          isError={isDetailsError}
          errorMessage={detailsErrorMessage}
          onToggleFavorite={handleToggleFavorite}
          isUpdatingFavorite={isAdding || isRemoving}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
