import React, { Component, Fragment } from 'react';
import axios from 'axios';


class Word extends Component {
    state = {
        data: {
            word: "",
            definition: { status: true, arr: [] },
            synonyms: { status: true, arr: [] },
            exceptionalBanglaMeanning: { status: true, arr: [] }
        }
    }

    UNSAFE_componentWillMount() {
        axios({
            method: "GET",
            url: "http://localhost:3000/api/english/single",
            params: {
                "wordName": `${this.props.match.params.word}`
            }
        }).then(obj => {
            this.setState({ data: obj.data });
        }).catch(err => console.log('error catch in axios ', err.message));
    }

    render () {
        return (
            <Fragment>
                <div className="container single-word">
                    <content>
                        <div className="word-wapper">
                            <div className="word-top">
                                <p className="small-text">Word:</p>
                                <h2 className="main-text">{this.state.data.word}</h2>
                            </div>
                            <div className="word-defination">
                                <p className="small-text">Defination's:</p>
                                <div className="defination-sec">
                                    { this.state.data.definition.arr.map(text => <p className="defination-text" key={text}>"{ text }"</p> ) }
                                </div>
                            </div>
                            <div className="word-synonyms">
                                <p className="small-text">Synonym's:</p>
                                <div className="synonyms-container">
                                    { this.state.data.synonyms.arr.map(text => <p className="synonyms-items" key={text}>{text}</p>) }
                                </div>
                            </div>
                            <div className="word-another">
                                <p className="small-text">Another Meanings:</p>
                                <div className="another-container">
                                    { this.state.data.exceptionalBanglaMeanning.arr.map(text => <p className="another-items" key={text}>{text}</p>) }
                                </div>
                            </div>
                        </div>
                    </content>
                </div>
            </Fragment>
        );
    }
}

export default Word;