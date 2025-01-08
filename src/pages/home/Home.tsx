import React, { useEffect, useState } from "react";
import BannerImage from "../../assets/images/HeroImage.png";
import Card from "../../components/card/Card.tsx";
import HorizontalCard from "../../components/horizontalCard/HorizontalCard.tsx";
import { useFetchRecipes } from "../../hooks/useFetchRecipes.tsx";

export default function Home() {
  const { recipes, loading, fetch } = useFetchRecipes();
  const [currentPage, setCurrentPage] = useState(1); // Manage current page
  const recipesPerPage = 3; // Number of cards per page

  const truncateDescription = (text: string, wordLimit: number) => {
    const words = text?.split(" ") || [];
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    if (!recipes?.length) { // Check if recipes are already loaded
      fetch(); // Fetch recipes only if they are not already available
    }
  }, [fetch, recipes?.length]);

  const recentRecipes = [...(recipes || [])].slice(-9).reverse();
  const popularRecipes = [...(recipes || [])]
    .sort((a, b) => (a.likes && b.likes ? b.likes - a.likes : parseInt(b.id || "0") - parseInt(a.id || "0")))
    .slice(0, 3);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const CurrentRecentRecipes = recentRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe) || [];
  const totalPages = popularRecipes?.length > 0 ? Math.ceil(recentRecipes?.length / recipesPerPage) : 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full h-[450px] md:h-[362px] bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${BannerImage})` }}
          >
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="relative text-center">
              <h1 className="text-4xl font-[700] md:text-[40px] text-[30px] mb-4 px-20 md:px-0">
                Get Inspired, Cook with passion and enjoy <br /> unforgettable
                moments at the table
              </h1>
            </div>
          </div>

          <div className="text-center font-[700] my-10">
            <h1 className="text-[39px]">Popular Recipes</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center w-[90%] 2xl:w-[55%]">
          {popularRecipes?.length === 0 ? (
            <p className="text-center text-gray-500">No popular recipes available.</p>
          ) : (
            popularRecipes?.map((recipe) => (
              <div key={recipe?.id}>
                <Card
                  id={recipe?.id}
                  title={recipe?.name}
                  description={truncateDescription(recipe?.description || "", 15)} // Default empty string for description
                  buttonText="View Recipe"
                  imageUrl={recipe?.thumbnail_url}
                />
              </div>
            ))
          )}
          </div>

          <div className="text-center font-[700] my-10">
            <h1 className="text-[39px]">Recent Recipes</h1>
          </div>
          {
            CurrentRecentRecipes?.map((recipe) => (
              <div className="mx-5" key={recipe?.id}>
                <HorizontalCard
                  id={recipe?.id}
                  title={recipe?.name}
                  description={truncateDescription(recipe?.description || "", 15)} // Default empty string for description
                  buttonText="View Recipe"
                  imgUrl={recipe?.thumbnail_url}
                />
              </div>
            ))
          }

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="font-bold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
