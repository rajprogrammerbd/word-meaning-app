import React from "react";
import { Link } from "react-router-dom";

class SearchReasult extends React.Component {
    state = {
        data: null,
        searchText: null,
        pagination: {
            total: 0,
            pageNumber: 1
        }
    }
    
    UNSAFE_componentWillMount() {
        this.setState({ data: this.props.history.location.state.data, searchText: this.props.history.location.state.searchText, pagination: { total: this.props.history.location.state.data.length } });
    }

    componentDidMount() {
        this.setState({ pagination: { pageNumber: 1, total: this.state.pagination.total } });
    }

    previous = () => {
        this.setState({ pagination: { total: this.state.pagination.total, pageNumber: ( this.state.pagination.pageNumber - 1 ) } });
    }

    next = () => {
        this.setState({ pagination: { total: this.state.pagination.total, pageNumber: ( this.state.pagination.pageNumber + 1 ) } });
    }

    showData = ( current, per ) => {
        let end = ( current * per );
        let start = end - ( per - 1 );

        return (this.state.data.slice((start - 1), end));
    }

    previousButton = () => {
        if ( this.state.pagination.pageNumber > 1 ) {
            return true;
        } else {
            return false;
        }
    }

    nextButton = () => {
        if ( (this.state.pagination.pageNumber * this.props.pageLimit) < this.state.pagination.total ) {
            return true;
        } else {
            return false;
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="container searchResults">
                    <content>
                        <div className="results">
                            <div className="top">
                                <p className="description-text">Search Result of "<span className="bold">{ this.state.searchText }</span>"</p>
                            </div>
                            <div className="bottom">
                                <div className="result-wapper">
                                    { this.showData( this.state.pagination.pageNumber, this.props.pageLimit ).map(obj => <div className="result-body" key={obj._id}>
                                        <div className="top"><div className="left"><p className="word-title"><Link to={'/findWord/' + obj.word} >{ obj.word }</Link></p></div><div className="right"><p className="bangla-meaning">{ obj.bangla }</p></div></div><div className="bottom">{ obj.synonyms.arr.slice(0, 4).map(word => <div className="word-links" key={word}>{ word }</div>) }<div className="word-links">...</div></div><div className="border"></div></div>) }
                                </div>


                                { ( this.previousButton() ) ? <button onClick={this.previous} className="previous-button">Previous</button> : null }
                                { (this.nextButton()) ? <button onClick={this.next} className="next-button">Next</button> : null }
                            </div>
                        </div>
                    </content>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchReasult;