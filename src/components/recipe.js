import RecipeItem from "./recipeItem";

const Recipe = (props)=>{
    return props.myRecipes.map(
        (recipe)=>{
            return <RecipeItem myrecipe={recipe} key={recipe.imdbID} />
        }
    );
}

export default Recipe;