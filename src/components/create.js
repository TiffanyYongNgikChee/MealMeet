import { useState } from "react";
import axios from "axios";

const Create = () => {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
        const recipe = {
            title: title,
            year: year,
            poster: poster
          };
          axios.post('http://localhost:4000/api/movies', recipe)
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
                <div>
                    <input type="submit" value="Add recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;