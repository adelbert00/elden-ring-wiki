import { useState, useEffect } from 'react';
import axios from 'axios';

const pageLimit = 20; // Define the page limit for pagination

const NPCs = () => {
  const [npcs, setNPCs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBosses = async (page) => {
    try {
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/npcs?limit=${pageLimit}&page=${page}`,
      );
      const newBosses = response.data.data;
      setNPCs((prevBosses) =>
        page === 0 ? newBosses : [...prevBosses, ...newBosses],
      );
      setHasMore(newBosses.length >= pageLimit);
      console.log(response);
    } catch (error) {
      console.error('Error fetching bosses:', error);
    }
  };

  useEffect(() => {
    fetchBosses(0); // Initial fetch
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBosses(nextPage);
  };

  return (
    <div className="NPCs">
      <h1>Elden Ring NPCs</h1>
      <ul className="boss-list">
        {npcs.map((npcs) => (
          <li key={npcs.id} className="npcs-card">
            <h2>{npcs.name}</h2>
            {npcs.image && <img src={npcs.image} alt={npcs.name} />}
            <p>{npcs.location}</p>
            <p>{npcs.quote}</p>
            <p>{npcs.role}</p>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default NPCs;
