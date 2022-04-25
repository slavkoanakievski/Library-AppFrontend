import './App.css';
import {Component} from "react";
import React from "react";
import Books from '../Books/book';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import bookService from "../../repository/bookRepository";
import categoryService from "../../repository/categoryRepository";
import AddNewBook from "../AddNewBook/addNewBook"
import EditBook from "../EditBook/editbook";
import Header from '../Header/header';
import Categories from '../Catgories/categories'

class App extends Component{
    constructor(props) { //state na klasna komponeneta
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render(){
        return(
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/books"
                           element={<Books books={this.state.books}
                                           onDelete={this.deleteBook}
                                           onEdit={this.getBook}
                                           onOrder={this.orderBook}/>}/>
                    <Route path="/"
                           element={<Books books={this.state.books}
                                           onDelete={this.deleteBook}
                                           onEdit={this.getBook}
                                           onOrder={this.orderBook}/>}/>
                    <Route path={"/books/add"} element={
                        <AddNewBook categories={this.state.categories}
                                 authors={this.state.authors}
                                 onAddBook={this.addBook}/>}/>

                    <Route path={"/books/edit/:id"} element={
                        <EditBook categories={this.state.categories}
                                  authors={this.state.authors}
                                  book={this.state.selectedBook}
                                  onEditBook={this.editBook}/>}/>

                    <Route path="/categories" element={<Categories categories={this.state.categories}/>}/>
                </Routes>

            </BrowserRouter>
        );
    }

    loadBooks = () => {
        bookService.fetchAllBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    addBook = (name, availableCopies, category, author) => {
        bookService.addBook(name, availableCopies, category, author)
            .then(() => {
                this.loadBooks();
            })
    }

    loadAuthors = () => {
        bookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }


    loadCategories = () => {
       categoryService.fetchAllCategories()
           .then((data) => {
               this.setState({
                   categories: data.data
               })
           })
    }

    deleteBook = (id) => {
        bookService.deleteBook(id)
            .then(() => {
                this.loadBooks()
            })
    }

    editBook = (id, name, availableCopies, category, author, isTaken) => {
        bookService.editBook(id, name, availableCopies, category, author)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        bookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    orderBook = (id) => {
        bookService.orderBook(id)
            .then(() => {
                this.loadBooks();
            })
    }




    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

}

export default App;
