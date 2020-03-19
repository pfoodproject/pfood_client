import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';

const defaultButton = props => <button {...props}>{props.children}</button>;

export default class Pagination extends React.Component {
    constructor(props) {
        super();

    }

    static propTypes = {

    };
    render() {

        return (
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        );
    }
}
