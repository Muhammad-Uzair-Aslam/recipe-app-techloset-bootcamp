
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Ingredient = {
  id: number;
  name: string;
};

export interface Recipe {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  nutrition: {
    calories: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    protein: number;
    sugar: number;
  };
  sections: {
    components: {
      ingredient: Ingredient;
    }[];
  }[];
    instructions: { id: number; display_text: string }[]
    likes?: number; 
}

interface RecipeState {
  items: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await axios.get('https://tasty.p.rapidapi.com/recipes/list', {
      params: {
        from: '0',
        size: '20',
        tags: 'under_30_minutes',
      },
      headers: {
        'x-rapidapi-key': '9712ece6c5mshf5ab400ca75f327p13e7d1jsna76a04fbdb6e',
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    });
    return response.data.results;
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipesSlice.reducer;

