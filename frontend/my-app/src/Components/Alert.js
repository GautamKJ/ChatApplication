import React from 'react'

const Alert = () => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        User successfully added
        </div>
    <div className="alert alert-danger" role="alert">
    User not found
            </div>
    </div>
  )
}

export default Alert

