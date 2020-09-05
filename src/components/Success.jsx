import React from "react";
import { Link } from "react-router-dom";

class Success extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="container success">
                    <h2>Successfull Added to database</h2>
                    <Link to="/">Back to Home</Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Success;