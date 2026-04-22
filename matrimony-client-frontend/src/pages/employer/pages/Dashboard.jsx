import React from 'react'

export default function Dashboard () {
  return (
		<div className="page-wrapper">
			<div className="content">

				<div className="card">
					<div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
						<div className="d-flex align-items-center mb-3">
							<span className="avatar avatar-xl flex-shrink-0">
								<img src="assets/img/profiles/avatar-31.jpg" className="rounded-circle" alt="img"/>
							</span>
							<div className="ms-3">
								<h3 className="mb-2">Welcome Back, School <a href="#" className="edit-icon"><i className="ti ti-edit fs-14"></i></a></h3>
								<p>You have <span className="text-primary text-decoration-underline">21</span> Pending Approvals & <span className="text-primary text-decoration-underline">14</span> Leave Requests</p>
							</div>
						</div>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
						<div className="ms-2 head-icons">
							<a href="#" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
						<div className="d-flex align-items-center flex-wrap mb-1">
							<a href="#" className="btn btn-primary btn-md me-2 mb-2" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="ti ti-user-check me-1"></i>Add User</a>
							<a href="#" className="btn btn-secondary btn-md me-2 mb-2" data-bs-toggle="modal" data-bs-target="#add_project"><i className="ti ti-square-rounded-plus me-1"></i>Add Teacher</a>
							<a href="#" className="btn btn-default border border-dark btn-md mb-2" data-bs-toggle="modal" data-bs-target="#add_leaves"><i className="ti ti-user-plus me-1"></i>Add Leave Requests</a>
						</div>
					</div>
				</div>
				
				
				<div className="card">
					<div className="card-body">
						<div className="row align-items-center mb-4">
							<div className="col-md-5">
								<div className="mb-3 mb-md-0">
									<h4 className="mb-1">Attendance Details Today</h4>
									<p>Data from the 800+ total no of employees</p>
								</div>
							</div>
							<div className="col-md-7">
								<div className="d-flex align-items-center justify-content-md-end">
									<h6>Total Absenties today</h6>
									<div className="avatar-list-stacked avatar-group-sm ms-4">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="assets/img/profiles/avatar-02.jpg"
												alt="img"/>
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="assets/img/profiles/avatar-03.jpg"
												alt="img"/>
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="assets/img/profiles/avatar-05.jpg"
												alt="img"/>
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="assets/img/profiles/avatar-06.jpg"
												alt="img"/>
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="assets/img/profiles/avatar-07.jpg"
												alt="img"/>
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#">
											+1
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="border rounded">
							<div className="row gx-0">
								<div className="col-md col-sm-4 border-end bg-light">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Present</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>250</h5>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end bg-light">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Late Login</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>45</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end bg-light">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Uninformed</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>15</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-12%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end bg-light">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Permisson</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>03</h5>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 bg-light">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Absent</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>12</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-19%
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="row">

					
					<div className="col-xxl-8 d-flex">
						<div className="row flex-fill">
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-primary mb-2">
											<i className="ti ti-calendar-share fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="attendance-employee" className="link-default">View Details</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-secondary mb-2">
											<i className="ti ti-browser fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Candidates</h6>
										<h3 className="mb-3">90/125 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-2.1%</span></h3>
										<a href="Candidates" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-info mb-2">
											<i className="ti ti-users-group fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Jobs</h6>
										<h3 className="mb-3">69/86 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-11.2%</span></h3>
										<a href="Jobs" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-pink mb-2">
											<i className="ti ti-checklist fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Tasks</h6>
										<h3 className="mb-3">225/28 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-down me-1"></i>+11.2%</span></h3>
										<a href="tasks" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-purple mb-2">
											<i className="ti ti-moneybag fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Overall Spent</h6>
										<h3 className="mb-3">$21445 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+10.2%</span></h3>
										<a href="expenses" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-danger mb-2">
											<i className="ti ti-browser fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Spent This Week</h6>
										<h3 className="mb-3">$5,544 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="purchase-transaction" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-success mb-2">
											<i className="ti ti-users-group fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Job Applicants</h6>
										<h3 className="mb-3">98 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="job-list" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-dark mb-2">
											<i className="ti ti-user-star fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">New Hire</h6>
										<h3 className="mb-3">45/48 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-11.2%</span></h3>
										<a href="candidates" className="link-default">View All</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Todo</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2 me-2">
										<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>Today
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">This Month</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">This Week</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Today</a>
											</li>
										</ul>
									</div>
									<a href="#" className="btn btn-primary btn-icon btn-xs rounded-circle d-flex align-items-center justify-content-center p-0 mb-2"  data-bs-toggle="modal" data-bs-target="#add_todo"><i className="ti ti-plus fs-16"></i></a>
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo1"/>
										<label className="form-check-label fw-medium" for="todo1">Add Holidays</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo2"/>
										<label className="form-check-label fw-medium" for="todo2">Add Meeting  to Candidates</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo3"/>
										<label className="form-check-label fw-medium" for="todo3">Admission Report</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo4"/>
										<label className="form-check-label fw-medium" for="todo4">Management Meeting</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo5"/>
										<label className="form-check-label fw-medium" for="todo5">Add Payroll</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 mb-0 bg-light">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo6"/>
										<label className="form-check-label fw-medium" for="todo6">Add Policy for Increment </label>
									</div>
								</div>
							</div>
						</div>
					</div>
				

				</div>

				<div className="row">

					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employee Status</h5>
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>This Week
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">This Month</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">This Week</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">Today</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-1">
									<p className="fs-13 mb-3">Total Employee</p>
									<h3 className="mb-3">154</h3>
								</div>
								<div className="progress-stacked emp-stack mb-3">
									<div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
										<div className="progress-bar bg-warning"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
										<div className="progress-bar bg-secondary"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 10%">
										<div className="progress-bar bg-danger"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment four" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 30%">
										<div className="progress-bar bg-pink"></div>
									</div>
								</div>
								<div className="border mb-3">
									<div className="row gx-0">
										<div className="col-6">
											<div className="p-2 flex-fill border-end border-bottom bg-light">
												<p className="fs-13 mb-2"><i className="ti ti-square-filled text-primary fs-12 me-2"></i>Fulltime <span className="text-gray-9">(48%)</span></p>
												<h2 className="display-1">112</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill border-bottom text-end bg-light">
												<p className="fs-13 mb-2"><i className="ti ti-square-filled me-2 text-secondary fs-12"></i>Contract <span className="text-gray-9">(20%)</span></p>
												<h2 className="display-1">112</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill border-end bg-light">
												<p className="fs-13 mb-2"><i className="ti ti-square-filled me-2 text-danger fs-12"></i>Probation <span className="text-gray-9">(22%)</span></p>
												<h2 className="display-1">12</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill text-end bg-light">
												<p className="fs-13 mb-2"><i className="ti ti-square-filled text-pink me-2 fs-12"></i>WFH <span className="text-gray-9">(20%)</span></p>
												<h2 className="display-1">04</h2>
											</div>
										</div>
									</div>
								</div>
								<h6 className="mb-2">Top Performer</h6>
								<div className="p-2 d-flex align-items-center justify-content-between border border-primary bg-primary-100 br-5 mb-4">
									<div className="d-flex align-items-center overflow-hidden">
										<span className="me-2">
											<i className="ti ti-award-filled text-primary fs-24"></i>
										</span>
										<a href="employee-details" className="avatar avatar-md me-2">
											<img src="assets/img/profiles/avatar-24.jpg" className="rounded-circle border border-white" alt="img"/>
										</a>
										<div>
											<h6 className="text-truncate mb-1 fs-14 fw-medium"><a href="employee-details">Daniel Esbella</a></h6>
											<p className="fs-13">PGT Mathematics Teacher</p>
										</div>
									</div>
									<div className="text-end">
										<p className="fs-13 mb-1">Performance</p>
										<h5 className="text-primary">99%</h5>
									</div>
								</div>
								<a href="employees" className="btn btn-light btn-md w-100">View All Employees</a>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Attendance Overview</h5>
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>Today
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">This Month</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">This Week</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">Today</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="chartjs-wrapper-demo position-relative mb-4">
									<canvas id="attendance" height="200"></canvas>
									<div className="position-absolute text-center attendance-canvas">
										<p className="fs-13 mb-1">Total Attendance</p>
										<h3>120</h3>
									</div>
								</div>
								<h6 className="mb-3">Status</h6>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-success me-1"></i>Present</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">59%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-secondary me-1"></i>Late</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">21%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-warning me-1"></i>Permission</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">2%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-danger me-1"></i>Absent</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">15%</p>
								</div>
								<div className="bg-light br-5 box-shadow-xs p-2 pb-0 d-flex align-items-center justify-content-between flex-wrap">
									<div className="d-flex align-items-center">
										<p className="mb-2 me-2">Total Absenties</p>
										<div className="avatar-list-stacked avatar-group-sm mb-2">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/profiles/avatar-27.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/profiles/avatar-30.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img src="assets/img/profiles/avatar-14.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img src="assets/img/profiles/avatar-29.jpg" alt="img"/>
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10" href="#">
												+1
											</a>
										</div>
									</div>
									<a href="leaves" className="fs-13 link-primary text-decoration-underline mb-2">View Details</a>
								</div>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Clock-In/Out</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<a href="#" className="dropdown-toggle btn btn-white btn-sm d-inline-flex align-items-center border-0 fs-13 me-2" data-bs-toggle="dropdown">
											All Departments
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">Finance</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Development</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Marketing</a>
											</li>
										</ul>
									</div>
									<div className="dropdown mb-2">
										<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>Today
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">This Month</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">This Week</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Today</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div>
									<div className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5 bg-light">
										<div className="d-flex align-items-center">
											<a href="#" className="avatar flex-shrink-0">
												<img src="assets/img/profiles/avatar-24.jpg" className="rounded-circle border border-2" alt="img"/>
											</a>
											<div className="ms-2">
												<h6 className="fs-14 fw-medium text-truncate">Daniel Esbella</h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<div className="d-flex align-items-center">
											<a href="#" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
											<span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-3 p-2 border br-5 bg-light">
										<div className="d-flex align-items-center">
											<a href="#" className="avatar flex-shrink-0">
												<img src="assets/img/profiles/avatar-23.jpg" className="rounded-circle border border-2" alt="img"/>
											</a>
											<div className="ms-2">
												<h6 className="fs-14 fw-medium">Doglas Martini</h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<div className="d-flex align-items-center">
											<a href="#" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
											<span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:36</span>
										</div>
									</div>
									<div className="mb-3 p-2 border br-5 bg-light">
										<div className="d-flex align-items-center justify-content-between">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar flex-shrink-0">
													<img src="assets/img/profiles/avatar-27.jpg" className="rounded-circle border border-2" alt="img"/>
												</a>
												<div className="ms-2">
													<h6 className="fs-14 fw-medium text-truncate">Brian Villalobos</h6>
													<p className="fs-13">PGT Teacher</p>
												</div>
											</div>
											<div className="d-flex align-items-center">
												<a href="#" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
												<span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
											</div>
										</div>
										<div className="d-flex align-items-center justify-content-between flex-wrap mt-2 border br-5 p-2 pb-0 bg-white">
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-success fs-5 me-1"></i>Clock In</p>
												<h6 className="fs-13 fw-normal mb-2">10:30 AM</h6>
											</div>
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-danger fs-5 me-1"></i>Clock Out</p>
												<h6 className="fs-13 fw-normal mb-2">09:45 AM</h6>
											</div>
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-warning fs-5 me-1"></i>Production</p>
												<h6 className="fs-13 fw-normal mb-2">09:21 Hrs</h6>
											</div>
										</div>
									</div>
								</div>
								<h6 className="mb-2">Late</h6>
								<div className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5 bg-light">
									<div className="d-flex align-items-center">
										<span className="avatar flex-shrink-0">
											<img src="assets/img/profiles/avatar-29.jpg" className="rounded-circle border border-2" alt="img"/>
										</span>
										<div className="ms-2">
											<h6 className="fs-14 fw-medium text-truncate">Anthony Lewis <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-clock-hour-11 me-1"></i>30 Min</span></h6>
											<p className="fs-13">PGT Teacher</p>
										</div>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
										<span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-danger"><i className="ti ti-circle-filled fs-5 me-1"></i>08:35</span>
									</div>
								</div>
								<a href="attendance-report" className="btn btn-light btn-md w-100">View All Attendance</a>
							</div>
						</div>
					</div>
				

				</div>

				<div className="row">

					
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Jobs Applicants</h5>
								<a href="job-list" className="btn btn-light btn-md mb-2">View All</a>
							</div>
							<div className="card-body">
								<ul className="nav nav-tabs tab-style-1 nav-justified d-sm-flex d-block p-0 mb-4" role="tablist">
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium" data-bs-toggle="tab" data-bs-target="#openings" aria-current="page" href="#openings" aria-selected="true" role="tab">Openings</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium active" data-bs-toggle="tab" data-bs-target="#applicants" href="#applicants" aria-selected="false" tabindex="-1" role="tab">Applicants</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane fade" id="openings">
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="assets/img/icons/apple.svg" className="img-fluid rounded-circle w-auto h-auto" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">PGT Teacher</a></p>
													<span className="fs-12">No of Openings : 25 </span>
												</div>
											</div>
											<a href="#" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="assets/img/icons/php.svg" className="img-fluid w-auto h-auto" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">PGT Teacher</a></p>
													<span className="fs-12">No of Openings : 20 </span>
												</div>
											</div>
											<a href="#" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="assets/img/icons/react.svg" className="img-fluid w-auto h-auto" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">PGT Teacher</a></p>
													<span className="fs-12">No of Openings : 30 </span>
												</div>
											</div>
											<a href="#" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-0">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="assets/img/icons/laravel-icon.svg" className="img-fluid w-auto h-auto" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">PGT Teacher</a></p>
													<span className="fs-12">No of Openings : 40 </span>
												</div>
											</div>
											<a href="#" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
										</div>
									</div>
									<div className="tab-pane fade show active" id="applicants">
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="assets/img/users/user-09.jpg" className="img-fluid rounded-circle" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">Brian Villalobos</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 5+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>Bengaluru</span>
												</div>
											</div>
											<span className="badge badge-secondary badge-xs">PGT Teacher</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="assets/img/users/user-32.jpg" className="img-fluid rounded-circle" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">Anthony Lewis</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 4+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-info badge-xs">PGT Teacher</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="assets/img/users/user-32.jpg" className="img-fluid rounded-circle" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">Stephan Peralt</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 6+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-pink badge-xs">PGT Teacher</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-0">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="assets/img/users/user-34.jpg" className="img-fluid rounded-circle" alt="img"/>
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">Doglas Martini</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 2+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-purple badge-xs">PGT Teacher</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employees</h5>
								<a href="employees" className="btn btn-light btn-md mb-2">View All</a>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">	
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Name</th>
												<th>Department</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="assets/img/users/user-32.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
															<span className="fs-12">PGT Teacher</span>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-secondary-transparent badge-xs">
														PGT Teacher
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="assets/img/users/user-09.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
															<span className="fs-12">PGT Teacher</span>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-danger-transparent badge-xs">PGT Teacher</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="assets/img/users/user-01.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
															<span className="fs-12">Executive</span>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-info-transparent badge-xs">Marketing</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="assets/img/users/user-34.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
															<span className="fs-12">PGT Teacher</span>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-purple-transparent badge-xs">PGT Teacher</span>
												</td>
											</tr>
											<tr>
												<td className="border-0">
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="assets/img/users/user-37.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
															<span className="fs-12">PGT Teacher</span>
														</div>
													</div>
												</td>
												<td className="border-0">
													<span className="badge badge-pink-transparent badge-xs">PGT Teacher</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employees By Department</h5>
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>This Week
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">This Month</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">This Week</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">Last Week</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div id="emp-department"></div>
								<p className="fs-13"><i className="ti ti-circle-filled me-2 fs-8 text-primary"></i>No of
									Employees increased by <span className="text-success fw-bold">+20%</span> from last Week
								</p>
							</div>
						</div>
					</div>
					
				</div>

				<div className="row">
					
					<div className="col-xl-7 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Funds Overview</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<a href="#" className="dropdown-toggle btn btn-white border-0 btn-sm d-inline-flex align-items-center fs-13 me-2" data-bs-toggle="dropdown">
											All Departments
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">Teacher</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Administration Staffs</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Trainers</a>
											</li>
										</ul>
									</div>	
								</div>
							</div>
							<div className="card-body pb-0">
								<div className="d-flex align-items-center justify-content-between flex-wrap">
									<div className="d-flex align-items-center mb-1">
										<p className="fs-13 text-gray-9 me-3 mb-0"><i className="ti ti-square-filled me-2 text-primary"></i>Income</p>
										<p className="fs-13 text-gray-9 mb-0"><i className="ti ti-square-filled me-2 text-gray-2"></i>Expenses</p>
									</div>
									<p className="fs-13 mb-1">Last Updated at 11:30PM</p>
								</div>
								<div id="sales-income"></div>
							</div>
						</div>
					</div>
					
					<div className="col-xl-5 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Invoices</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<a href="#" className="dropdown-toggle btn btn-white btn-sm d-inline-flex align-items-center fs-13 me-2 border-0" data-bs-toggle="dropdown">
											Invoices
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">Invoices</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Paid</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Unpaid</a>
											</li>
										</ul>
									</div>
									<div className="dropdown mb-2">
										<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center"  data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Week
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">This Month</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">This Week</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Today</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-2">
								<div className="table-responsive pt-1">	
									<table className="table table-nowrap table-borderless mb-0">
										<tbody>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="invoice-details" className="avatar">
															<img src="assets/img/users/user-39.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="invoice-details">Redesign Website</a></h6>
															<span className="fs-13 d-inline-flex align-items-center">#INVOO2<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Logistics</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$3560</h6>
												</td>
												<td className="px-0 text-end">
													<span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="invoice-details" className="avatar">
															<img src="assets/img/users/user-40.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="invoice-details">Module Completion</a></h6>
															<span className="fs-13 d-inline-flex align-items-center">#INVOO5<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Yip Corp</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$4175</h6>
												</td>
												<td className="px-0 text-end">
													<span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="invoice-details" className="avatar">
															<img src="assets/img/users/user-55.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="invoice-details">Change on Emp Module</a></h6>
															<span className="fs-13 d-inline-flex align-items-center">#INVOO3<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis LLP</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$6985</h6>
												</td>
												<td className="px-0 text-end">
													<span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="invoice-details" className="avatar">
															<img src="assets/img/users/user-42.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="invoice-details">Changes on the Board</a></h6>
															<span className="fs-13 d-inline-flex align-items-center">#INVOO2<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis LLP</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$1457</h6>
												</td>
												<td className="px-0 text-end">
													<span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="invoice-details" className="avatar">
															<img src="assets/img/users/user-44.jpg" className="img-fluid rounded-circle" alt="img"/>
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="invoice-details">Assets Management</a></h6>
															<span className="fs-13 d-inline-flex align-items-center">#INVOO6<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>HCL Corp</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$6458</h6>
												</td>
												<td className="px-0 text-end">
													<span className="badge badge-success-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Paid</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<a href="invoice" className="btn btn-light btn-md w-100 mt-2">View All</a>
							</div>
						</div>
					</div>
				

				</div>

				<div className="row">
					
					
					<div className="col-xxl-8 col-xl-7 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Candidates Monthly Working Hours</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center"  data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Month
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">This Month</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">This Week</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Today</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">	
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>ID</th>
												<th>Name</th>
												<th>Team</th>
												<th>Hours</th>
												<th>Deadline</th>
												<th>Priority</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><a href="project-details" className="link-default">CAN-001</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-02.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-03.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-05.jpg" alt="img"/>
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 40%"></div>
													</div>
												</td>
												<td>12 Sep 2024</td>
												<td>
													<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="project-details" className="link-default">CAN-002</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher </a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-06.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-07.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-08.jpg" alt="img"/>
														</span>
														<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="#">
															+1
														</a>
													</div>
												</td>
												<td>
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 40%"></div>
													</div>
												</td>
												<td>24 Oct 2024</td>
												<td>
													<span className="badge badge-success d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Low
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="project-details" className="link-default">CAN-003</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-06.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-08.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-09.jpg" alt="img"/>
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">40/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 50%"></div>
													</div>
												</td>
												<td>18 Feb 2024</td>
												<td>
													<span className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="project-details" className="link-default">CAN-004</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-11.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-12.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-13.jpg" alt="img"/>
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">35/155 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 50%"></div>
													</div>
												</td>
												<td>19 Feb 2024</td>
												<td>
													<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="project-details" className="link-default">CAN-005</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-17.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-18.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-19.jpg" alt="img"/>
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">50/235 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 50%"></div>
													</div>
												</td>
												<td>18 Feb 2024</td>
												<td>
													<span className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="project-details" className="link-default">CAN-006</a></td>
												<td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-06.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-08.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-09.jpg" alt="img"/>
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">40/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 50%"></div>
													</div>
												</td>
												<td>20 Feb 2024</td>
												<td>
													<span className="badge badge-success d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Low
													</span>
												</td>
											</tr>
											<tr>
												<td className="border-0"><a href="project-details" className="link-default">CAN-008</a></td>
												<td className="border-0"><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
												<td className="border-0">
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-15.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-16.jpg" alt="img"/>
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white" src="assets/img/profiles/avatar-17.jpg" alt="img"/>
														</span>
														<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="#">
															+2
														</a>
													</div>
												</td>
												<td className="border-0">
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style="width: 45%"></div>
													</div>
												</td>
												<td className="border-0">17 Oct 2024</td>
												<td className="border-0">
													<span className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 col-xl-5 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Tasks Statistics</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center"  data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Week
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" className="dropdown-item rounded-1">This Month</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">This Week</a>
											</li>
											<li>
												<a href="#" className="dropdown-item rounded-1">Today</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="chartjs-wrapper-demo position-relative mb-4">
									<canvas id="mySemiDonutChart" height="190"></canvas>
									<div className="position-absolute text-center attendance-canvas">
										<p className="fs-13 mb-1">Total Tasks</p>
										<h3>124/165</h3>
									</div>
								</div>
								<div className="d-flex align-items-center flex-wrap">
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-warning"></i>Ongoing</p>
										<h5>24%</h5>
									</div>
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-info"></i>On Hold </p>
										<h5>10%</h5>
									</div>
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-danger"></i>Overdue</p>
										<h5>16%</h5>
									</div>
									<div className="text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-success"></i>Ongoing</p>
										<h5>40%</h5>
									</div>
								</div>
								<div className="bg-dark br-5 p-3 pb-0 d-flex align-items-center justify-content-between">
									<div className="mb-2">
										<h4 className="text-success">389/689 hrs</h4>
										<p className="fs-13 mb-0">Spent on Overall Tasks This Week</p>
									</div>
									<a href="tasks" className="btn btn-sm btn-light mb-2 text-nowrap">View All</a>
								</div>
							</div>
						</div>
					</div>
				

				</div>

				<div className="row">

					
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Schedules</h5>
								<a href="candidates" className="btn btn-light btn-md mb-2">View All</a>
							</div>
							<div className="card-body">
								<div className="bg-light p-3 br-5 mb-4">
									<span className="badge badge-secondary badge-xs mb-1">PGT Teacher</span>
									<h6 className="mb-2 text-truncate">Interview Candidates - PGT Teacher</h6>
									<div className="d-flex align-items-center flex-wrap">
										<p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb 2025</p>
										<p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>01:00 PM - 02:20 PM</p>
									</div>
									<div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-49.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-13.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-11.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-22.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-58.jpg" alt="img"/>
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="#">
												+3
											</a>
										</div>
										<a href="#" className="btn btn-primary btn-xs">Join Meeting</a>
									</div>
								</div>
								<div className="bg-light p-3 br-5 mb-0">
									<span className="badge badge-dark badge-xs mb-1">PGT Teacher</span>
									<h6 className="mb-2 text-truncate">Interview Candidates - PGT Teacher</h6>
									<div className="d-flex align-items-center flex-wrap">
										<p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb 2025</p>
										<p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>02:00 PM - 04:20 PM</p>
									</div>
									<div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-49.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-13.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-11.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-22.jpg" alt="img"/>
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="assets/img/users/user-58.jpg" alt="img"/>
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="#">
												+3
											</a>
										</div>
										<a href="#" className="btn btn-primary btn-xs">Join Meeting</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recent Activities</h5>
								<a href="activity" className="btn btn-light btn-md mb-2">View All</a>
							</div>
							<div className="card-body">
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-38.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Matt Morgan</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Added New Project <span className="text-primary">HRMS Dashboard</span></p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Jay Ze</a></h6>
													<p className="fs-13">05:00 PM</p>
												</div>
												<p className="fs-13">Commented on Uploaded Document</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-19.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Mary Donald</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Approved Task Candidates</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-11.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">George David</a></h6>
													<p className="fs-13">06:00 PM</p>
												</div>
												<p className="fs-13">Requesting Access to Module Tickets</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-20.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Aaron Zeen</a></h6>
													<p className="fs-13">06:30 PM</p>
												</div>
												<p className="fs-13">Downloaded App Reportss</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="javscript:void(0);" className="avatar  flex-shrink-0">
												<img src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Hendry Daniel</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Completed New Project <span>HMS</span></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Birthdays</h5>
								<a href="#" className="btn btn-light btn-md mb-2">View All</a>
							</div>
							<div className="card-body pb-1">
								<h6 className="mb-2">Today</h6>
								<div className="bg-light p-2 border border-dashed rounded-top mb-3">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" className="avatar">
												<img src="assets/img/users/user-38.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium ">Andrew Jermia</h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<a href="#" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<h6 className="mb-2">Tomorow</h6>
								<div className="bg-light p-2 border border-dashed rounded-top mb-3">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" className="avatar">
												<img src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium"><a href="#">Mary Zeen</a></h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<a href="#" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<div className="bg-light p-2 border border-dashed rounded-top mb-3">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" className="avatar">
												<img src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img"/>
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium "><a href="#">Antony Lewis</a></h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<a href="#" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<h6 className="mb-2">25 Jan 2025</h6>
								<div className="bg-light p-2 border border-dashed rounded-top mb-3">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<span className="avatar">
												<img src="assets/img/users/user-12.jpg" className="rounded-circle" alt="img"/>
											</span>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium ">Doglas Martini</h6>
												<p className="fs-13">PGT Teacher</p>
											</div>
										</div>
										<a href="#" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					

				</div>

			</div>

		
		<div className="modal fade" id="add_todo">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">Add New Todo</h4>
						<button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
							<i className="ti ti-x"></i>
						</button>
					</div>
					<form action="index">
						<div className="modal-body">
							<div className="row">
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Todo Title</label>
										<input type="text" className="form-control"/>
									</div>
								</div>
								<div className="col-6">
									<div className="mb-3">
										<label className="form-label">Tag</label>
										<select className="select">
											<option>Select</option>
											<option>Internal</option>
											<option>Candidates</option>
											<option>Meetings</option>
											<option>Reminder</option> 	 
										</select>
									</div>
								</div>
								<div className="col-6">
									<div className="mb-3">
										<label className="form-label">Priority</label>
										<select className="select">
											<option>Select</option>
											<option>Medium</option>
											<option>High</option>
											<option>Low</option>
										</select>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="mb-3">
										<label className="form-label">Descriptions</label>
										<div className="summernote"></div>
									</div>
								</div>
								<div className="col-12">
									<div className="mb-3">
										<label className="form-label">Add Assignee</label>
										<select className="select">
											<option>Select</option>
											<option>Sophie</option>
											<option>Cameron</option>
											<option>Doris</option>
											<option>Rufana</option>
										</select>
									</div>
								</div>
								<div className="col-12">
									<div className="mb-0">
										<label className="form-label">Status</label>
										<select className="select">
											<option>Select</option>
											<option>Completed</option>
											<option>Pending</option>
											<option>Onhold</option>
											<option>Inprogress</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" className="btn btn-primary">Add New Todo</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
		<div className="modal fade" id="add_project" role="dialog">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header header-border align-items-center justify-content-between">
						<div className="d-flex align-items-center">
							<h5 className="modal-title me-2">Add Teacher</h5>
							<p className="text-dark">Employee ID : CAN-0004</p>
						</div>
						<button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
							<i className="ti ti-x"></i>
						</button>
					</div>
					<div className="add-info-fieldset">
						<div className="add-details-wizard p-3 pb-0">
							<ul className="progress-bar-wizard d-flex align-items-center border-bottom">
								<li className="active p-2 pt-0">
									<h6 className="fw-medium">Basic Information</h6>
								</li>
								<li className="p-2 pt-0">									
									<h6 className="fw-medium">Department</h6>
								</li>
							</ul>
						</div>
						<fieldset id="first-field-file">
							<form action="Candidates">
								<div className="modal-body">
									<div className="row">
										<div className="col-md-12">
											<div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
												<div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
													<i className="ti ti-photo text-gray-2 fs-16"></i>
												</div>                                              
												<div className="profile-upload">
													<div className="mb-2">
														<h6 className="mb-1">Upload profile picture</h6>
														<p className="fs-12">Image should be below 4 mb</p>
													</div>
													<div className="profile-uploader d-flex align-items-center">
														<div className="drag-upload-btn btn btn-sm btn-primary me-2">
															Upload
															<input type="file" className="form-control image-sign" multiple=""/>
														</div>
														<a href="#" className="btn btn-light btn-sm">Cancel</a>
													</div>
													
												</div>
											</div>
										</div>
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label">Username</label>
												<input type="text" className="form-control"/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Department</label>
												<select className="select">
													<option>Select</option>
													<option>Mathematics</option>
													<option>Science</option>
													<option>Physical Trainer</option>
													<option>Language</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-3">
												<label className="form-label">Department Head</label>
												<select className="select">
													<option>Select</option>
													<option>Anthony Lewis</option>
													<option>Brian Villalobos</option>
												</select>
											</div>
										</div>
										<div className="col-md-12">
											<div className="row">
												<div className="col-md-6">
													<div className="mb-3">
														<label className="form-label">Start Date</label>
														<div className="input-icon-end position-relative">
															<input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" value="02-05-2024"/>
															<span className="input-icon-addon">
																<i className="ti ti-calendar text-gray-7"></i>
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="mb-3">
														<label className="form-label">Expiry Date</label>
														<div className="input-icon-end position-relative">
															<input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" value="02-05-2024"/>
															<span className="input-icon-addon">
																<i className="ti ti-calendar text-gray-7"></i>
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="mb-3">
														<label className="form-label">Designation</label>
														<select className="select">
															<option>Select</option>
															<option>Admin</option>
															<option>Teacher</option>
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<div className="mb-3">
														<label className="form-label">Password</label>
														<input type="password" className="form-control" value="********"/>
													</div>
												</div>
											</div>
										</div>
									</div>								
								</div>
								<div className="modal-footer">
									<div className="d-flex align-items-center justify-content-end">
										<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
										<button className="btn btn-primary wizard-next-btn" type="button">Next</button>
									</div>
								</div>
							</form>
						</fieldset>
						<fieldset>
							<form action="Candidates">
								<div className="modal-body">
									<div className="row">
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label me-2">Department Staffs</label>
												<input className="input-tags form-control" placeholder="Add new" type="text" data-role="tagsinput"  name="Label" value="Jerald,Andrew,Philip,Davis"/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="mb-3">
												<label className="form-label me-2">Department Head</label>
												<input className="input-tags form-control" placeholder="Add new" type="text" data-role="tagsinput"  name="Label" value="Hendry,James"/>
											</div>
										</div>
									</div>								
								</div>
								<div className="modal-footer">
									<div className="d-flex align-items-center justify-content-end">
										<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
										<button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#success_modal">Submit</button>
									</div>
								</div>
							</form>
						</fieldset>
					</div>
				</div>
			</div>
		</div>

		<div className="modal fade" id="add_leaves">
			<div className="modal-dialog modal-dialog-centered modal-md">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">Add Leave Request</h4>
						<button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
							<i className="ti ti-x"></i>
						</button>
					</div>
					<form action="index">
						<div className="modal-body pb-0">
							<div className="row">
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Employee Name</label>
										<select className="select">
											<option>Select</option>
											<option>Anthony Lewis</option>
											<option>Brian Villalobos</option>
											<option>Harvey Smith</option>
										</select>
									</div>	
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Leave Type</label>
										<select className="select">
											<option>Select</option>
											<option>Medical Leave</option>
											<option>Casual Leave</option>
											<option>Annual Leave</option>
										</select>
									</div>	
								</div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">From </label>
                                        <div className="input-icon-end position-relative">
                                            <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy"/>
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">To </label>
                                        <div className="input-icon-end position-relative">
                                            <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy"/>
                                            <span className="input-icon-addon">
                                                <i className="ti ti-calendar text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>   
								<div className="col-md-6">
									<div className="mb-3">
										<label className="form-label">No of Days</label>
										<input type="text" className="form-control"/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="mb-3">
										<label className="form-label">Remaining Days</label>
										<input type="text" className="form-control" value="4" disabled/>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Reason</label>
										<textarea className="form-control" rows="3"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div className="modal fade" id="add_employee">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<div className="d-flex align-items-center">
							<h4 className="modal-title me-2"><i className="fa fa-graduation-cap text-primary"></i> Add New User</h4>
						</div>
						<button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
							<i className="ti ti-x"></i>
						</button>
					</div>
					<form action="employees">
						<div className="contact-grids-tab">
							<ul className="nav nav-underline" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
								  <button className="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#basic-info" type="button" role="tab" aria-selected="true">Basic Information</button>
								</li>
								<li className="nav-item" role="presentation">
								  <button className="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address" type="button" role="tab" aria-selected="false">Permissions</button>
								</li>
							</ul>
						</div>
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabindex="0">
									<div className="modal-body pb-0 ">	
										<div className="row">
											<div className="col-md-12">
												<div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
													<div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
														<i className="ti ti-photo text-gray-2 fs-16"></i>
													</div>                                              
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Upload Profile Image</h6>
															<p className="fs-12">Image should be below 4 mb</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Upload
																<input type="file" className="form-control image-sign" multiple=""/>
															</div>
															<a href="#" className="btn btn-light btn-sm">Cancel</a>
														</div>
														
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">First Name <span className="text-danger"> *</span></label>
													<input type="text" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Last Name</label>
													<input type="email" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Employee ID <span className="text-danger"> *</span></label>
													<input type="text" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Joining Date <span className="text-danger"> *</span></label>
													<div className="input-icon-end position-relative">
														<input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy"/>
														<span className="input-icon-addon">
															<i className="ti ti-calendar text-gray-7"></i>
														</span>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Phone Number <span className="text-danger"> *</span></label>
													<input type="text" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Posting School<span className="text-danger"> *</span></label>
													<input type="text" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Department</label>
													<select className="select">
														<option>Select</option>
														<option>All Department</option>
														<option>Finance</option>
														<option>Developer</option>
														<option>Executive</option>
													</select>
												</div>		
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Designation</label>
													<select className="select">
														<option>Select</option>
														<option>Finance</option>
														<option>Developer</option>
														<option>Executive</option>
													</select>
												</div>		
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Username <span className="text-danger"> *</span></label>
													<input type="text" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Email <span className="text-danger"> *</span></label>
													<input type="email" className="form-control"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3 ">
													<label className="form-label">Password <span className="text-danger"> *</span></label>
													<div className="pass-group">
														<input type="password" className="pass-input form-control"/>
														<span className="ti toggle-password ti-eye-off"></span>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3 ">
													<label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
													<div className="pass-group">
														<input type="password" className="pass-inputs form-control"/>
														<span className="ti toggle-passwords ti-eye-off"></span>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="mb-3">
													<label className="form-label">About Teacher<span className="text-danger"> *</span></label>
													<textarea className="form-control" rows="3"></textarea>
												</div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
										<button type="submit" className="btn btn-primary">Save </button>
									</div>
							</div>
							<div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab" tabindex="0">
								<div className="modal-body">	
									<div className="card bg-light-500">
										<div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-3">
											<h6>Enable Options</h6>
											<div className="d-flex align-items-center justify-content-end">
												<div className="form-check form-switch me-2">
													<label className="form-check-label mt-0">
													<input className="form-check-input me-2" type="checkbox" role="switch"/>
														Enable all Module
													</label>
												</div>
												<div className="form-check d-flex align-items-center">
													<label className="form-check-label mt-0">
														<input className="form-check-input" type="checkbox" checked=""/>
														Select All
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className="table-responsive border rounded">
										<table className="table">
											<tbody>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch" checked/>
																Holidays
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Leaves
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Students
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Subjects
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Tasks
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Chats
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch" checked/>
															Library
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Timing Sheets
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
									<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#success_modal">Save </button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	
		<div className="modal fade" id="edit_employee">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<div className="d-flex align-items-center">
							<h4 className="modal-title me-2">Edit Candidate</h4><span>Candidate  ID : EMP -0024</span>
						</div>
						<button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
							<i className="ti ti-x"></i>
						</button>
					</div>
					<form action="employees">
						<div className="contact-grids-tab">
							<ul className="nav nav-underline" id="myTab2" role="tablist">
								<li className="nav-item" role="presentation">
								  <button className="nav-link active" id="info-tab2" data-bs-toggle="tab" data-bs-target="#basic-info2" type="button" role="tab" aria-selected="true">Basic Information</button>
								</li>
								<li className="nav-item" role="presentation">
								  <button className="nav-link" id="address-tab2" data-bs-toggle="tab" data-bs-target="#address2" type="button" role="tab" aria-selected="false">Permissions</button>
								</li>
							</ul>
						</div>
						<div className="tab-content" id="myTabContent2">
							<div className="tab-pane fade show active" id="basic-info2" role="tabpanel" aria-labelledby="info-tab2" tabindex="0">
									<div className="modal-body pb-0 ">	
										<div className="row">
											<div className="col-md-12">
												<div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
													<div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
														<img src="assets/img/users/user-13.jpg" alt="img" className="rounded-circle"/>
													</div>                                              
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Upload Profile Image</h6>
															<p className="fs-12">Image should be below 4 mb</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Upload
																<input type="file" className="form-control image-sign" multiple=""/>
															</div>
															<a href="#" className="btn btn-light btn-sm">Cancel</a>
														</div>
														
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">First Name <span className="text-danger"> *</span></label>
													<input type="text" className="form-control" value="Anthony"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Last Name</label>
													<input type="email" className="form-control" value="Lewis"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Cadidates ID <span className="text-danger"> *</span></label>
													<input type="text" className="form-control" value="Emp-001"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Joining Date <span className="text-danger"> *</span></label>
													<div className="input-icon-end position-relative">
														<input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" value="17-10-2022"/>
														<span className="input-icon-addon">
															<i className="ti ti-calendar text-gray-7"></i>
														</span>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Username <span className="text-danger"> *</span></label>
													<input type="text" className="form-control" value="Anthony"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Email <span className="text-danger"> *</span></label>
													<input type="email" className="form-control" value="anthony@example.com	"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3 ">
													<label className="form-label">Password <span className="text-danger"> *</span></label>
													<div className="pass-group">
														<input type="password" className="pass-input form-control"/>
														<span className="ti toggle-password ti-eye-off"></span>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3 ">
													<label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
													<div className="pass-group">
														<input type="password" className="pass-inputs form-control"/>
														<span className="ti toggle-passwords ti-eye-off"></span>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Phone Number <span className="text-danger"> *</span></label>
													<input type="text" className="form-control" value="(123) 4567 890"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Company<span className="text-danger"> *</span></label>
													<input type="text" className="form-control" value="Abac Company"/>
												</div>									
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Department</label>
													<select className="select">
														<option>Select</option>
														<option>All Department</option>
														<option selected>Finance</option>
														<option>Developer</option>
														<option>Executive</option>
													</select>
												</div>		
											</div>
											<div className="col-md-6">
												<div className="mb-3">
													<label className="form-label">Designation</label>
													<select className="select">
														<option>Select</option>
														<option selected>Finance</option>
														<option>Developer</option>
														<option>Executive</option>
													</select>
												</div>		
											</div>
											<div className="col-md-12">
												<div className="mb-3">
													<label className="form-label">About <span className="text-danger"> *</span></label>
													<textarea className="form-control" rows="3"></textarea>
												</div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
										<button type="submit" className="btn btn-primary">Save </button>
									</div>
							</div>
							<div className="tab-pane fade" id="address2" role="tabpanel" aria-labelledby="address-tab2" tabindex="0">
								<div className="modal-body">	
									<div className="card bg-light-500">
										<div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-3">
											<h6>Enable Options</h6>
											<div className="d-flex align-items-center justify-content-end">
												<div className="form-check form-switch me-2">
													<label className="form-check-label mt-0">
													<input className="form-check-input me-2" type="checkbox" role="switch"/>
														Enable all Module
													</label>
												</div>
												<div className="form-check d-flex align-items-center">
													<label className="form-check-label mt-0">
														<input className="form-check-input" type="checkbox" checked=""/>
														Select All
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className="table-responsive border rounded">
										<table className="table">
											<tbody>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch" checked/>
																Holidays
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Leaves
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Clients
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Projects
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Tasks
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Chats
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch" checked/>
															Assets
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox" checked=""/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="form-check form-switch me-2">
															<label className="form-check-label mt-0">
															<input className="form-check-input me-2" type="checkbox" role="switch"/>
															Timing Sheets
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Read
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Write
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Create
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Delete
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Import
															</label>
														</div>
													</td>
													<td>
														<div className="form-check d-flex align-items-center">
															<label className="form-check-label mt-0">
																<input className="form-check-input" type="checkbox"/>
																Export
															</label>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-outline-light border me-2" data-bs-dismiss="modal">Cancel</button>
									<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#success_modal">Save </button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	
		<div className="modal fade" id="success_modal" role="dialog">
			<div className="modal-dialog modal-dialog-centered modal-sm">
				<div className="modal-content">
					<div className="modal-body">
						<div className="text-center p-3">
							<span className="avatar avatar-lg avatar-rounded bg-success mb-3"><i className="ti ti-check fs-24"></i></span>
							<h5 className="mb-2">Cadidates Added Successfully</h5>
							<p className="mb-3">Stephan Peralt has been added with Client ID : <span className="text-primary">#EMP - 0001</span>
							</p>
							<div>
								<div className="row g-2">
									<div className="col-6">
										<a href="employees" className="btn btn-dark w-100">Back to List</a>
									</div>
									<div className="col-6">
										<a href="employee-details" className="btn btn-primary w-100">Detail Page</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
  );
}

