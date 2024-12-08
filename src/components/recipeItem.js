import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const RecipeItem = (props) => {
  useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]);

  const handleDelete = (e) => {
    e.preventDefault();

    // Optimistic update: Remove the recipe immediately from the list in the parent
    const updatedRecipes = props.myRecipes.filter(recipe => recipe._id !== props.myrecipe._id);
    props.Reload(updatedRecipes);  // Update the parent with the new recipe list

    // Proceed with the API call to delete from the backend
    axios
      .delete('http://localhost:4000/api/recipes/' + props.myrecipe._id)
      .then((res) => {
        console.log("Recipe deleted:", res.data);
      })
      .catch((error) => {
        console.log(error);
        // Optionally revert the UI in case of an error
        props.Reload(props.myRecipes);  // Revert back to the previous state if deletion fails
      });
  };

  return (
    <Card style={{ width: "25rem", margin: "15px" }}>
      {/* Make the image clickable */}
      <Link to={`/details/${props.myrecipe._id}`}>
        <Card.Img variant="top" src={props.myrecipe.poster} alt={props.myrecipe.title} className="card-recipe-image" />
      </Link>
      
      <Card.Body>
        {/* Make the title clickable with custom styles */}
        <Link to={`/details/${props.myrecipe._id}`} className="recipe-title-link">
          <Card.Title>{props.myrecipe.title}</Card.Title>
        </Link>

        {/* Display short description */}
        <Card.Text>
          {props.myrecipe.description.length > 100
            ? `${props.myrecipe.description.substring(0, 100)}...`
            : props.myrecipe.description}
        </Card.Text>

        <small className="text-muted">Year Created: {props.myrecipe.createdAt}</small>
      </Card.Body>
    </Card>
  );
};

export default RecipeItem;
