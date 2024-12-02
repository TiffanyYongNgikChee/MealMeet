import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const RecipeItem = (props)=> {
  useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      <Card>
        <Card.Header>{props.myrecipe.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.myrecipe.poster} alt={props.myrecipe.title} />
            <footer>{props.myrecipe.year}</footer>
          </blockquote>
        </Card.Body>
        <Link to={"/edit/" + props.myrecipe._id} className="btn btn-primary">Edit</Link>

      </Card>
    </div>
  );
}

export default RecipeItem;