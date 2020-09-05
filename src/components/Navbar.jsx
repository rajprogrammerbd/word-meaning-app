import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";


class Navbar extends Component {
    state = {}
    render() {
        return (
            <Fragment>
                <div className="container header">
                    <header>
                        
                        <div className="left">
                            <h2 id="header-link"><Link to="/">Word-Meaning</Link></h2>
                        </div>

                        <div className="right">
                            <nav>
                                <ul className="navbar-links">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/add">Add</Link></li>
                                    <li><Link to="/view">View</Link></li>
                                </ul>
                            </nav>
                        </div>

                    </header>
                </div>
            </Fragment>
        );
    }
}

export default Navbar;