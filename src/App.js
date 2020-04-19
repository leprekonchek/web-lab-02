import React from 'react';
import './App.css';
import Header from './components/Header'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import Add from './components/Add'
import Edit from './components/Edit'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/recipes" exact component={Recipes}/>
                    <Route path="/recipes/:recipeId" exact component={Recipe}/>
                    <Route path="/add" component={Add}/>
                    <Route path="/recipes/:recipeId/edit" component={Edit}/>
                    <Redirect from="/" to="recipes"/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
