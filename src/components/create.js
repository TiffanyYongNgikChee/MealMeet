import { useState } from "react";

const Create = () => {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = {title,year,poster};
        console.log(recipe);
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