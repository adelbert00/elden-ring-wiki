// src/ItemLibrary.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';

import Tab from '../../components/Tab/Tab';
import ItemCard from '../../components/ItemCard/ItemCard';

const itemTypes = [
  'weapons',
  'armors',
  'shields',
  'talismans',
  'ammos',
  'sorceries',
  'items',
  'incantations',
  'ashes',
  'spirits',
];
const pageLimit = 100;

const Library = () => {
  const [selectedType, setSelectedType] = useState('weapons');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // Filtrowanie z frazą
  // const [filteredItems, setFilteredItems] = useState([]);

  const fetchItems = async (type, page, query = '') => {
    try {
      // API request
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/${type}?limit=${pageLimit}&page=${page}&search=${query}`,
      );
      // Handling the response
      const newItems = response.data.data;
      // Updating state with fetched items
      setItems((prevItems) =>
        page === 0 ? newItems : [...prevItems, ...newItems],
      );
      // Manging pagination
      setHasMore(newItems.length >= pageLimit);
      console.log(response);
      // Error handling
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItems(selectedType, 0);
  }, [selectedType]);

  //  useEffect(() => {
  //   // Filter creatures containing "Smithing Stone" in name or description
  //   const filtered = items.filter(item =>
  //     item.name.toLowerCase().includes('smithing stone') ||
  //     item.description.toLowerCase().includes('smithing stone')
  //   );
  //   setFilteredItems(filtered);
  // }, [items]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchItems(selectedType, nextPage);
  };

  return (
    <div className="library">
      <div className='banner'>
        <p>Following Site was based on fanmade API provide by...</p>
        <h1>Elden Ring Library</h1>
      </div>
      <div className="tabs">
        {itemTypes.map((type) => (
          <Tab
            key={type}
            type={type}
            selectedType={selectedType}
            onClick={(type) => {
              setSelectedType(type);
              setPage(0);
            }}
          />
        ))}
      </div>
      {/* {filteredItems.map(item => (
          <li key={item.id} className="item-card">
            <h2>{item.name}</h2>
            {item.image && <img src={item.image} alt={item.name} />}
            <p>{item.description}</p>
            <p>{item.type}</p>
          </li>
        ))} */}
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Library;
