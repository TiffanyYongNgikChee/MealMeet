import { useEffect } from "react";
import Card from 'react-bootstrap/Card';

const RecipeItem = (props)=> {
  useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      <Card>
        <Card.Header>{props.myrecipe.Title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.myrecipe.Poster} alt={props.myrecipe.Title} />
            <footer>{props.myrecipe.Year}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeItem;