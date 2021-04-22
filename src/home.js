import React, { Component } from "react";
import CurrentReading from "./currentread";
import WantToRead from "./want_to_read";
import Read from "./read";
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
            <CurrentReading
              books={this.props.books}
              handleChangeShelf={this.props.handleChangeShelf}
            />
            <WantToRead
              books={this.props.books}
              handleChangeShelf={this.props.handleChangeShelf}
            />
            <Read
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
