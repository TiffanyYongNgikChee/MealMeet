import RecipeItem from "./recipeItem";

const Recipe = (props) => {
    return (
      <div className="recipe-grid">
        {props.myRecipes.map((recipe) => (
          <RecipeItem
            myrecipe={recipe}
            key={recipe._id} // Use _id instead of imdbID if that's your unique identifier
            Reload={props.ReloadData}
          />
        ))}
      </div>
    );
  };

export default Recipe;