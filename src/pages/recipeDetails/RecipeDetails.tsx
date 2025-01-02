import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks.tsx"; 

export default function RecipeDetails() {
  const { id } = useParams();
  const recipes = useAppSelector((state) => state.recipes.items);

  // Find the recipe by matching the id from the URL
  const selectedRecipe = recipes.find((recipe) => recipe.id.toString() === id);
  
  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }
  
  const { name, thumbnail_url, description, nutrition, instructions } = selectedRecipe;
  const ingredients = selectedRecipe.sections[0]?.components.map((component) => component.ingredient) || [];

  return (
    <div>
      <div
        className="relative w-full h-[300px] md:h-[250px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${thumbnail_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-[700] text-[40px] mb-4">{name}</h1>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-[20px]">{description}</h2>
      </div>

      <div className="my-10 mx-20 md:mx-40">
        <h3 className="text-[24px] font-bold">Ingredients</h3>
        <ul className="list-disc pl-5">
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <p>{ingredient.name}</p>
              </li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul>
      </div>

      <div className="my-10 mx-20 md:mx-40">
        <h3 className="text-[24px] font-bold">Instructions</h3>
        <ol className="list-decimal pl-5">
          {instructions && instructions.length > 0 ? (
            instructions.map((step) => (
              <li key={step.id}>
                <p>{step.display_text}</p>
              </li>
            ))
          ) : (
            <li>No instructions available</li>
          )}
        </ol>
      </div>
      <div className="my-10 mx-20 md:mx-40">
        <h3 className="text-[24px] font-bold">Nutrition Information</h3>
        <ul className="list-disc pl-5">
          <li><strong>Calories</strong>: {nutrition?.calories}</li>
          <li><strong>Carbohydrates</strong>: {nutrition?.carbohydrates}g</li>
          <li><strong>Fat</strong>: {nutrition?.fat}g</li>
          <li><strong>Fibre</strong>: {nutrition?.fiber}g</li>
          <li><strong>Protein</strong>: {nutrition?.protein}g</li>
          <li><strong>Sugar</strong>: {nutrition?.sugar}g</li>
        </ul>
      </div>
    </div>
  );
}
