import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0]
    const referenceNum = searchQuery.get('reference')
  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor:'#f1f1f1'}}>
      <h1 style={{fontSize:'4rem'}}>Order Successfull!</h1>
      <h6>Reference No. : {referenceNum}</h6>
    </div>
  )
}

export default PaymentSuccess
