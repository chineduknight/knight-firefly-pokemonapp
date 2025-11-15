import {
  Dialog,
  Portal,
  CloseButton,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Button,
  Center,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

import type { PokemonDetails as PokemonDetailsType } from "../../types/pokemon";
import Loader from "../common/Loader";
import ErrorState from "../common/ErrorState";

interface PokemonDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDetailsType | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  onToggleFavorite: () => void;
  isUpdatingFavorite: boolean;
}

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <Box>
    <Heading fontSize="md" mb={2} fontWeight="semibold">
      {title}
    </Heading>

    {items.length > 0 ? (
      <Wrap gap={2}>
        {items.map((item, index) => (
          <WrapItem key={`${title}-${item}-${index}`}>
            <Tag.Root
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              bg="gray.100"
            >
              <TagLabel textTransform="capitalize">{item}</TagLabel>
            </Tag.Root>
          </WrapItem>
        ))}
      </Wrap>
    ) : (
      <Text fontSize="sm" color="fg.muted">
        Not available
      </Text>
    )}
  </Box>
);

const EmptyState = () => (
  <Box
    borderWidth="1px"
    borderRadius="md"
    borderColor="gray.200"
    p={6}
    bg="white"
  >
    <Text color="gray.500">Select a Pokémon to see details.</Text>
  </Box>
);

const PokemonDetailsDialog = ({
  isOpen,
  onClose,
  pokemon,
  isLoading,
  isError,
  errorMessage,
  onToggleFavorite,
  isUpdatingFavorite,
}: PokemonDetailsProps) => {
  const showEmpty = !isLoading && !isError && !pokemon;

  const name = pokemon?.name ?? "Select a Pokémon";
  const spriteUrl = pokemon?.spriteUrl ?? "";
  const types = pokemon?.types ?? [];
  const abilities = pokemon?.abilities ?? [];
  const evolutions = pokemon?.evolutions?.map((e) => e.name) ?? [];
  const isFavorite = Boolean(pokemon?.isFavorite);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content maxW="lg" borderRadius="2xl" p={4} bg="white">
            {/* HEADER */}
            <Dialog.Header pb={0}>
              <Flex align="flex-start" justify="space-between" gap={4}>
                <Flex align="center" gap={4}>
                  <Image
                    src={spriteUrl}
                    alt={name}
                    boxSize="80px"
                    borderRadius="full"
                    border="3px solid"
                    borderColor="gray.100"
                    objectFit="cover"
                  />
                  <Box>
                    <Dialog.Title
                      textTransform="capitalize"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {name}
                    </Dialog.Title>
                    <Text fontSize="sm" color="fg.muted">
                      Pokémon details
                    </Text>
                  </Box>
                </Flex>

                {pokemon && (
                  <Button
                    size="sm"
                    variant={isFavorite ? "solid" : "outline"}
                    colorPalette="yellow"
                    loading={isUpdatingFavorite}
                    onClick={onToggleFavorite}
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FaStar} />
                    {isFavorite ? "Unfavorite" : "Favorite"}
                  </Button>
                )}
              </Flex>
            </Dialog.Header>

            {/* CLOSE BUTTON (Top-Right) */}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top="4" right="4" />
            </Dialog.CloseTrigger>

            {/* BODY */}
            <Dialog.Body pt={6}>
              {isLoading ? (
                <Center minH="200px">
                  <Loader message="Loading details..." />
                </Center>
              ) : isError ? (
                <Center minH="200px">
                  <ErrorState
                    message={errorMessage ?? "Failed to load Pokémon details"}
                  />
                </Center>
              ) : showEmpty ? (
                <Center minH="200px">
                  <EmptyState />
                </Center>
              ) : (
                <Flex direction="column" gap={6}>
                  <Section title="Types" items={types} />

                  <Box h="1px" bg="gray.200" my={2} />

                  <Section title="Abilities" items={abilities} />

                  <Box h="1px" bg="gray.200" my={2} />

                  <Section title="Evolutions" items={evolutions} />
                </Flex>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PokemonDetailsDialog;
