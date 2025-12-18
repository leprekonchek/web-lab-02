import React, {useEffect, useState} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import "./recipe.css";
import {deleteRecipe} from "../methods";

const Recipe = ({match}) => {
    const history = useHistory();
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
        <div className="recipePage">
            <div style={{marginLeft: "auto", marginRight: "5px"}}>
                <Link to={`${recipe.id}/edit`}>
                    <button><img src={require('../images/edit-icon.png')} alt="edit"
                                 style={{width: '32px'}}/>
                    </button>
                </Link>
                <Link to='/recipes'>
                    <button onClick={() => {
                        deleteRecipe(recipe.id);
                    }}>
                        <img src={require('../images/close-icon.png')}
                             alt="close"
                             style={{width: '32px'}}/>
                    </button>
                </Link>
            </div>
            <img src={recipe.image} className="photo"/>
            <div style={{marginLeft: "5px", marginRight: "auto"}}>
                <h3 style={{margin: "5px"}}>{recipe.name}</h3>
                <div className="categori">{recipe.category}</div>
            </div>
            <div style={{marginLeft: "10px", marginRight: "auto"}}>
                <p><b>Ingredients:</b> <br/> {recipe.shortDesc}</p>
                <p className="long"><b>How to prepare:</b> <br/> {recipe.longDesc}</p>
                <p><b>Created: </b>{recipe.createDate}</p>
            </div>
        </div>
    );
};

export default Recipe;