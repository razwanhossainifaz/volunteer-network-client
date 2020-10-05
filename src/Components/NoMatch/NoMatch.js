import React from 'react';
import {Link} from 'react-router-dom';

const NoMatch = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    return (
        <div style={style}>
            <h1>Error! 404, route not found.</h1>
            <Link to="/home" className="text-center">
                <p>Go to home page</p>
            </Link>
        </div>
    );
};

export default NoMatch;