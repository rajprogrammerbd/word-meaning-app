import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class View extends Component {
    state = {
        data: [],
        pageNumber: 1,
        pageSize: 4,
        total: 0
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3000/api/english/count"
          }).then(ans => this.setState({ total: ans.data.total })).catch(err => console.log(err.message));

        axios({
            method: "GET",
            url: "http://localhost:3000/api/english/paginations",
            params: {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
        }).then(ans => this.setState({ data: ans.data })).catch(err => console.log(err));
    }

    previous = () => {
        this.setState({  total: this.state.total, pageNumber: ( this.state.pageNumber - 1 ), data: this.state.data, pageSize: this.state.pageSize });
    }

    next = () => {
        this.setState({ total: this.state.total, pageNumber: ( this.state.pageNumber + 1 ), data: this.state.data, pageSize: this.state.pageSize  });
    }

    componentDidUpdate() {
        axios({
            method: "GET",
            url: "http://localhost:3000/api/english/paginations",
            params: {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
        }).then(ans => this.setState({ data: ans.data })).catch(err => console.log(err));
    }

    previousButton = () => {
        if ( this.state.pageNumber > 1 ) {
            return true;
        } else {
            return false;
        }
    }

    nextButton = () => {
        if ( (this.state.pageNumber * this.state.pageSize) < this.state.total ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="container view-container">
                    <content>
                        <div className="view-wapper">
                            <h2 className="view-title">view</h2>
                            <div className="view">
                                <h2 className="all-word-title">All Word:-</h2>
                                <div className="word-wappers-body">
                                    { this.state.data.map(obj => <div className="words-wapper" key={obj._id}><div className="top"><div className="left"><p className="word-text"><Link to={'findWord/' + obj.word}>{ obj.word }</Link></p></div><div className="right"><p className="bangla-meannings">{ obj.bangla }</p></div></div><div className="bottom">{ obj.synonyms.arr.map(text => <div className="word-links" key={text}>{text}</div>) }<div className="word-links">...</div></div><div className="border"></div></div>) }
                                </div>

                                { ( this.previousButton() ) ? <button onClick={this.previous} className="previous-button">Previous</button> : null }
                                { (this.nextButton()) ? <button onClick={this.next} className="next-button">Next</button> : null }
                            </div>
                        </div>
                    </content>
                </div>
            </Fragment>
        );
    }
}

export default View;