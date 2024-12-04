import { useState } from "react";
import axios from "axios";

const Create = () => {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [type, setType] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparation, setPreparation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Title: ${title},Description: ${description}, CreatedYear: ${year}, Type: ${type},Ingredients: ${ingredients}, Preparation: ${preparation}, Poster: ${poster}`);
        const recipe = {
            title: title,
            year: year,
            description: description,
            type: type,
            ingredients: ingredients,
            preparation: preparation,
            poster: poster
          };
          axios.post('http://localhost:4000/api/recipes', recipe)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err.data));
    }

    return (
        <div>
            <h3>Hello from recipe component!</h3>
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
                    <input type="submit" value="Add recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;