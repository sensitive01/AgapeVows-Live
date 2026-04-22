import { FaMapPin, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useMemo } from "react";

const EmployersPage = () => {
  const [sortBy, setSortBy] = useState("");

  // Function to sort schools based on selected option
  const sortedSchools = useMemo(() => {
    if (!sortBy) return schools;

    const sorted = [...schools];
    switch (sortBy) {
      case "alphabet":
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "location":
        return sorted.sort((a, b) => a.location.localeCompare(b.location));
      case "board":
        return sorted.sort((a, b) => a.board.localeCompare(b.board));
      default:
        return sorted;
    }
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="mb-0 text-primary">
                  Employers Associated with EdProfio
                </h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contain main informative part of the site */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Fixed Page subheader with better spacing */}
                <header className="page-subheader mb-30 mb-md-40 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
                  {/* <h3 className="h6 mb-3 mb-lg-0 text-secondary">
                    1,00,000+ Schools Connected with EdProfio
                  </h3> */}

                  {/* Fixed Sort By section with proper spacing */}
                  <div className="subhead-filters">
                    <div className="subhead-filters-item d-flex align-items-center gap-3">
                      <div className="form-group mb-0">
                        <select
                          className="form-select px-3 py-2 border rounded"
                          name="state"
                          value={sortBy}
                          onChange={handleSortChange}
                          style={{ minWidth: "160px" }}
                        >
                          <option value="">Sort by</option>
                          <option value="alphabet">Sort by Alphabet</option>
                          <option value="name">Sort by Name</option>
                          <option value="location">Sort by Location</option>
                          <option value="board">Sort by Board</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </header>

                <div className="row justify-content-center">
                  {sortedSchools.map((school, index) => (
                    <div
                      key={index}
                      className="col-12 col-md-6 col-lg-4 mb-15 mb-md-30"
                    >
                      {/* Featured Category Box */}
                      <a
                        href="school-details.php"
                        className="featured-category-box alt2 bg-light"
                      >
                        <div className="wrap">
                          <div className="img-holder">
                            <img
                              src={`images/company-logo0${index + 1}.jpg`}
                              alt={school.name}
                            />
                          </div>
                          <div className="textbox">
                            <strong className="h6 mb-0">{school.name}</strong>
                            <address className="location">
                              <FaMapPin className="icon" />
                              <span className="text">{school.location}</span>
                            </address>
                            <div className="tag-wrap">
                              <span className="tag bg-white">
                                {school.board}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Pagination Block */}
                <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                  <div className="container d-flex align-items-center justify-content-center">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          <FaArrowLeft className="icon-arrow-left1" />
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <FaArrowRight className="icon-arrow-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="section section-theme-1 section-downloads pt-35 pt-md-60 pb-50 pb-md-75 pb-lg-75 pb-xl-110 pb-xxl-140 bg-light">
          <div className="container">
            {/* Section header */}
            <header className="section-header text-center mb-30 mb-md-40 mb-lg-50">
              <h2 className="text-secondary">Download our mobile app</h2>
              <p>
                Search through millions of jobs and find the right fit.
                <br /> Simply swipe right to apply.
              </p>
            </header>
            <div className="app-buttons">
              <a className="btn-app btn-play-store" href="#">
                <div className="store-icon">
                  <img
                    src="images/icon-play-store.png"
                    width="28"
                    height="30"
                    alt="Google Play"
                  />
                </div>
                <div className="btn-text">
                  Download From <span>Google Play</span>
                </div>
              </a>
              <a className="btn-app btn-app-store" href="#">
                <div className="store-icon">
                  <img
                    src="images/icon-app-store.png"
                    width="32"
                    height="38"
                    alt="App Store"
                  />
                </div>
                <div className="btn-text">
                  Download From <span>App Store</span>
                </div>
              </a>
            </div>
            <div className="icon ico01">
              <img src="images/ico-app01.png" alt="Image Description" />
            </div>
            <div className="icon ico02">
              <img src="images/ico-app02.png" alt="Image Description" />
            </div>
            <div className="icon ico03">
              <img src="images/ico-app03.png" alt="Image Description" />
            </div>
            <div className="icon ico04">
              <img src="images/ico-app04.png" alt="Image Description" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Sample data for schools
const schools = [
  {
    name: "Royal Public School",
    location: "Bengaluru, Karnataka",
    board: "CBSC",
  },
  {
    name: "Deeksha School",
    location: "Mysuru, Karnataka",
    board: "CBSC",
  },
  {
    name: "Oxford English School",
    location: "Bengaluru, Karnataka",
    board: "CBSC",
  },
  {
    name: "Akash International School",
    location: "Bengaluru, Karnataka",
    board: "ICSE",
  },
  {
    name: "Bharath School",
    location: "Mysuru, Karnataka",
    board: "State Board",
  },
  {
    name: "Cambridge School",
    location: "Bengaluru, Karnataka",
    board: "IGCSE",
  },
  {
    name: "Delhi Public School",
    location: "Bengaluru, Karnataka",
    board: "CBSC",
  },
  {
    name: "Educare School",
    location: "Mysuru, Karnataka",
    board: "ICSE",
  },
  {
    name: "Future Kids School",
    location: "Bengaluru, Karnataka",
    board: "State Board",
  },
];

export default EmployersPage;
