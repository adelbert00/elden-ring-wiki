import { useState, useEffect } from 'react';
import axios from 'axios';

const initialPageLimit = 50; // Start with a lower page limit
const initialPage = 0;

const Creatures = () => {
  const [creatures, setCreatures] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageLimit] = useState(initialPageLimit);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCreatures = async (page, limit) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/creatures?limit=${limit}&page=${page}`,
      );
      const newCreatures = response.data.data;
      setCreatures((prevCreatures) =>
        page === 0 ? newCreatures : [...prevCreatures, ...newCreatures],
      );
      setHasMore(newCreatures.length >= limit);
      console.log(response);
    } catch (error) {
      console.error('Error fetching creatures:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatures(initialPage, initialPageLimit); // Initial fetch
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCreatures(nextPage, pageLimit);
  };

  return (
    <div className="Creatures">
      <h1>Elden Ring Creatures</h1>
      <ul className="creature-list">
        {creatures.map((creature) => (
          <li key={creature.id} className="creature-card">
            <h2>{creature.name}</h2>
            {creature.image && <img src={creature.image} alt={creature.name} />}
            <p>{creature.description}</p>
            <p>{creature.location}</p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Creatures;
