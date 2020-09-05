import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        axios.get('http://localhost:3000/api/english').then(arr => {
            this.setState({ totalDataCount: (arr.data.length - 4), data: arr.data });
        }).catch(err => {
            this.props.history.push(`/404`);
        });
    }

    state = {
        totalDataCount: null,
        inputValue: "",
        valueChangeResult: null,
        data: []
    }

    getSuggestion = () => {
        const random = Math.ceil( Math.random() * this.state.totalDataCount );
        return this.state.data.slice((random - 1), ((random - 1) + 4));
    }

    valueChanges = e => {
            this.setState({ inputValue: e.target.value });
            return new Promise(() => {
                if ( e.target.value.trim() === "" ) {
                    this.setState({ valueChangeResult: null });
                } else {
                    axios({
                        method: "GET",
                        url: "http://localhost:3000/api/english/async",
                        params: {
                            word: e.target.value
                        }
                    }).then(obj => {
                        if ( obj.data.status === false ) {
                            this.setState({ valueChangeResult: null });
                        } else {
                            let newArray = obj.data.array.slice(0, 4);
                            
                            this.setState({ valueChangeResult: newArray });
                        }
                    }).catch(err => this.setState({ valueChangeResult: null }));
                }
            });
    }

    formSubmit = e => {
        e.preventDefault();
        if ( this.state.inputValue.trim() === "" ) {

        } else {
            this.props.history.push(`/searchResult`, { data: this.state.valueChangeResult, searchText: this.state.inputValue });
        }
    }
    
    render() {
        return (
            <Fragment>
                <div className="container main-content">
                    <content>
                        <div className="homepage">
                            <div className="search-module">
                                <form action="">
                                    <div className="form-wapper">
                                        <div className="top">
                                            <div className="form-group">
                                                <label htmlFor="#search-box">Search Knowledge</label>
                                                <input type="text" id="search-box" onChange={this.valueChanges} value={this.state.inputValue} placeholder="Search your word" />
                                            </div>
                                            <input type="submit" value="SEARCH" onClick={this.formSubmit} />
                                        </div>
                                        <div className="bottom">
                                            { (this.state.valueChangeResult) ? <div className="suggestion-data">{this.state.valueChangeResult.map( obj => <div className="wap" key={obj._id}><h2><Link to={"/findWord/" + obj.word} >{obj.word}</Link></h2><h2>{obj.bangla}</h2></div> )}<div className="line-end">...</div></div> : null }
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="content-body">
                                { (this.getSuggestion().length === 0) ? <h2
                                className="no-suggestion">No Suggestion</h2> : (<Fragment><ul className="suggestion-title"><li>Suggestions:</li></ul><ul className="top-suggestion">
                                    { this.getSuggestion().map(obj => <li key={obj._id}><Link to={"/findWord/" + obj.word}>{ obj.word }</Link></li>) }
                                    </ul></Fragment>)}
                            </div>

                        </div>
                    </content>
                </div>
            </Fragment>
        );
    }
}

export default Home;