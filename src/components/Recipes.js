import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "./recipe.css";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDeafault();
        setQuery(search);
    }

    const fetchRecipes = async (query) => {
        const search = nameParam(query);
        const data = await fetch(`http://localhost:3001/recipes?${search}`);
        const recipes = await data.json();
        setRecipes(recipes);
    };

    const nameParam = (param) => {
        if (!param) {
            return '';
        }
        return `name_like=${param}`;
    };

    useEffect(() => {
        fetchRecipes();
    }, [search]);

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <form className="search-form" onSubmit={getSearch} style={{margin: "20px"}}>
                    <input className="search-input" type="text" value={search} onChange={updateSearch}/>
                    <button className="search-button" type="submit">Search</button>
                </form>
                <Link to='/add' style={{margin: "20px"}}>Add new recipe</Link>
            </div>
            <div className="recipes">{recipes.map(recipe => (
                <div key={recipe.id} className="recipe">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Link to={`recipes/${recipe.id.toString()}`}><h3>{recipe.name}</h3></Link>
                        <Link to={`recipes/${recipe.id.toString()}/edit`} style={{marginLeft: "auto"}}><img src={require('../edit-icon.png')} alt="edit" style={{width: '32px'}}/></Link>
                    </div>
                    <a>{recipe.category}</a>
                    <img src={recipe.image} style={{width: "100%"}}/>
                    <p><b>Ingredients:</b> <br/> {recipe.shortDesc}</p>
                    <p className="text-over"><b>How to prepare:</b> <br/> {recipe.longDesc}</p>
                    <p><b>Created:</b>{recipe.createDate}</p>
                </div>
            ))}</div>
        </div>
    );
}

export default Recipes;
