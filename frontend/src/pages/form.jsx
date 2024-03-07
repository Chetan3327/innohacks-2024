import React, { useState } from 'react';

const SellerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    officeAddress: '',
    sellerType: '',
    uniqueSellerId: '',
    officeEmail: '',
    officeNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Seller Information Form</h2>
      <form>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Office Address */}
        <div className="mb-4">
          <label htmlFor="officeAddress" className="block text-sm font-medium text-gray-600">
            Office Address
          </label>
          <input
            type="text"
            id="officeAddress"
            name="officeAddress"
            value={formData.officeAddress}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Seller Type */}
        <div className="mb-4">
          <label htmlFor="sellerType" className="block text-sm font-medium text-gray-600">
            Type of Seller
          </label>
          <input
            type="text"
            id="sellerType"
            name="sellerType"
            value={formData.sellerType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Unique Seller ID */}
        <div className="mb-4">
          <label htmlFor="uniqueSellerId" className="block text-sm font-medium text-gray-600">
            Unique Seller ID
          </label>
          <input
            type="text"
            id="uniqueSellerId"
            name="uniqueSellerId"
            value={formData.uniqueSellerId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Office Email */}
        <div className="mb-4">
          <label htmlFor="officeEmail" className="block text-sm font-medium text-gray-600">
            Office Email
          </label>
          <input
            type="email"
            id="officeEmail"
            name="officeEmail"
            value={formData.officeEmail}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Office Number */}
        <div className="mb-4">
          <label htmlFor="officeNumber" className="block text-sm font-medium text-gray-600">
            Office Number
          </label>
          <input
            type="tel"
            id="officeNumber"
            name="officeNumber"
            value={formData.officeNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        </form>
    </div>
    
    
    
    </div>
  );
};

export default SellerForm;