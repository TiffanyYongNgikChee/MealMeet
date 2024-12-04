import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);
    const [steps, setSteps] = useState([{ step_number: 1, instruction: "" }]);
    const categoryOptions = ["Spicy","Chicken","Italian", "Asian", "Western", "Vegan", "Dessert"];
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/recipes/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setPoster(res.data.poster);
            setCategories(res.data.categories || []);
            setIngredients(res.data.ingredients || []);
            setSteps(res.data.steps || []);
        })
        .catch((err)=>{console.log(err)});
    },[id]);

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setCategories(selectedOptions);
      };
    
      const addIngredient = () => {
        setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
      };
    
      const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
      };
    
      const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
      };
    
      const addStep = () => {
        setSteps([...steps, { step_number: steps.length + 1, instruction: "" }]);
      };
    
      const removeStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
      };
    
      const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index].instruction = value;
        setSteps(newSteps);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = {title,description,categories,ingredients,steps,poster};
        console.log(recipe);

        axios.put('http://localhost:4000/api/recipes/'+id, recipe)
        .then((res)=>{
            console.log("Edited: "+res.data);
            navigate('/food');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    return (
        <div className="recipe-form-container">
        <h3 className="form-title">Edit Recipe</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            
                <label>Recipe Title:</label>
                <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <label>Recipe Description:</label>
                <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Image URL:</label>
                <input
                type="text"
                className="form-control"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Categories:</label>
                <select multiple className="form-control" onChange={handleCategoryChange} style={{ height: "100px" }}>
                {categoryOptions.map((category) => (
                    <option key={category} value={category} selected={categories.includes(category)}>
                    {category}
                    </option>
                ))}
                </select>
            </div>

            {/* Ingredients */}
            <div className="form-group">
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <input
                    type="text"
                    placeholder="Name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    required
                    />
                    <input
                    type="text"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                    required
                    />
                    <input
                    type="text"
                    placeholder="Unit (optional)"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    />
                    <button type="button" onClick={() => removeIngredient(index)}>
                    Remove
                    </button>
                </div>
                ))}
                <button type="button" onClick={addIngredient}>
                Add Ingredient
                </button>
            </div>

            {/* Steps */}
            <div className="form-group">
                <label>Preparation Steps:</label>
                {steps.map((step, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <span>Step {step.step_number}:</span>
                    <input
                    type="text"
                    placeholder="Instruction"
                    value={step.instruction}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    required
                    />
                    <button type="button" onClick={() => removeStep(index)}>
                    Remove
                    </button>
                </div>
                ))}
                <button type="button" onClick={addStep}>
                Add Step
                </button>
            </div>

            <button type="submit">Edit</button>
            </form>
    </div>
    );
}
export default Edit;