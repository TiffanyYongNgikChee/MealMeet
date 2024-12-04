import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [type, setType] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparation, setPreparation] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/recipes/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setTitle(res.data.title);
            setYear(res.data.year);
            setDescription(res.data.description);
            setType(res.data.type);
            setIngredients(res.data.ingredients);
            setPreparation(res.data.preparation);
            setPoster(res.data.poster);
        })
        .catch((err)=>{console.log(err)});
    },[id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = {title,year,description,type,ingredients,preparation,poster};
        console.log(recipe);

        axios.put('http://localhost:4000/api/recipes/'+id, recipe)
        .then((res)=>{
            console.log("Edited: "+res.data);
            navigate('/edit');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    return (
        <div>
            <h3>Hello from edit component!</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Add recipe Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Description: </label>
                    <input type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Type: </label>
                    <input type="text"
                        className="form-control"
                        value={type}
                        onChange={(e) => { setType(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Ingredients: </label>
                    <input type="text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => { setIngredients(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add recipe Preparation: </label>
                    <input type="text"
                        className="form-control"
                        value={preparation}
                        onChange={(e) => { setPreparation(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Edit recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default Edit;