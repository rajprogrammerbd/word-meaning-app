import React, { Component, Fragment } from "react";
import axios from "axios";

class Add extends Component {
    state = {
        word: "",
        banglaMeaning: "",
        defination: [],
        Synonyms: [],
        otherMeaning: [],
        custom: {
            defination: "",
            synonyms: "",
            otherMeaning: ""
        }
    }

    wordChange = element => {
        this.setState({ word: element.target.value });
    }

    banglaMeaningChange = element => {
        this.setState({ banglaMeaning: element.target.value });
    }

    definationChange = element => {
        const s = this.state.custom.Synonyms;
        const o = this.state.custom.otherMeaning;
        this.setState({ custom: { defination: element.target.value, synonyms: s, otherMeaning: o } });
    }

    clickDefinationChange = e => {
        e.preventDefault();
        let arr = this.state.defination;

        arr.push(this.state.custom.defination);

        this.setState({ defination: arr });
    }

    SynonymsChange = element => {
        const d = this.state.custom.defination;
        const o = this.state.custom.otherMeaning;
        this.setState({ custom: { defination: d, synonyms: element.target.value, otherMeaning: o } });
    }

    clickSynonymsChange = e => {
        e.preventDefault();
        let arr = this.state.Synonyms;
        arr.push(this.state.custom.synonyms);

        this.setState({ Synonyms: arr });
    }

    otherBanglaChange = element => {
        const d = this.state.custom.defination;
        const s = this.state.custom.Synonyms;
        this.setState({ custom: { defination: d, synonyms: s, otherMeaning: element.target.value } });
    }

    clickOtherBanglaChange = e => {
        e.preventDefault();
        let arr = this.state.otherMeaning;
        arr.push(this.state.custom.otherMeaning);

        this.setState({ otherMeaning: arr });
    }

    closeDefination = text => {
        const arr = this.state.defination.filter(t => !(t === text));
        this.setState({ defination: arr });
    }

    closeSynonyms = text => {
        const arr = this.state.Synonyms.filter(t => !(t === text));
        this.setState({ Synonyms: arr });
    }

    closeOtherMeaning = text => {
        const arr = this.state.otherMeaning.filter(t => !(t === text));
        this.setState({ otherMeaning: arr });
    }

    submit = e => {
        e.preventDefault();
        
        axios.post("http://localhost:3000/api/english", {
                "word": this.state.word,
                "bangla": this.state.banglaMeaning,
                "definitionStatus": true,
                "definationArr": this.state.defination,
                "synonymsStatus": true,
                "synonymsArr": this.state.Synonyms,
                "exceptionalStatus": true,
                "exceptionalArr": this.state.otherMeaning
        }).then(({ data }) => {
            // Redirect the application
            if ( data.status ) {
                this.props.history.push(`/sucess/${data.status}`);
            }
        }).catch(err => {
            // In here we add error component
            this.props.history.push(`/404`);
        });


    }

    render() {
        return (
            <Fragment>
                <h2 className="Added-title">ADD</h2>
                <div className="container added">
                    <main>
                        <ul className="create-add-title">
                            <li>Added a Word:-</li>
                        </ul>

                        <form className="form-added" onSubmit={this.submit}>
                            <div className="form-group">
                                <label htmlFor="#englishWord">English Word</label>
                                <input type="text" id="englishWord" onChange={e => this.wordChange(e)} value={this.state.word} className="form-control" placeholder="Enter the word in english" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="#banglaWord">Bangla Meaning</label>
                                <input type="text" id="banglaWord" onChange={e => this.banglaMeaningChange(e)} value={this.state.banglaMeaning} className="form-control" placeholder="Enter the bangla meaning" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="#defination-word">Defination</label>
                                <div className="defination-list">
                                    { this.state.defination.map(text => <div className="list" key={text}><div className="left">{ text }</div><div className="right"><img src="./images/close.png" onClick={() => this.closeDefination(text)} alt="close icon" className="close"/></div></div>) }
                                </div>
                                <input type="text" id="defination-word" className="form-control" onChange={e => this.definationChange(e)} placeholder="Defination of words" />
                                <button onClick={this.clickDefinationChange} className="addMore-defination">Added More</button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="#synonyms-word">Synonyms</label>
                                <div className="synonyms-list">
                                    { this.state.Synonyms.map(text => <div className="list" key={text}><div className="left">{ text }</div><div className="right"><img src="./images/close.png" onClick={() => this.closeSynonyms(text)} alt="close icon" className="close"/></div></div>) }
                                </div>
                                <input type="text" onChange={e => this.SynonymsChange(e)} id="synonyms-word" className="form-control" placeholder="Enter you Synonyms Words" />
                                <button className="addMore-synonyms" onClick={this.clickSynonymsChange} >Added More</button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="#otherMeanings">Other Bangla Meaning</label>
                                <div className="otherMeaning">
                                    { this.state.otherMeaning.map(text => <div className="list" key={text}><div className="left">{ text }</div><div className="right"><img src="./images/close.png" onClick={() => this.closeOtherMeaning(text)} alt="close icon" className="close"/></div></div>) }
                                </div>
                                <input type="text" id="otherMeanings" onChange={e => this.otherBanglaChange(e)} className="form-control" placeholder="Enter Other Meaning" />
                                <button className="otherMeaning-done" onClick={this.clickOtherBanglaChange}>Added More</button>
                            </div>

                            <input type="submit" value="SUBMIT" />
                        </form>
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default Add;