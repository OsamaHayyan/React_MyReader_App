import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import Search from "./search";
import { Route, Switch } from "react-router";
import Home from "./home";

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    searchBooks: [],
    shelfProps: ["currentlyReading", "WantToRead", "read"],
    shelf: "",
    noBook: "",
    showSearchPage: false,
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    //set state
    this.setState({ books });
  }

  handleSearchButton = () => {
    this.setState({
      showSearchPage: false,
      searchBooks: [],
      noBook: "",
      query: "",
    });
  };

  handleSearchReturn = () => {
    this.setState({ showSearchPage: true });
  };

  handleChangeSearch = async (e) => {
    e.persist();
    //Clone
    let query = { ...this.state.query };
    //Edit
    setTimeout(async () => {
      query = e.target.value;

      if (query) {
        this.setState({ query });
      } else {
        this.setState({ query: "" });
      }
    }, 500);
  };

  handleChangeShelf = async (eventValue, book) => {
    const state = { ...this.state };
    const books = [...this.state.books];
    const index = state.books.indexOf(book);

    if (eventValue === "move") return;

    //Re-render the main page after changing any book shelf then send the request to the api
    if (
      index >= 0 &&
      state.showSearchPage === false &&
      books[index].shelf !== eventValue
    ) {
      books[index].shelf = eventValue;
      this.setState({ books });
      await BooksAPI.update(book, eventValue);
    }
    // console.log(state.showSearchPage === true);
    // console.log(state.shelf.length >= 0);
    //Add book from Search page then check if there is
    if (state.showSearchPage === true && state.shelf.length >= 0) {
      await BooksAPI.update(book, eventValue);
      console.log("osama");
      console.log(state.showSearchPage === true);
      console.log(state.shelf.length >= 0);
      if (eventValue) {
        let shelf = eventValue;
        this.setState({ shelf });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    setTimeout(async () => {
      if (this.state.query !== prevState.query) {
        //Clone
        let state = { ...this.state };
        //fetch data

        if (this.state.query) {
          const searchData = await BooksAPI.search(this.state.query);
          //Edite
          if (searchData.error === "empty query") {
            const searchBooks = [];
            const noBook = "There is no books with this name";
            this.setState({ searchBooks, noBook });
          } else {
            let searchBooksWithShelf = searchData.map((b) => ({
              ...b,
              shelf:
                state.books
                  .filter((book) => book.title === b.title)
                  .map((book) => book.shelf)
                  .toString().length > 0
                  ? state.books
                      .filter((book) => book.title === b.title)
                      .map((book) => book.shelf)
                      .toString()
                  : "none",
            }));
            const searchBooks = searchBooksWithShelf;
            const noBook = "";
            //set state
            this.setState({ searchBooks, noBook });
          }
        } else {
          const searchBooks = [];
          this.setState({ searchBooks });
        }
      }
    }, 500);
    if (this.state.shelf !== prevState.shelf && this.state.shelf !== "") {
      this.setState({ shelf: "", showSearchPage: true });

      const books = await BooksAPI.getAll();
      this.setState({ books: books });
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={(props) => (
              <Search
                {...props}
                books={this.state.books}
                handleSearchButton={this.handleSearchButton}
                handleChangeSearch={this.handleChangeSearch}
                handleChangeShelf={this.handleChangeShelf}
                noBook={this.state.noBook}
                query={this.state.query}
                searchBooks={this.state.searchBooks}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <Home
                {...props}
                handleSearchReturn={this.handleSearchReturn}
                books={this.state.books}
                handleChangeShelf={this.handleChangeShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
