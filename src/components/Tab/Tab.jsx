// src/components/Tab.jsx
/* eslint-disable react/prop-types */
import "./Tab.scss"

const Tab = ({ type, selectedType, onClick }) => {
  return (
    <div className="filter">
      <button
        className={selectedType === type ? 'active' : ''}
        onClick={() => onClick(type)}
        >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
      </div>
  );
};

export default Tab;
