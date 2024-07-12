import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure you have appropriate styling

const pageLimit = 20; // Define the page limit for pagination

const Bosses = () => {
  const [bosses, setBosses] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBosses = async (page) => {
    try {
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/bosses?limit=${pageLimit}&page=${page}`,
      );
      const newBosses = response.data.data;
      setBosses((prevBosses) =>
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
    <div className="Bosses">
      <h1>Elden Ring Bosses</h1>
      <ul className="boss-list">
        {bosses.map((boss) => (
          <li key={boss.id} className="boss-card">
            <h2>{boss.name}</h2>
            {boss.image && <img src={boss.image} alt={boss.name} />}
            <p>{boss.description}</p>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Bosses;
