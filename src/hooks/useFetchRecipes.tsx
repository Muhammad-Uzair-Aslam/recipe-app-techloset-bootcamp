import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks.tsx";
import { fetchRecipes } from "../store/slices/recipesSlice.tsx";
import { Recipe } from "../store/slices/recipesSlice.tsx";

export const useFetchRecipes = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.items) as Recipe[];
  const loading = useAppSelector((state) => state.recipes.loading);
  const error = useAppSelector((state) => state.recipes.error);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Recipe[]>([]);

  // Fetch recipes only if they are not already loaded
  useEffect(() => {
    if (recipes.length === 0) { // Check if recipes are already fetched
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]); // Only fetch if no recipes are available

  // Filter recipes based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]); // Clear suggestions if no search query
    }
  }, [searchQuery, recipes]); // This will only filter the data, not fetch

  const fetch = () => dispatch(fetchRecipes()); // Add fetch as a method

  return {
    recipes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filteredSuggestions,
    fetch, // Include fetch here
  };
};
