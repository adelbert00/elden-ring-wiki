// src/components/CreatureDrop.jsx
/* eslint-disable react/prop-types */

const CreatureDrop = ({ item }) => {
  return (
    <div className="drops">
      <ul className="creature-drop">
        {item.drops &&
          item.drops.map((drop) => <li key={drop.name}>{drop.name}</li>)}
      </ul>
    </div>
  );
};

export default CreatureDrop;
