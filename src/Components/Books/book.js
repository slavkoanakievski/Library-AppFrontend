import React from "react";
import {Link} from "react-router-dom";



class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }
    render(){
        const books = this.getBooksPage();
        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>

                        <table className={"table table-hover table-dark"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available Copies</th>
                                <th scope={"col"}>Actions</th>
                                <th scope={"col"}>Take Book</th>
                            </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>

                        <div className="col mb-3">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term, index) => {
            return (
                <tr>
                    <td>{term.name}</td>
                    <td> <b> {term.book_category} </b></td>
                    <td>{term.author.name} {term.author.surname}</td>
                    <td>{term.availableCopies}</td>
                    <td>
                        <button title={"Delete"}
                                className={"btn btn-danger"}
                                onClick={() => this.props.onDelete(term.id)}
                        >Delete </button>
                        <Link className={"btn btn-primary btn-outline-dark ml-2"}
                              onClick={() => this.props.onEdit(term.id)}
                              to={`/books/edit/${term.id}`}>
                            Edit
                        </Link>
                    </td>
                    <td>
                        <button onClick={() => this.props.onOrder(term.id)}
                                className={"btn btn-primary btn-outline-dark"}
                                disabled={term.availableCopies==0}>Mark this book</button>
                    </td>
                </tr>
            );
        })
    }

}

export default Books;