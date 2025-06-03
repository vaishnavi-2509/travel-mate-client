import React from 'react'
import Footer from './Footer'

import Navbar from './Navbar'
import AdminUpcomingTrips from './AdminUpcomingTrips'
function AdminHome() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <AdminUpcomingTrips />
      </div>
      {/* <div className="min-h-screen bg-gray-100">
        <AdminTripForm />
      </div> */}

      <div>
        <Footer />
      </div>
    </>
    
  )
}

export default AdminHome