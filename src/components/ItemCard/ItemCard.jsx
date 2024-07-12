// src/components/ItemCard.jsx
/* eslint-disable react/prop-types */
import './ItemCard.scss'

const ItemCard = ({ item }) => {
  return (
    <li className="item-card">
      <h2>{item.name}</h2>
      <div className='item-container'>

        <img src={item.image} alt={item.name} />
        <p>{item.description}</p>
      </div>
        <ul className="item-stats">
          <h1>Required Attributes</h1>
            <div className='required'>

            {item.requiredAttributes &&
              item.requiredAttributes.map((stat) => (
                <li key={stat.name}>
                  {stat.name}: {stat.amount}
                </li>
              ))}
             {item.requires &&
            item.requires.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.amount}
              </li>
            ))}  
              </div>

              <p className='weight'>Weight: {item.weight}</p>

            
          <p>{item.cost}</p>
          <p className="effects">{item.effects}</p>
          <div className='attack'>
            <h1>Specs</h1>
            {item.attack &&
              item.attack.map((stat) => (
                <li key={stat.name}>
                  {stat.name}: {stat.amount}
                </li>
              ))}
          </div>

          {item.dmgNegation &&
            item.dmgNegation.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.amount}
              </li>
            ))}
          {item.resistance &&
            item.resistance.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.amount}
              </li>
            ))}
        </ul>
    </li>
  );
};

export default ItemCard;
