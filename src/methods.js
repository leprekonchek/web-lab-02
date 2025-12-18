export const deleteRecipe = async id => {
    await fetch(`http://localhost:3001/recipes/${id}`, {method: 'DELETE'});
}