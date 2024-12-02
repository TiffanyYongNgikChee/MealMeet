import RecipeItem from "./recipeItem";

const Recipe = (props)=>{
    return props.myRecipes.map(
        (recipe)=>{
            return <RecipeItem myrecipe={recipe} key={recipe.imdbID} Reload={props.ReloadData} />
        }
    );
}

export default Recipe;