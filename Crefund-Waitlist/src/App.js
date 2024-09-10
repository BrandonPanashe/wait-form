import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import stylesheet from '././App.css';

const propertyTypes = [
  'Office', 'Retail', 'Industrial', 'Multifamily', 'Hotel', 'Mixed Use', 'Special Purpose', 'Other'
];

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    propertyValue: '',
    propertyTypes: [],
    otherPropertyType: '',
    states: [],
    painPoint: '',
    subscribeNewsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'propertyTypes' || name === 'states') {
        setFormData(prevData => ({
          ...prevData,
          [name]: checked
            ? [...prevData[name], value]
            : prevData[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prevData => ({ ...prevData, [name]: checked }));
      }
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
  
    const formDataToSend = {
      ...formData,
      propertyTypes: formData.propertyTypes.join(', '),
      states: formData.states.join(', ')
    };
  
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwWbK9yZuOEH6cba13O27kVVM6OGWBFFpTFWLQUiVVCbATxIg95ADin1kB-VcRhlY6JTQ/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        }
      );
      
      setSubmitMessage('Thank you for joining our waitlist!');
      // Optionally reset the form here
      // setFormData({ ... }); // Reset to initial state
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#e1672d' }}>
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Join Our2 Exclusive Waitlist</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Be among the first to access CreFund's AI-Powered CRE Refinancing Platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {['name', 'email', 'company'].map((field, index) => (
              <div key={field}>
                <label htmlFor={field} className="sr-only">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm ${
                    index === 0 ? 'rounded-t-md' : index === 2 ? 'rounded-b-md' : ''
                  }`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {['role', 'propertyValue'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === 'role' ? 'Role' : 'Typical Property Value Range'}
                </label>
                <select
                  id={field}
                  name={field}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  value={formData[field]}
                  onChange={handleChange}
>
                  <option value="">Select {field === 'role' ? 'your role' : 'range'}</option>
                  {field === 'role' 
                    ? ['Property Owner', 'CRE Broker', 'Lender', 'Other'].map(option => (
                        <option key={option} value={option.toLowerCase()}>{option}</option>
                      ))
                    : ['$1M - $5M', '$5M - $10M', '$10M - $20M', '$20M+'].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                  }
                </select>
              </div>
            ))}
            
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">Property Types (Select all that apply)</legend>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="propertyTypes"
                      value={type}
                      checked={formData.propertyTypes.includes(type)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {formData.propertyTypes.includes('Other') && (
                <input
                  type="text"
                  name="otherPropertyType"
                  value={formData.otherPropertyType}
                  onChange={handleChange}
                  placeholder="Please specify other property type"
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              )}
            </fieldset>
            
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">States of Focus (Select all that apply)</legend>
              <div className="grid grid-cols-5 gap-2">
                {states.map(state => (
                  <label key={state} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="states"
                      value={state}
                      checked={formData.states.includes(state)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                    <span className="ml-1 text-sm text-gray-700">{state}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="painPoint" className="block text-sm font-medium text-gray-700">
                What's your biggest pain point in CRE refinancing?
              </label>
              <textarea
                id="painPoint"
                name="painPoint"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Tell us about your challenges..."
                value={formData.painPoint}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="subscribeNewsletter" className="font-medium text-gray-700">
                  Email Newsletter
                </label>
                <p className="text-gray-500">
                  I agree to receive marketing emails from CreFund. I understand I can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
            >
              {isSubmitting ? 'Submitting...' : 'Secure My Spot'}
            </button>
          </div>
          
          {submitMessage && (
            <div className={`text-center ${submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
              {submitMessage}
            </div>
          )}
        </form>
        <div className="flex items-center justify-center text-sm text-orange-800">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>Only 20 spots left! Act fast to join our exclusive waitlist.</span>
        </div>
      </div>
    </div>
  );
}

