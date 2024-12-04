import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const RecipeItem = (props)=> {
  useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]); // Only run this effect when the mymovie prop changes

  const handleDelete = (e)=>{
    e.preventDefault();

    axios.delete('http://localhost:4000/api/recipes/'+props.myrecipe._id)
    .then((res)=>{
      props.Reload();
    })
    .catch((error)=>{
      console.log(error);
    });

  }

  return (
    <Card style={{ width: "25rem", margin: "15px" }}>
    <Card.Img variant="top" src={props.myrecipe.poster} alt={props.myrecipe.title} />
    <Card.Body>
      <Card.Title>{props.myrecipe.title}</Card.Title>
      <Card.Text>
        {props.myrecipe.description.length > 100
          ? `${props.myrecipe.description.substring(0, 100)}...`
          : props.myrecipe.description}
      </Card.Text>
      <small className="text-muted">Year Created: {props.myrecipe.createdAt}</small>
      <div style={{ marginTop: "10px" }}>
        <Link to={`/details/${props.myrecipe._id}`} className="btn btn-secondary">
            Details
          </Link>
        <Link to={`/edit/${props.myrecipe._id}`} className="btn btn-primary" style={{ marginRight: "10px" }}>
          Edit
        </Link>
        <Button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card.Body>
  </Card>
  );
}

export default RecipeItem;