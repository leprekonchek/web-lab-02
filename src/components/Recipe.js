import React, {useEffect, useState} from 'react';
import {useParams,useHistory, Link} from 'react-router-dom';

const Recipe = ({match}) => {
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        const data = await fetch(`http://localhost:3001/recipes/${match.params.recipeId}`);
        const recipe = await data.json();
        setRecipe(recipe);
    };

    return (
        <div>
            <div>{recipe.name}</div>
            <p>{recipe.category}</p>
            <p>{recipe.shortDesc}</p>
            <p>{recipe.longDesc}</p>
            <p>{recipe.createDate}</p>
        </div>
    );
};

export default Recipe;