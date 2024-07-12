import { useState, useEffect } from 'react';
import axios from 'axios';

const pageLimit = 20; // Define the page limit for pagination

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBosses = async (page) => {
    try {
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/locations?limit=${pageLimit}&page=${page}`,
      );
      const newBosses = response.data.data;
      setLocations((prevBosses) =>
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
    <div className="Locations">
      <h1>Elden Ring Locations</h1>
      <ul className="boss-list">
        {locations.map((locations) => (
          <li key={locations.id} className="locations-card">
            <h2>{locations.name}</h2>
            {locations.image && (
              <img src={locations.image} alt={locations.name} />
            )}
            <p>{locations.description}</p>
            <p>{locations.region}</p>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Locations;
