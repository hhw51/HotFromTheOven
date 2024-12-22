import React from 'react';

const CatalogButton: React.FC = () => {
  return (
    <div className="text-center mt-8">
      <button className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600">
        View Catalog
      </button>
    </div>
  );
};

export default CatalogButton;
