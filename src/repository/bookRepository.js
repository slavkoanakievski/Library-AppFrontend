import axios from '../custom-axios/axios';

const bookService = {
    fetchAllBooks: () => {
        return axios.get("/books");
    }
    ,
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCountries: () => {
        return axios.get("/countries");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, availableCopies, category, author) => {
        return axios.post("/books/add", null, {
                params: {
                    name,
                    availableCopies,
                    category,
                    author
                }
            }
        )
    },
    editBook: (id, name, availableCopies, category, author) => {
        console.log("id" + typeof(id) + id + ",name" + typeof (name) + " " + name, "availableCopies" + typeof (availableCopies) + " " + availableCopies,
            "category" + typeof (category) + " " + category,"author" +  typeof (author) + " " + author )
        return axios.put(`/books/edit/${id}`, null, {
            params: {
                name,
                availableCopies,
                category,
                author
            }
        })
    },
    orderBook: (id) => {
        return axios.get(`/books/markAsTaken/${id}`);
    }


}

export default bookService;
