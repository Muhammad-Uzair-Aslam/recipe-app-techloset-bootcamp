import React, { useState, ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card.tsx";
import { useFetchRecipes } from "../../hooks/useFetchRecipes.tsx";

export default function Recipes() {
  const { recipes, searchQuery, setSearchQuery, filteredSuggestions, loading, error } = useFetchRecipes();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 3;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const truncateDescription = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleSuggestionClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="text-center font-[600] my-5">
        <h1 className="text-[39px]">Recent Recipes</h1>
      </div>
      <div>
        <div className="my-5 flex items-center mx-auto bg-gray-200 rounded-full px-3 py-2 w-[350px] md:w-[500px] h-[45px] relative">
          <IoIosSearch />
          <input
            type="text"
            placeholder="Search Recipe"
            className="px-2 bg-gray-200 outline-none border-none flex-grow"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} // Added type for event
          />
          {filteredSuggestions?.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-md z-10">
              {filteredSuggestions.map((recipe: { id: number; name: string }) => ( // Explicit type for recipe
                <li
                  key={recipe.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(recipe.id)}
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="px-10 font-[500] my-10">
        <h1 className="text-[39px]">Recipes Results</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-1 mx-auto justify-items-center my-5">
        {currentRecipes?.map((recipe) => (
          <div key={recipe.id}>
            <Card
              id={recipe.id}
              title={recipe.name}
              description={truncateDescription(recipe.description, 10)}
              buttonText="View Recipe"
              imageUrl={recipe.thumbnail_url}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-6">
        {[...Array(Math.ceil(recipes.length / recipesPerPage)).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === number + 1
                ? "bg-yellow-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
