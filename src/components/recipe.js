import React from 'react';
import RecipeItem from './recipeItem';

const Recipe = (props) => {
  // Optimistic update for the recipe list
  const handleReload = (updatedRecipes) => {
    props.ReloadData(updatedRecipes);  // Pass updated recipes to the parent (Food)
  };

  return (
    <div className="recipe-grid">
      {props.myRecipes.map((recipe) => (
        <RecipeItem
          key={recipe._id}
          myrecipe={recipe}
          Reload={handleReload} // Pass handleReload to RecipeItem
        />
      ))}
    </div>
  );
};

export default Recipe;
