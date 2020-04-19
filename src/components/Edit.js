import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

const Edit = () => {
    const history = useHistory();
    const {recipeId: id} = useParams();

    const edit = ({name, image, short, long, category, created}) => {
        fetch(`http://localhost:3001/recipes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                image,
                shortDesc: short,
                longDesc: long,
                category,
                createDate: created,
            }),
        })
    };

    const [recipe, setRecipe] = useState(null);

    const fetchData = async () => {
        const result = await fetch(`http://localhost:3001/recipes?id=${id}`);
        const recipes = await result.json();
        if (!recipes.length) return;
        setRecipe(recipes[0])
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (!recipe) return null;

    return (
        <div>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {name, image, short, long, category, created}}} = e;
                edit({
                    name: name.value,
                    image: image.value,
                    short: short.value,
                    long: long.value,
                    category: category.value,
                    created: created.value,
                });
                history.push('/recipes');
            }}>
                <input type="text" name="name" defaultValue={recipe.name}/>
                <img src={recipe.image} style={{height: "200px"}}/>
                <input type="text" name="image" defaultValue={recipe.image}/>
                <input type="text" name="short" defaultValue={recipe.shortDesc}/>
                <textarea name="long" defaultValue={recipe.longDesc}/>
                <input type="text" name="category" defaultValue={recipe.category}/>
                <input style={{display: "none"}} type="text" name="created" defaultValue={recipe.createDate}/>
                <div style={{display: "flex"}}>
                    <Link to={'/'}><input type="submit" value="Скасувати"/></Link>
                    <input type="submit" value="Зберегти"/>
                </div>
            </form>
        </div>
    );
}

export default Edit;
