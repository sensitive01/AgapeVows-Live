import React from "react";

const CopyRights = () => {
  return (
    <section>
      <div className="cr" style={{ backgroundColor: '#4a2580', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div className="row">
            <p style={{ color: '#fff' }}>
              Copyright © <span id="cry">2023</span>
              <a href="#!" target="_blank" style={{ color: '#fff', marginLeft: '5px', marginRight: '5px' }}>
                Company.com
              </a>
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyRights;
