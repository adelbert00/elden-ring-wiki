import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Library from '../../pages/Library/Library';
import Bosses from '../../pages/Bosses/Bosses';
import Locations from '../../pages/Locations/Locations';
import Creatures from '../../pages/Creatures/Creatures';
import NPCs from '../../pages/NPCs/NPCs';
import Builder from '../../pages/Builder/Builder';
import './Navbar.scss';

const Navbar = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Library</Link>
          </li>
          <li>
            <Link to="/bosses">Bosses</Link>
          </li>
          <li>
            <Link to="./creatures">Bestialis</Link>
          </li>
          <li>
            <Link to="./locations">Locations</Link>
          </li>
          <li>
            <Link to="./npcs">NPCs</Link>
          </li>
          <li>
            <Link to="./builder">Builder</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/bosses" element={<Bosses />} />
        <Route path="/creatures" element={<Creatures />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/npcs" element={<NPCs />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Router>
  );
};
export default Navbar;
