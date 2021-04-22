import React, { Component } from "react";
import BookShelf from "./bookshelf.js";
import { NavLink } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              type={"currentlyReading"}
              title={"Currently Reading"}
              books={this.props.books}
              handleChangeShelf={this.props.handleChangeShelf}
            />
            <BookShelf
              type={"wantToRead"}
              title={"Want to Read"}
              books={this.props.books}
              handleChangeShelf={this.props.handleChangeShelf}
            />
            <BookShelf
              type={"read"}
              title={"Read"}
              books={this.props.books}
              handleChangeShelf={this.props.handleChangeShelf}
            />
          </div>
        </div>
        <NavLink to="/search">
          <div className="open-search">
            <button onClick={this.props.handleSearchReturn}>Add a book</button>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Home;
