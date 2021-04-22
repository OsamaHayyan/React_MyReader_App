import React, { Component } from "react";

class CurrentReading extends Component {
  state = {};
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter((book) => book.shelf === "currentlyReading")
              .map((book) => (
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
                          value={book.shelf}
                          onChange={(event) =>
                            this.props.handleChangeShelf(
                              event.target.value,
                              book
                            )
                          }
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
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

export default CurrentReading;
