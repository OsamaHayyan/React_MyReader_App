import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class Search extends Component {
  render() {
    const {
      handleSearchButton,
      handleChangeSearch,
      handleChangeShelf,
      noBook,
      query,
      searchBooks,
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <NavLink to="/" className="close-search" onClick={handleSearchButton}>
            Close
          </NavLink>
          <div className="search-books-input-wrapper">
            <input
              name="query"
              onChange={handleChangeSearch}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {noBook}
          <ol className="books-grid">
            {query.length > 0 &&
              searchBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks ? book.imageLinks.thumbnail : ""
                          })`,
                          backgroundColor: "black",
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          // multiple={true}
                          // value={searchBooks.map((search) => search.shelf)}
                          value={book.shelf}
                          onChange={(event) =>
                            handleChangeShelf(event.target.value, book)
                          }
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option
                            defaultValue={
                              book.shelf === "wantToRead" ? true : false
                            }
                            value="wantToRead"
                          >
                            Want to Read
                          </option>
                          <option
                            defaultValue={book.shelf === "read" ? true : false}
                            value="read"
                          >
                            Read
                          </option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors ? book.authors.join(", ") : book.authors}
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  handleSearchButton: PropTypes.func.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleChangeShelf: PropTypes.func.isRequired,
  noBook: PropTypes.string,
  query: PropTypes.string,
  searchBooks: PropTypes.arrayOf(PropTypes.object),
};
