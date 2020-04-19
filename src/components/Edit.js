import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const Edit = () => {
    const {recipeId: id} = useParams();

    const edit = ({name, image, short, long, category}) => {
        fetch(`http://localhost:3001/recipes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                image,
                shortDesc: short,
                longDesc: long,
                category,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
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
            <div>HELLO</div>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {name, image, short, long, category}}} = e;
                edit({
                    name: name.value,
                    image: image.value,
                    short: short.value,
                    long: long.value,
                    category: category.value,
                });
            }}>
                <input type="text" name="name" defaultValue={recipe.name}/>
                <img src={recipe.image} style={{height: "200px"}}/>
                <input type="text" name="image" defaultValue={recipe.image}/>
                <input type="text" name="short" defaultValue={recipe.shortDesc}/>
                <textarea name="long" defaultValue={recipe.longDesc}/>
                <input type="text" name="category" defaultValue={recipe.category}/>
                <input type="submit" value="Завершити редагування"/>
            </form>
        </div>
    );
}

export default Edit;
