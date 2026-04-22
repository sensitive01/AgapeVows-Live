import React from 'react';
import logo from '../../../assets/employer-admin/assets/img/logo.svg';


const InvoiceModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body p-5">
                        <div className="row justify-content-between align-items-center mb-3">
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <img src={logo} className="img-fluid" alt="logo" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-end mb-3">
                                    <h5 className="text-dark mb-1">Invoice</h5>
                                    <p className="mb-1 fw-normal"><i className="ti ti-file-invoice me-1"></i>INV0287</p>
                                    <p className="mb-1 fw-normal"><i className="ti ti-calendar me-1"></i>Issue date : 12 Sep 2024</p>
                                    <p className="fw-normal"><i className="ti ti-calendar me-1"></i>Due date : 12 Oct 2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3 d-flex justify-content-between">
                            <div className="col-md-7">
                                <p className="text-dark mb-2 fw-medium fs-16">Invoice From :</p>
                                <div>
                                    <p className="mb-1">SmartHR</p>
                                    <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                                    <p className="mb-1"><a href="#" className="__cf_email__" data-cfemail="01726c6073756973416479606c716d642f626e6c">[email&#160;protected]</a></p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <p className="text-dark mb-2 fw-medium fs-16">Invoice To :</p>
                                <div>
                                    <p className="mb-1">BrightWave Innovations</p>
                                    <p className="mb-1">367 Hillcrest Lane, Irvine, California, United States</p>
                                    <p className="mb-1"><a href="#" className="__cf_email__" data-cfemail="bbd6d2d8d3daded7fbdec3dad6cbd7de95d8d4d6">[email&#160;protected]</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="table-responsive mb-3">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Plan</th>
                                            <th>Billing Cycle</th>
                                            <th>Created Date</th>
                                            <th>Expiring On</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Advanced (Monthly)</td>
                                            <td>30 Days</td>
                                            <td>12 Sep 2024</td>
                                            <td>12 Oct 2024</td>
                                            <td>$200</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mb-3 d-flex justify-content-between">
                            <div className="col-md-4">
                                <div>
                                    <h6 className="mb-4">Payment info:</h6>
                                    <p className="mb-0">Credit Card - 123***********789</p>
                                    <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                        <p className="mb-0">Amount</p>
                                        <p className="text-dark fw-medium mb-2">$200.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex justify-content-between align-items-center pe-3">
                                    <p className="text-dark fw-medium mb-0">Sub Total</p>
                                    <p className="mb-2">$200.00</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pe-3">
                                    <p className="text-dark fw-medium mb-0">Tax</p>
                                    <p className="mb-2">$0.00</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pe-3">
                                    <p className="text-dark fw-medium mb-0">Total</p>
                                    <p className="text-dark fw-medium mb-2">$200.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="card border mb-0">
                            <div className="card-body">
                                <p className="text-dark fw-medium mb-2">Terms & Conditions:</p>
                                <p className="fs-12 fw-normal d-flex align-items-baseline mb-2">
                                    <i className="ti ti-point-filled text-primary me-1"></i>
                                    All payments must be made according to the agreed schedule. Late payments may incur additional fees.
                                </p>
                                <p className="fs-12 fw-normal d-flex align-items-baseline">
                                    <i className="ti ti-point-filled text-primary me-1"></i>
                                    We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light me-2" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary">Print Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;