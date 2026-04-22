import React from 'react';
import { TiCalendar, TiEdit, TiUser } from 'react-icons/ti';
import { RiCheckFill } from 'react-icons/ri';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

import avatar01 from '../../../assets/employer-admin/assets/img/profiles/avatar-01.jpg';
import avatar02 from '../../../assets/employer-admin/assets/img/profiles/avatar-02.jpg';
import avatar03 from '../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg';
import avatar05 from '../../../assets/employer-admin/assets/img/profiles/avatar-05.jpg';
import avatar06 from '../../../assets/employer-admin/assets/img/profiles/avatar-06.jpg';
import avatar08 from '../../../assets/employer-admin/assets/img/profiles/avatar-08.jpg';
import avatar11 from '../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg';
import avatar12 from '../../../assets/employer-admin/assets/img/profiles/avatar-12.jpg';
import avatar14 from '../../../assets/employer-admin/assets/img/profiles/avatar-14.jpg';
import avatar15 from '../../../assets/employer-admin/assets/img/profiles/avatar-15.jpg';
import avatar16 from '../../../assets/employer-admin/assets/img/profiles/avatar-16.jpg';

const TimeTable = () => {
    // Sample data for today's schedule
    const todaysSchedule = [
        {
            id: 1,
            classTime: '09:00 am to 09:45 am',
            subject: 'Science',
            section: '5th A Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Mayor Kelly',
                avatar: avatar03,
                status: 'online'
            },
            students: [
                avatar02,
                avatar08,
                avatar02,
                '+4'
            ],
            progress: 52,
            strength: '28 out of 35'
        },
        {
            id: 2,
            classTime: '09:45 am to 10:30 am',
            subject: 'Science',
            section: '5th B Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Andrew Garfield',
                avatar: avatar12,
                status: 'online'
            },
            students: [
                avatar01,
                avatar05,
                avatar11,
                avatar15,
                '+4'
            ],
            progress: 91,
            strength: '28 out of 35'
        },
        {
            id: 3,
            classTime: '10:45 am to 11:30 am',
            subject: 'Science',
            section: '6th A Section',
            role: 'Class Tutor',
            classTutor: {
                name: 'Simon Cowel',
                avatar: avatar14,
                status: 'online'
            },
            students: [
                avatar06,
                avatar16,
                '+10'
            ],
            progress: 45,
            strength: '28 out of 35'
        },
        {
            id: 4,
            classTime: '11:30 am to 12:15 pm',
            subject: 'Science',
            section: '6th B Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Mirinda Hers',
                avatar: avatar05,
                status: 'online'
            },
            students: [
                avatar03,
             avatar11,
                avatar14,
                '+6'
            ],
            progress: 21,
            strength: '28 out of 35'
        },
        {
            id: 5,
            classTime: '01:00 pm to 01:45 pm',
            subject: 'Science',
            section: '4th A Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Mayor Kelly',
                avatar: avatar03,
                status: 'online'
            },
            students: [
                avatar02,
                avatar08,
                avatar02,
                '+4'
            ],
            progress: 52,
            strength: '28 out of 35'
        },
        {
            id: 6,
            classTime: '01:45 pm to 02:30 pm',
            subject: 'Science',
            section: '4th B Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Andrew Garfield',
                avatar: avatar12,
                status: 'online'
            },
            students: [
                avatar01,
                avatar05,
                avatar11,
                avatar15,
                '+4'
            ],
            progress: 91,
            strength: '28 out of 35'
        },
        {
            id: 7,
            classTime: '02:45 pm to 03:30 pm',
            subject: 'Science',
            section: '5th A Section',
            role: 'Class Tutor',
            classTutor: {
                name: 'Simon Cowel',
                avatar: avatar14,
                status: 'online'
            },
            students: [
                avatar06,
                avatar16,
                '+10'
            ],
            progress: 45,
            strength: '28 out of 35'
        },
        {
            id: 8,
            classTime: '03:30 pm to 04:15 pm',
            subject: 'Science',
            section: '5th C Section',
            role: 'Subject Teacher',
            classTutor: {
                name: 'Mirinda Hers',
                avatar: avatar05,
                status: 'online'
            },
            students: [
                avatar03,
             avatar11,
                avatar14,
                '+6'
            ],
            progress: 21,
            strength: '28 out of 35'
        }
    ];

    // Sample data for weekly schedule
    const weeklySchedule = [
        {
            id: 1,
            classTime: '09:00 am to 09:45 am',
            monday: '11th A',
            tuesday: '12th B',
            wednesday: '-',
            thursday: '9th B',
            friday: '-',
            saturday: '10th C',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 2,
            classTime: '09:45 am to 10:30 am',
            monday: '-',
            tuesday: '11th A',
            wednesday: '12th B',
            thursday: '-',
            friday: '11th A',
            saturday: '12th B',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 3,
            classTime: '10:45 am to 11:30 am',
            monday: '11th A',
            tuesday: '12th B',
            wednesday: '-',
            thursday: '11th A',
            friday: '12th B',
            saturday: '-',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 4,
            classTime: '11:30 am to 12:15 pm',
            monday: '11th A',
            tuesday: '12th B',
            wednesday: '11th A',
            thursday: '12th B',
            friday: '-',
            saturday: '-',
            status: 'Holiday',
            occupied: '5 / 8'
        },
        {
            id: 5,
            classTime: '01:00 pm to 01:45 pm',
            monday: '11th A',
            tuesday: '12th B',
            wednesday: '-',
            thursday: '-',
            friday: '11th A',
            saturday: '12th B',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 6,
            classTime: '01:45 pm to 02:30 pm',
            monday: '-',
            tuesday: '11th A',
            wednesday: '12th B',
            thursday: '11th A',
            friday: '12th B',
            saturday: '-',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 7,
            classTime: '02:45 pm to 03:30 pm',
            monday: '11th A',
            tuesday: '12th B',
            wednesday: '-',
            thursday: '11th A',
            friday: '12th B',
            saturday: '-',
            status: 'Scheduled',
            occupied: '5 / 8'
        },
        {
            id: 8,
            classTime: '03:30 pm to 04:15 pm',
            monday: '-',
            tuesday: '11th A',
            wednesday: '12th B',
            thursday: '-',
            friday: '11th A',
            saturday: '12th B',
            status: 'Scheduled',
            occupied: '5 / 8'
        }
    ];

    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                {/* Header */}
                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                    <div className="my-auto">
                        <h2>Timetable</h2>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        <div className="me-2">
                            <div className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                    <i className="ti ti-file-export me-1"></i>Choose Staff
                                </a>
                            </div>
                        </div>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#add_company" className="btn btn-primary d-flex align-items-center">
                            <TiUser className="me-2" />Swap Schedule
                        </a>
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header justify-content-between bg-primary">
                                <div className="card-title text-white">
                                    &nbsp; <TiCalendar /> &nbsp; Today's Schedule
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table text-nowrap border border-grey">
                                        <thead>
                                            <tr>
                                                <th className="bg-secondary text-white" scope="col">Class</th>
                                                <th className="bg-secondary text-white" scope="col">Class Time</th>
                                                <th className="bg-secondary text-white" scope="col">Subject</th>
                                                <th className="bg-secondary text-white" scope="col">Section</th>
                                                <th className="bg-secondary text-white" scope="col">Role</th>
                                                <th className="bg-secondary text-white" scope="col">Class Tutor</th>
                                                <th className="bg-secondary text-white" scope="col">Students</th>
                                                <th className="bg-secondary text-white" colSpan="2" scope="col">Today's Strength</th>
                                                <th className="bg-secondary text-white" scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {todaysSchedule.map((schedule, index) => (
                                                <React.Fragment key={schedule.id}>
                                                    {index === 2 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Morning Break Between 10:30 am to 10:45 am</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {index === 4 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Lunch Break Between 12:15 pm to 01:00 pm</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {index === 6 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Lunch Break Between 02:30 pm to 02:45 pm</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                        <td>{schedule.id}</td>
                                                        <td>{schedule.classTime}</td>
                                                        <td>{schedule.subject}</td>
                                                        <td>{schedule.section}</td>
                                                        <td>
                                                            <span className={`badge ${schedule.role === 'Class Tutor' ? 'bg-soft-success' : 'bg-soft-primary'}`}>
                                                                {schedule.role}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <span className={`avatar avatar-xs me-2 ${schedule.classTutor.status} avatar-rounded`}>
                                                                    <img src={schedule.classTutor.avatar} alt="img" />
                                                                </span>
                                                                {schedule.classTutor.name}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="avatar-list-stacked">
                                                                {schedule.students.map((student, i) => (
                                                                    typeof student === 'string' && student.startsWith('assets/') ? (
                                                                        <span key={i} className="avatar avatar-sm avatar-rounded">
                                                                            <img src={student} alt="student" />
                                                                        </span>
                                                                    ) : (
                                                                        <a key={i} className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" href="javascript:void(0);">
                                                                            {student}
                                                                        </a>
                                                                    )
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="progress progress-xs">
                                                                <div
                                                                    className="progress-bar bg-primary"
                                                                    role="progressbar"
                                                                    style={{ width: `${schedule.progress}%` }}
                                                                    aria-valuenow={schedule.progress}
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"
                                                                ></div>
                                                            </div>
                                                        </td>
                                                        <td>{schedule.strength}</td>
                                                        <td>
                                                            <div className="hstack gap-2 fs-15">
                                                                <a href="javascript:void(0);" className="btn btn-success">
                                                                    <TiEdit /> Class Report
                                                                </a>
                                                                <a href="javascript:void(0);" className="btn btn-info">
                                                                    <TiCalendar /> Swap
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header justify-content-between bg-primary text-white">
                                <div className="card-title text-white">
                                    &nbsp; <TiCalendar /> &nbsp; This Week Schedules
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table text-nowrap border border-grey">
                                        <thead>
                                            <tr align="center">
                                                <th className="bg-secondary text-white" scope="col">Class</th>
                                                <th className="bg-secondary text-white" scope="col">Schedule</th>
                                                <th className="bg-secondary text-white" scope="col">Monday</th>
                                                <th className="bg-secondary text-white" scope="col">Tuesday</th>
                                                <th className="bg-secondary text-white" scope="col">Wednesday</th>
                                                <th className="bg-secondary text-white" scope="col">Thursday</th>
                                                <th className="bg-secondary text-white" scope="col">Friday</th>
                                                <th className="bg-secondary text-white" scope="col">Saturday</th>
                                                <th className="bg-secondary text-white" scope="col">Status</th>
                                                <th className="bg-secondary text-white" scope="col">Occupied</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {weeklySchedule.map((schedule, index) => (
                                                <React.Fragment key={schedule.id}>
                                                    {index === 2 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Morning Break Between 10:30 am to 10:45 am</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {index === 4 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Lunch Break Between 12:15 pm to 01:00 pm</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {index === 6 && (
                                                        <tr>
                                                            <td className="bg-light" colSpan="10" align="center">
                                                                <b>Lunch Break Between 02:30 pm to 02:45 pm</b>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    <tr align="center">
                                                        <td>{schedule.id}</td>
                                                        <td>{schedule.classTime}</td>
                                                        <td>{schedule.monday}</td>
                                                        <td>{schedule.tuesday}</td>
                                                        <td>{schedule.wednesday}</td>
                                                        <td>{schedule.thursday}</td>
                                                        <td>{schedule.friday}</td>
                                                        <td>{schedule.saturday}</td>
                                                        <td>
                                                            <span className={`badge ${schedule.status === 'Scheduled' ? 'bg-soft-success' : 'bg-soft-danger'}`}>
                                                                <RiCheckFill className="align-middle me-1" />
                                                                {schedule.status}
                                                            </span>
                                                        </td>
                                                        <td>{schedule.occupied}</td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EmployerAdminFooter />
        </>
    );
};

export default TimeTable;