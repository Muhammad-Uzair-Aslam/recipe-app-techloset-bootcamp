import React, { useState, ChangeEvent } from "react";
import { BsCupHot } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks.tsx";

interface Recipe {
  id: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const recipes = useAppSelector((state) => state.recipes.items) as Recipe[];
  const navigate = useNavigate();

  const handleInputChange = (query: string): void => {
    setSearchQuery(query);
    if (query) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id: string): void => {
    navigate(`/recipes/${id}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div>
      <div className="w-full h-[30px] bg-[#FFDB63]"></div>
      <div className="w-full flex justify-between items-center h-[113px] px-4 sm:px-8 text-[26px]">
        <div className="flex items-center font-[500]">
          <BsCupHot />
          <span className="px-2 hidden sm:block">Delícias à Mesa</span>
        </div>
        <div className="hidden lg:flex space-x-5">
          <div className="font-[700]">
            <Link to="/">Home</Link>
          </div>
          <div className="font-[700]">
            <Link to="/recipes">Recipes</Link>
          </div>
          <div className="font-[700]">
            <Link to="/thirdPage">Sobre nós</Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full px-3 py-2 w-[258] h-[45] relative">
          <IoIosSearch />
          <input
            type="text"
            placeholder="Search Recipe"
            className="px-2 bg-gray-200 outline-none border-none flex-grow"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value)
            }
          />
          {suggestions?.length > 0 && (
            <ul className="absolute top-full left-0 bg-white shadow-md w-full rounded-lg mt-1 z-50">
              {suggestions?.map((recipe:Recipe) => (
                <li
                  key={recipe.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(recipe.id)}
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:hidden">
          <button
            className="text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-2/3 max-w-[300px] bg-white h-full shadow-lg z-50">
            <div className="flex text-3xl cursor-pointer justify-end p-4">
              <button
                className="text-3xl cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex flex-col items-start space-y-6 px-6">
              <div className="text-2xl font-[700]">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </div>
              <div className="text-2xl font-[700]">
                <Link to="/recipes" onClick={() => setIsMenuOpen(false)}>
                  Recipes
                </Link>
              </div>
              <div className="text-2xl font-[700]">
                <Link to="/thirdPage" onClick={() => setIsMenuOpen(false)}>
                  Sobre nós
                </Link>
              </div>
              <div className="w-full mt-4">
                <div className="flex items-center bg-gray-200 rounded-full px-3 py-2 w-full h-[45px]">
                  <IoIosSearch />
                  <input
                    type="text"
                    placeholder="Search Recipe"
                    className="px-2 bg-gray-200 outline-none border-none flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
