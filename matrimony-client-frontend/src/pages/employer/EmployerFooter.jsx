import React from "react";

function EmployerFooter() {
  return (
    <>
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3 fixed-bottom">
        <p className="mb-0">Copyright 2025 &copy; EdProfio.</p>
        <p className="mb-0">
          Designed &amp; Developed By{" "}
          <a href="javascript:void(0);" className="text-primary">
            Sensitive Technologies
          </a>
        </p>
      </div>
      <a
        href="#"
        id="resetbutton"
        hidden
        className="btn btn-light close-theme w-100"
      >
        <i className="ti ti-restore me-1"></i>Reset
      </a>

      <style jsx>{`
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Add padding to body to prevent content from being hidden behind fixed footer */
        body {
          padding-bottom: 70px;
        }

        /* Responsive adjustments */
        @media (max-width: 575px) {
          .footer {
            padding: 12px 15px !important;
          }

          .footer p {
            font-size: 0.875rem;
          }

          body {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
}

export default EmployerFooter;
