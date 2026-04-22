import React from 'react'
import { Check } from 'lucide-react'

const SuccessModal = ({ onClose }) => {
    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-xm">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center p-3">
                            <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                                <Check className="fs-24" />
                            </span>
                            <h5 className="mb-2">Job Posted Successfully</h5>
                            <div>
                                <div className="row g-2">
                                    <div className="col-12">
                                        <button className="btn btn-dark w-100" onClick={onClose}>
                                            Back to List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
