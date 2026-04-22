import React from 'react';


const NotFoundPage = () => {
  return (
    <div className="subvisual-block subvisual-theme-1 block-404 bg-dark-green d-flex pt-50 pt-lg-80 pb-50 pb-lg-80 text-white">
      <div className="pattern-image">
        <img src="/images/bg-get-jobs.jpg" width="1920" height="570" alt="Pattern" />
      </div>
      <div className="container position-relative">
        <br /><br />
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="subvisual-textbox">
              <h1>404</h1>
              <h2>Ooops, Page Not Found</h2>
              <p>We Can't Seem to find the page you're looking for.</p>
              <div className="form-subscribe">
                <form action="#">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Keyword...."
                  />
                  <button className="btn-search">
                    <i className="icon-search"></i>
                  </button>
                </form>
                <a className="btn btn-green btn-sm" href="#">
                  <span className="btn-text">Back To Home</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-404">
              <img src="/images/404-theme1.png" alt="404" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;