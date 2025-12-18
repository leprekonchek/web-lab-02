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
        const sort = sortParam(localStorage.getItem('sort'));
        const data = await fetch(`http://localhost:3001/recipes?${sort}`);
        const recipes = await data.json();
        setRecipes(recipes);
    };

    const nameParam = (param) => {
        if (!param) return '';
        return `name_like=${param}`;
    };

    const sortParam = (param) => {
        if (!param) return '';
        return `_sort=createDate&_order=${param}`;
    };

    const deleteRecipe = (id) => async () => {
        await fetch(`http://localhost:3001/recipes/${id}`, {method: 'DELETE'});
        fetchRecipes();
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

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
                        <div>
                            <Link to={`recipes/${recipe.id.toString()}`}>
                                <h3 style={{margin: "5px"}}>{recipe.name}</h3>
                            </Link>
                            <div style={{
                                marginBottom: "10px",
                                marginLeft: "5px",
                                textAlign: "left"
                            }}>{recipe.category}</div>
                        </div>
                        <Link to={`recipes/${recipe.id.toString()}/edit`}
                              style={{marginRight: "0", marginLeft: "auto"}}>
                            <button><img src={require('../images/edit-icon.png')} alt="edit" style={{width: '32px'}}/>
                            </button>
                        </Link>
                        <button onClick={deleteRecipe(recipe.id)}><img src={require('../images/close-icon.png')}
                                                                       alt="close"
                                                                       style={{width: '32px', marginRight: "0"}}/>
                        </button>
                    </div>
                    <img src={recipe.image} style={{width: "100%"}}/>
                    <p><b>Ingredients:</b> <br/> {recipe.shortDesc}</p>
                    <p className="text-over"><b>How to prepare:</b> <br/> {recipe.longDesc}</p>
                    <p><b>Created: </b>{recipe.createDate}</p>
                </div>
            ))}</div>
        </div>
    );
}

export default Recipes;
