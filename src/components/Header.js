import React from 'react';
import Search from './Search'
import {Link} from 'react-router-dom';

function Header() {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '60px',
        background: '#B2DE8E',
        color: 'white',
    };

    return (
        <nav style={headerStyle}>
            <Link to='/recipes'>Recipes</Link>
            <Search/>
            <Link to='/add'>Add new recipe</Link>
        </nav>
    );
}

export default Header;
