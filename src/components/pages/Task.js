import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../features/gitUserSlice";

const Task = () => {
  const [repos, setRepos] = useState("");
  const [page, setPage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    console.log("state..", state.app);
    return state.app;
  });

  //   ---------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(data.repos.length / itemsPerPage);
  const displayPages = 5; // Number of pages to display in the pagination

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.repos.slice(startIndex, endIndex);

  const changePage = (pageA) => {
    setCurrentPage(pageA);
  };

  const renderPages = () => {
    let pages = [];
    let startPage, endPage;

    if (totalPages <= displayPages) {
      // If total pages is less than or equal to the displayPages, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // If total pages is more than displayPages, calculate startPage and endPage with ellipsis
      const middlePage = Math.ceil(displayPages / 2);

      if (currentPage <= middlePage) {
        // If current page is in the first half, show pages from 1 to displayPages
        startPage = 1;
        endPage = displayPages;
      } else if (currentPage >= totalPages - middlePage + 1) {
        // If current page is in the last half, show pages from totalPages - displayPages + 1 to totalPages
        startPage = totalPages - displayPages + 1;
        endPage = totalPages;
      } else {
        // If current page is in the middle, show pages around the current page with ellipsis
        startPage = currentPage - Math.floor(displayPages / 2);
        endPage = currentPage + Math.floor(displayPages / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          className={`mx-1 page-item ${currentPage === i ? "active" : ""}`}
          key={i}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis for previous pages
    if (startPage > 1) {
      pages.unshift(<span key="ellipsis-start">...</span>);
      pages.unshift(
        <button
          className="page-item mx-1"
          key="page-1"
          onClick={() => changePage(1)}
        >
          1
        </button>
      );
    }

    // Add ellipsis for next pages
    if (endPage < totalPages) {
      pages.push(<span key="ellipsis-end">...</span>);
      pages.push(
        <button
          className="page-item mx-1"
          key={`page-${totalPages}`}
          onClick={() => changePage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // ---------

  useEffect(() => {
    dispatch(getAllData(page));
  }, [page]);

  if (data.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="ritem">
        <div className="justify-content-center w-100">
          <h1 className="m-4 text-success">Most Starred GitHub Repos</h1>
        
          {data.loading ? (
            <h2>Loading...</h2>
          ) : repos ? (
            <div className="main-div">
              <div className="child-div">
                <figure>
                  <figcaption>Check Your Repos Here ✌</figcaption>
                </figure>

                <div className="select-container">
                  <label htmlFor="page">Select Page:</label>{" "}
                  <select
                    id="page"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                  >
                    <option value="">1 Page</option>
                    <option value="&page=2">2 Page</option>
                    <option value="&page=3">3 Page</option>
                  </select>
                </div>

                {data.repos.length < 1 ? null : (
                  <h4>{`You have ${data.repos.length} repos in this page`}</h4>
                )}

                {data.loading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="page-link"
                        // className="px-2"
                        disabled={currentPage === 1}
                        title="Previous Page"
                        onClick={() => changePage(currentPage - 1)}
                      >
                        Previous
                      </button>
                      {renderPages()}
                      <button
                        className="page-link"
                        // className="px-2"
                        disabled={currentPage === totalPages}
                        title="Next Page"
                        onClick={() => changePage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>

                    <ul className="showItems">
                      {currentData.map((repo, index) => (
                        <li key={repo.id} className="repo-item">
                          <div className="col-md-11  ">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-md-2">
                                <img
                                  src={repo.owner.avatar_url}
                                  alt={repo.owner.login}
                                  className="owner-avatar"
                                />
                              </div>

                              <div className="col-md-9">
                                <h3 className="text-primary">{repo.name}</h3>
                                <p>{repo.description}</p>
                                <div className="h5row">
                                  <h5>Stars: {repo.stargazers_count}</h5>
                                  {"__"}
                                  <h5>Issues: {repo.open_issues_count}</h5>
                                </div>
                                <h5>
                                  Last pushed{" "}
                                  <strong className="text-danger">
                                    {" "}
                                    {repo.updated_at}{" "}
                                  </strong>{" "}
                                  by{" "}
                                  <strong className="text-primary">
                                    {repo.owner.login}{" "}
                                  </strong>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="btnA"
              onClick={() => dispatch(getAllData(page), setRepos(1))}
            >
              Get Repos
            </button>
          )}
    
        </div>
      </div>
    </div>
  );
};

export default Task;
