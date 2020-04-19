import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const data = await fetch(`http://localhost:3001/recipes`);
        const recipes = await data.json();
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div>{recipes.map(recipe => (
            <div key={recipe.id}>
                <Link to={`recipes/${recipe.id}`}><h3>{recipe.name}</h3></Link>
                <img src={recipe.image} style={{height: "300px"}}/>
                <p>{recipe.category}</p>
                <p>{recipe.shortDesc}</p>
                <p>{recipe.longDesc}</p>
                <p>{recipe.createDate}</p>
            </div>
        ))}</div>
    );
}

export default Recipes;
