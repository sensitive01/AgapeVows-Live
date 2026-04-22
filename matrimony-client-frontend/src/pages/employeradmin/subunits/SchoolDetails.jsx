import React from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const SchoolDetails = () => {
  return (
    <>
    <EmployerAdminHeader/>
    <div>
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">School Details</h2>
          </div>
        </div>
        {/* /Breadcrumb */}

        <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/school-profile"><i className="ti ti-settings me-2"></i>Profile Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/employer-admin/school-details"><i className="ti ti-world-cog me-2"></i>School Information</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/plan-and-subscription"><i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan & Subscription</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/hired-candidates"><i className="ti ti-server-cog me-2"></i>Hired Candidates</a>
          </li>
        </ul>
        
        <div className="row">
          <div className="col-xl-3 theiaStickySidebar">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column list-group settings-list">
                  <a href="#" className="d-inline-flex align-items-center rounded active py-2 px-3"><i className="ti ti-arrow-badge-right me-2"></i>School Settings</a>
                  <a href="#" className="d-inline-flex align-items-center rounded py-2 px-3">Additional Menu</a>
                  <a href="#" className="d-inline-flex align-items-center rounded py-2 px-3">Additional Menu</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-9">
            <div className="card">
              <div className="card-body">
                <div className="border-bottom mb-3 pb-3">
                  <h4>School Details</h4>
                </div>
                
                <form action="bussiness-settings.html">
                  <div className="border-bottom mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        <div>					
                          <h6 className="mb-3 text-primary">Basic Information</h6>													
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">School Name</label>
                          </div>
                          <div className="col-md-8">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Email Address</label>
                          </div>
                          <div className="col-md-8">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Phone</label>
                          </div>
                          <div className="col-md-8">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Fax</label>
                          </div>
                          <div className="col-md-8">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-12">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-2">
                            <label className="form-label mb-md-0">Web</label>
                          </div>
                          <div className="col-md-10">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-bottom mb-3">
                    <h6 className="mb-3 text-primary">School Departments</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames px-2">
                            <img src="assets/img/logo.svg" className="img-fluid" alt="logo" />
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar bg-dark avatar-xxl rounded border border-dashed me-2 px-2 flex-shrink-0 text-dark frames">
                            <img src="assets/img/logo-white.svg" className="img-fluid text-white" alt="logo" />
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-white rounded border border-dashed me-2 p-3 flex-shrink-0 text-dark frames">
                            <img src="assets/img/logo-small.svg" className="img-fluid" alt="logo" />
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-dark rounded border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo text-gray-3 fs-16"></i>
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded bg-white p-3 border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <img src="assets/img/logo-small.svg" className="img-fluid" alt="logo" />
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded bg-white p-3 border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <img src="assets/img/logo-small.svg" className="img-fluid" alt="logo" />
                          </div>                                              
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Department Name</h6>
                              <p className="fs-12">Department Description</p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Update
                                <input type="file" className="form-control image-sign" multiple="" />
                              </div>
                              <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-bottom mb-3">
                    <h6 className="mb-3 text-primary">Address Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">Address Line :</label>
                          </div>
                          <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Enter School Address Line" />
                          </div>	
                        </div>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">State :</label>
                          </div>
                          <div className="col-md-9">
                            <div>
                              <select className="select">
                                <option>Select</option>
                                <option>Karnataka</option>
                              </select>
                            </div>
                          </div>	
                        </div>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">City :</label>
                          </div>
                          <div className="col-md-9">
                            <select className="select">
                              <option>Select</option>
                              <option>Bengaluru</option>
                              <option>Mysuru</option>
                            </select>
                          </div>	
                        </div>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">Taluk :</label>
                          </div>
                          <div className="col-md-9">
                            <div>
                              <select className="select">
                                <option>Select</option>
                              </select>
                            </div>
                          </div>		
                        </div>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-6">
                            <label className="form-label mb-md-0">Postal Code :</label>
                          </div>
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="6 Digit Pincode" />
                          </div>	
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-2">
                            <label className="form-label mb-md-0">Landmark:</label>
                          </div>
                          <div className="col-md-10">
                            <input type="text" className="form-control" placeholder="Enter Address landmark" />
                          </div>	
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-end">
                    <button type="button" className="btn btn-outline-light border me-3"><i className="ti ti-cancel"></i> Cancel</button>
                    <button type="submit" className="btn btn-primary"><i className="ti ti-edit"></i> Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <EmployerAdminFooter/>
    </>
  );
};

export default SchoolDetails;