import React from 'react'
import Footer from '../components/Footer'

import Navbar from '../components/Navbar'
import UpcomingTrips from '../pages/UpcomingTrips'
function AdminHome() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <UpcomingTrips />
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