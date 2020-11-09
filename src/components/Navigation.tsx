import React from 'react';
import { Link } from 'react-router-dom';
import './sass/Navigation.scss';

const Navigation = () => {
        return (<nav className="navbar">
                <div className="navlink">
					<Link to="/">Home</Link>
				</div>
                <div className="navlink">
					<Link to="/about">About</Link>
				</div>
                <div className="navlink">
					<Link to="/signin">Sign In</Link>
				</div>
        </nav>);
}

export {
	Navigation
}
