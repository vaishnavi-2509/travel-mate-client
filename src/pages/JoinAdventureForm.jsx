"use client"

import { useState } from "react"

export default function JoinAdventureForm() {
  const initialParticipant = {
    name: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    aadharNumber: "",
    email: "",
    alternatePhone: "",
    foodPreference: "",
    healthCondition: "",
  }

  // Trip details (you can make these props or fetch from API)
  const tripDetails = {
    name: "Himalayan Adventure Trek",
    destination: "Manali to Leh, Ladakh",
    timeline: "7 Days / 6 Nights",
    startDate: "March 15, 2024",
    endDate: "March 21, 2024",
    pricePerPerson: 15000,
    includes: ["Accommodation", "Meals", "Transportation", "Guide", "Permits"],
  }

  const [participants, setParticipants] = useState([{ ...initialParticipant }])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const validateParticipant = (participant, index) => {
    const participantErrors = {}

    if (!participant.name.trim()) participantErrors.name = "Name is required"
    if (!participant.phone.trim()) {
      participantErrors.phone = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(participant.phone)) {
      participantErrors.phone = "Invalid 10-digit phone number"
    }
    if (!participant.age) {
      participantErrors.age = "Age is required"
    } else if (isNaN(participant.age) || Number.parseInt(participant.age) < 1) {
      participantErrors.age = "Invalid age"
    }
    if (!participant.gender) participantErrors.gender = "Gender is required"
    if (!participant.address.trim()) participantErrors.address = "Address is required"
    if (!participant.aadharNumber.trim()) {
      participantErrors.aadharNumber = "Aadhar number is required"
    } else if (!/^[0-9]{12}$/.test(participant.aadharNumber)) {
      participantErrors.aadharNumber = "Invalid 12-digit Aadhar number"
    }
    if (!participant.email.trim()) {
      participantErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email)) {
      participantErrors.email = "Invalid email address"
    }
    if (!participant.alternatePhone.trim()) {
      participantErrors.alternatePhone = "Alternate phone is required"
    } else if (!/^[0-9]{10}$/.test(participant.alternatePhone)) {
      participantErrors.alternatePhone = "Invalid 10-digit phone number"
    } else if (participant.alternatePhone === participant.phone) {
      participantErrors.alternatePhone = "Must be different from primary phone"
    }
    if (!participant.foodPreference) participantErrors.foodPreference = "Food preference is required"
    if (!participant.healthCondition.trim()) participantErrors.healthCondition = "Health condition is required"

    return participantErrors
  }

  const validateForm = () => {
    const newErrors = {}
    let hasErrors = false

    const aadharNumbers = participants.map((p) => p.aadharNumber).filter((a) => a.trim())
    const duplicateAadhar = aadharNumbers.filter((item, index) => aadharNumbers.indexOf(item) !== index)
    const phoneNumbers = participants.map((p) => p.phone).filter((p) => p.trim())
    const duplicatePhone = phoneNumbers.filter((item, index) => phoneNumbers.indexOf(item) !== index)

    participants.forEach((participant, index) => {
      const participantErrors = validateParticipant(participant, index)

      if (duplicateAadhar.includes(participant.aadharNumber)) {
        participantErrors.aadharNumber = "Aadhar number must be unique"
      }
      if (duplicatePhone.includes(participant.phone)) {
        participantErrors.phone = "Phone number must be unique"
      }

      if (Object.keys(participantErrors).length > 0) {
        newErrors[index] = participantErrors
        hasErrors = true
      }
    })

    return { newErrors, hasErrors }
  }

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    }
    setParticipants(updatedParticipants)

    if (errors[index] && errors[index][field]) {
      const updatedErrors = { ...errors }
      delete updatedErrors[index][field]
      if (Object.keys(updatedErrors[index]).length === 0) {
        delete updatedErrors[index]
      }
      setErrors(updatedErrors)
    }
  }

  const addParticipant = () => {
    setParticipants([...participants, { ...initialParticipant }])
  }

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      const updatedParticipants = participants.filter((_, i) => i !== index)
      setParticipants(updatedParticipants)

      const updatedErrors = { ...errors }
      delete updatedErrors[index]

      const reindexedErrors = {}
      Object.keys(updatedErrors).forEach((key) => {
        const errorIndex = Number.parseInt(key)
        if (errorIndex > index) {
          reindexedErrors[errorIndex - 1] = updatedErrors[key]
        } else if (errorIndex < index) {
          reindexedErrors[errorIndex] = updatedErrors[key]
        }
      })

      setErrors(reindexedErrors)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { newErrors, hasErrors } = validateForm()
    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Show confirmation modal instead of submitting directly
    setShowConfirmModal(true)
  }

  const handleFinalSubmit = () => {
    setIsSubmitting(true)
    setShowConfirmModal(false)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted successfully:", { participants, tripDetails })
      setIsSubmitting(false)
      setSubmitSuccess(true)

      setTimeout(() => {
        setParticipants([{ ...initialParticipant }])
        setErrors({})
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }

  const totalAmount = participants.length * tripDetails.pricePerPerson

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Compact Header */}
          <div className="bg-blue-600 py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Join Adventure</h2>
                <p className="text-blue-100 text-sm">Book for multiple people</p>
              </div>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {participants.length} {participants.length === 1 ? "Participant" : "Participants"}
              </span>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 mx-6 mt-4">
              <div className="flex">
                <svg className="h-4 w-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-700 ml-2">
                  Application for {participants.length} {participants.length === 1 ? "participant" : "participants"}{" "}
                  submitted successfully!
                </p>
              </div>
            </div>
          )}

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {participants.map((participant, index) => (
              <div key={index} className="mb-8 last:mb-4">
                {/* Compact Participant Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">
                    Participant {index + 1}
                    {index === 0 && <span className="text-xs text-gray-500 ml-2">(Primary)</span>}
                  </h3>
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="text-red-600 hover:text-red-800 text-xs font-medium flex items-center"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                {/* Compact Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter full name"
                    />
                    {errors[index]?.name && <p className="text-xs text-red-600 mt-1">{errors[index].name}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={participant.age}
                      onChange={(e) => handleParticipantChange(index, "age", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.age ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Age"
                      min="1"
                    />
                    {errors[index]?.age && <p className="text-xs text-red-600 mt-1">{errors[index].age}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={participant.phone}
                      onChange={(e) => handleParticipantChange(index, "phone", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10-digit phone"
                    />
                    {errors[index]?.phone && <p className="text-xs text-red-600 mt-1">{errors[index].phone}</p>}
                  </div>

                  {/* Alternate Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Alt Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={participant.alternatePhone}
                      onChange={(e) => handleParticipantChange(index, "alternatePhone", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.alternatePhone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Alternate phone"
                    />
                    {errors[index]?.alternatePhone && (
                      <p className="text-xs text-red-600 mt-1">{errors[index].alternatePhone}</p>
                    )}
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Food <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={participant.foodPreference}
                      onChange={(e) => handleParticipantChange(index, "foodPreference", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.foodPreference ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="all">All</option>
                    </select>
                    {errors[index]?.foodPreference && (
                      <p className="text-xs text-red-600 mt-1">{errors[index].foodPreference}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors[index]?.email && <p className="text-xs text-red-600 mt-1">{errors[index].email}</p>}
                  </div>

                  {/* Aadhar */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Aadhar <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={participant.aadharNumber}
                      onChange={(e) => handleParticipantChange(index, "aadharNumber", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.aadharNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="12-digit Aadhar"
                    />
                    {errors[index]?.aadharNumber && (
                      <p className="text-xs text-red-600 mt-1">{errors[index].aadharNumber}</p>
                    )}
                  </div>
                </div>

                {/* Gender - Inline */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    {["male", "female", "other"].map((gender) => (
                      <div key={gender} className="flex items-center">
                        <input
                          id={`gender-${gender}-${index}`}
                          name={`gender-${index}`}
                          type="radio"
                          value={gender}
                          checked={participant.gender === gender}
                          onChange={(e) => handleParticipantChange(index, "gender", e.target.value)}
                          className="h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={`gender-${gender}-${index}`} className="ml-1 text-xs text-gray-700 capitalize">
                          {gender}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors[index]?.gender && <p className="text-xs text-red-600 mt-1">{errors[index].gender}</p>}
                </div>

                {/* Address and Health - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="2"
                      value={participant.address}
                      onChange={(e) => handleParticipantChange(index, "address", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Complete address"
                    ></textarea>
                    {errors[index]?.address && <p className="text-xs text-red-600 mt-1">{errors[index].address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Health Condition <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="2"
                      value={participant.healthCondition}
                      onChange={(e) => handleParticipantChange(index, "healthCondition", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[index]?.healthCondition ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Health conditions, allergies, medications"
                    ></textarea>
                    {errors[index]?.healthCondition && (
                      <p className="text-xs text-red-600 mt-1">{errors[index].healthCondition}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Participant Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={addParticipant}
                className="w-full flex justify-center items-center py-2 px-4 border-2 border-dashed border-blue-300 rounded-md text-blue-600 hover:border-blue-400 hover:text-blue-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Participant
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                `Submit Application (${participants.length} ${participants.length === 1 ? "Participant" : "Participants"})`
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-blue-600 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Confirm Your Booking</h3>
                <button onClick={() => setShowConfirmModal(false)} className="text-white hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Trip Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Trip Name:</span>
                    <span className="text-gray-900">{tripDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Destination:</span>
                    <span className="text-gray-900">{tripDetails.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Timeline:</span>
                    <span className="text-gray-900">{tripDetails.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Start Date:</span>
                    <span className="text-gray-900">{tripDetails.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">End Date:</span>
                    <span className="text-gray-900">{tripDetails.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Number of Travellers:</span>
                    <span className="text-gray-900">{participants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Price per Person:</span>
                    <span className="text-gray-900">₹{tripDetails.pricePerPerson.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total Amount:</span>
                      <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants List */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Participants</h4>
                <div className="space-y-3">
                  {participants.map((participant, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {participant.name} {index === 0 && <span className="text-xs text-gray-500">(Primary)</span>}
                          </p>
                          <p className="text-sm text-gray-600">
                            Age: {participant.age} | {participant.gender} | {participant.foodPreference}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{participant.phone}</p>
                          <p className="text-sm text-gray-600">{participant.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Includes */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Package Includes</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="grid grid-cols-2 gap-2">
                    {tripDetails.includes.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go Back & Edit
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm & Submit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
