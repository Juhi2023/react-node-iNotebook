import React from 'react'

function Alert(props) {
  return (
    <div>
      <div className={`alert alert-${props.type} d-flex align-items-center justify-content-center`} role="alert">
        <div className='text-center'>
            {props.message}
        </div>
        </div>
    </div>
  )
}

export default Alert
