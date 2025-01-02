import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.tsx';
import Home from './pages/home/Home.tsx';
import Recipes from './pages/recipes/Recipes.tsx';
import ThirdPage from './pages/thirdPage/ThirdPage.tsx';
import Footer from './components/footer/Footer.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
import RecipeDetails from './pages/recipeDetails/RecipeDetails.tsx';

function App() {
  return (
    <Provider store={store} children={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails/>} />
        <Route path="/thirdPage" element={<ThirdPage />} />
      </Routes>
      <Footer/>
    </Router>
    </Provider>
  );
}

export default App;
