import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../contexts/Context';
import { createRequest } from '../api/requestsApi';

export default function AskForHelp() {
  const navigate = useNavigate();
  const { requestsDispatch } = useContext(DataContext);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    when: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRequest(requestsDispatch, formData);
    // Clear form data
    setFormData({
      description: '',
      category: '',
      when: ''
    });
    setShowSuccess(true);
    // Automatically hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Ask for Help</h1>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <p className="text-green-700 mb-2">Your request has been successfully created!</p>
          <Link 
            to="/#requests-section" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View all requests on homepage
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Errands">Errands</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Household">Household</option>
            <option value="Pet Care">Pet Care</option>
            <option value="Childcare">Childcare</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Tech Support">Tech Support</option>
            <option value="Moving">Moving</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe what you need help with..."
          />
        </div>

        <div>
          <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">
            When do you need help?
          </label>
          <input
            type="datetime-local"
            id="when"
            name="when"
            value={formData.when}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brick hover:bg-brickHover text-white px-8 py-3 rounded-lg text-base font-semibold 
              transition-all duration-300 transform hover:-translate-y-1"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
