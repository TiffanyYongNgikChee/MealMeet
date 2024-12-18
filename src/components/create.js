import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    // State variables to manage form input fields  
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [categories, setCategories] = useState([]); // Store selected categories
    const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);
    const [steps, setSteps] = useState([{ step_number: 1, instruction: "" }]);
    const categoryOptions = ["Spicy","Chicken","Italian", "Asian", "Western", "Vegan", "Dessert"];
    const navigate = useNavigate();

    // Handle changes in the selected categories (multiple selections)
    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setCategories(selectedOptions); // Update the categories state
    };

    // Handle changes in the ingredients (name, quantity, unit) for a given ingredient index
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Add a new empty ingredient to the list
    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
    };
    
    // Remove an ingredient at a specific index
    const removeIngredient = (index) => {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    };
    // Add a new empty step for recipe preparation
    const addStep = () => {
      setSteps([...steps, { step_number: steps.length + 1, instruction: "" }]);
    };
    
    // Remove a step and renumber the remaining steps
    const removeStep = (index) => {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps.map((step, i) => ({ ...step, step_number: i + 1 }))); // Recalculate step numbers
    };
    
    // Handle change in a specific step's instruction
    const handleStepChange = (index, value) => {
      const newSteps = [...steps];
      newSteps[index].instruction = value;
      setSteps(newSteps);
    };

    // Handle form submission (send recipe data to the backend API)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Title: ${title},Description: ${description}, CreatedYear: ${year}, Categories: ${categories},Ingredients: ${ingredients}, Step: ${steps}, Poster: ${poster}`);
        const recipe = { // Create an object with all form data
            title: title,
            year: year,
            description: description,
            categories: categories,
            ingredients: ingredients,
            steps:steps,
            poster: poster
          };
          // Send a POST request to the backend API to create a new recipe
          axios.post('http://localhost:4000/api/recipes', recipe)
            .then((res) => {
              console.log(res.data); // Log the response from the API
              navigate('/food'); // Navigate to the '/food' page after successful creation
            })
            .catch((err) => {
              console.error(err);
              alert('Failed to add recipe. Please try again.');
            });
    }

    return  (
      <div className="create-page">
        <div className="recipe-form-container">
          <h3 className="form-title">Create Recipe</h3>
          <form onSubmit={handleSubmit} className="recipe-form">
            <div className="form-group">
              <label>Recipe Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Recipe Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Categories:</label>
              <select
                multiple
                className="form-input"
                onChange={handleCategoryChange}
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ingredients:</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={ingredient.name}
                    onChange={(e) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index].name = e.target.value;
                      setIngredients(newIngredients);
                    }}
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index].quantity = e.target.value;
                      setIngredients(newIngredients);
                    }}
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Unit (optional)"
                    value={ingredient.unit}
                    onChange={(e) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index].unit = e.target.value;
                      setIngredients(newIngredients);
                    }}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeIngredient(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button type="button" onClick={addIngredient} className="add-btn">
                + Add Ingredient
              </button>
            </div>
            <div className="form-group">
              <label>Preparation Steps:</label>
              {steps.map((step, index) => (
                <div key={index} className="step-row">
                  <input
                    type="text"
                    placeholder={`Step ${step.step_number}`}
                    value={step.instruction}
                    onChange={(e) => {
                      const newSteps = [...steps];
                      newSteps[index].instruction = e.target.value;
                      setSteps(newSteps);
                    }}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeStep(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button type="button" onClick={addStep} className="add-btn">
                + Add Step
              </button>
            </div>
            <button type="submit" className="submit-btn">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
      );
    };
export default Create;