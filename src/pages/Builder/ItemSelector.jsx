import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ItemSelector.scss';

const ItemSelector = ({ category, filter, onSelect }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://eldenring.fanapis.com/api/${category}?search=${searchQuery}`,
        );
        const filteredItems = filter
          ? response.data.data.filter((item) => item.category === filter)
          : response.data.data;
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [category, filter, searchQuery]);

  return (
    <div className="item-selector">
      <input
        type="text"
        placeholder={`Search ${category}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item" onClick={() => onSelect(item)}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ItemSelector.propTypes = {
  category: PropTypes.string.isRequired,
  filter: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ItemSelector;
