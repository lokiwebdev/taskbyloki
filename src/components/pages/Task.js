import axios from "axios";
import React, { useEffect, useState } from "react";

const Task = () => {
  const [repos, setRepos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = repos.slice(firstIndex, lastIndex);
  const npage = Math.ceil(repos.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepos = async () => {
    setIsLoading(true);
    try {
      // const url = `https://api.github.com/search/repositories?q=created:>${getDateForPeriod()}&sort=stars&order=desc`;
      const url = `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc${page}`;
      const response = await axios.get(url);
      setRepos(response.data.items);
      // setData(response.data.items)
      console.log(repos);
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRepos();
  }, [page]);

  return (
    <div className="container">
      <div className="ritem">
        <div className="justify-content-center w-100">
          <h1 className="m-4 text-success">Most Starred GitHub Repos</h1>
          <div className="main-div">
            <div className="child-div">
              <figure>
                {/* <img src={todo} alt="todologo" /> */}
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

              {repos.length < 1 ? null : (
                <h4>{`You have ${repos.length} repos`}</h4>
              )}

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className="showItems">
                  {records.map((repo, index) => (
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
                            {/* <h5 className="h5row">Last pushed <h6 className="text-danger"> {repo.updated_at} </h6>  by <h6 className="text-primary">{repo.owner.login} </h6></h5> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="d-flex justify-content-center">
                {isLoading ? null : (
                <ul className="pagination m-2">
                  <li className="page-link">
                    <i
                      className="page-link fa-solid fa-backward"
                      title="Previous Page"
                      onClick={prePage}
                    />
                  </li>
                  {numbers.map((n, i) => (
                    <li
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      }`}
                      key={i}
                    >
                      <i className="page-link" title={`Page ${n}`} onClick={() => changeCPage(n)}>
                        {" "}{n}{" "}
                      </i>

                    </li>
                  ))}
                  <li className="page-link">
                    <i
                      className="page-link fa-solid fa-forward"
                      title="Next Page"
                      onClick={nextPage}
                    />
                  </li>
                </ul>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default Task;
