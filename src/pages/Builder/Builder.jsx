import { useState } from 'react';
import './Builder.scss';
import ItemSelector from './ItemSelector';

const Builder = () => {
  const [selectedItems, setSelectedItems] = useState({
    weapon: null,
    helmet: null,
    chest: null,
    legs: null,
    shield: null,
    talisman: null,
  });

  const handleItemSelect = (category, item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [category]: item,
    }));
  };

  const calculateStats = () => {
    const stats = {
      attack: 0,
      defense: 0,
      dmgNegation: {},
      resistance: {},
      bonuses: [],
    };

    Object.values(selectedItems).forEach((item) => {
      if (item) {
        if (item.attack) {
          item.attack.forEach((a) => (stats.attack += a.amount || 0));
        }
        if (item.defense) {
          stats.defense += item.defense.amount || 0;
        }
        if (item.dmgNegation) {
          item.dmgNegation.forEach((d) => {
            if (!stats.dmgNegation[d.name]) stats.dmgNegation[d.name] = 0;
            stats.dmgNegation[d.name] += d.amount;
          });
        }
        if (item.resistance) {
          item.resistance.forEach((r) => {
            if (!stats.resistance[r.name]) stats.resistance[r.name] = 0;
            stats.resistance[r.name] += r.amount;
          });
        }
        if (item.bonuses) {
          stats.bonuses.push(...item.bonuses);
        }
      }
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="builder">
      <h1>Character Builder</h1>
      <div className="equipment">
        <div className="category">
          <h2>Weapon</h2>
          <ItemSelector
            category="weapons"
            onSelect={(item) => handleItemSelect('weapon', item)}
          />
          {selectedItems.weapon && (
            <div className="selected-item">
              <img
                src={selectedItems.weapon.image}
                alt={selectedItems.weapon.name}
              />
              <p>{selectedItems.weapon.name}</p>
              <p>
                Required Attributes:{' '}
                {selectedItems.weapon.requiredAttributes
                  .map((attr) => `${attr.name}: ${attr.amount}`)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
        <div className="category">
          <h2>Helmet</h2>
          <ItemSelector
            category="armors"
            filter="Helm"
            onSelect={(item) => handleItemSelect('helmet', item)}
          />
          {selectedItems.helmet && (
            <div className="selected-item">
              <img
                src={selectedItems.helmet.image}
                alt={selectedItems.helmet.name}
              />
              <p>{selectedItems.helmet.name}</p>
              <div className="armor-stats">
                <p>
                  Dmg Negation:{' '}
                  {selectedItems.helmet.dmgNegation
                    .map((d) => `${d.name}: ${d.amount}`)
                    .join(', ')}
                </p>
                <p>
                  Resistance:{' '}
                  {selectedItems.helmet.resistance
                    .map((r) => `${r.name}: ${r.amount}`)
                    .join(', ')}
                </p>
                <p>Weight: {selectedItems.helmet.weight}</p>
              </div>
            </div>
          )}
        </div>
        <div className="category">
          <h2>Chest Armor</h2>
          <ItemSelector
            category="armors"
            filter="Chest Armor"
            onSelect={(item) => handleItemSelect('chest', item)}
          />
          {selectedItems.chest && (
            <div className="selected-item">
              <img
                src={selectedItems.chest.image}
                alt={selectedItems.chest.name}
              />
              <p>{selectedItems.chest.name}</p>
              <div className="armor-stats">
                <p>
                  Dmg Negation:{' '}
                  {selectedItems.chest.dmgNegation
                    .map((d) => `${d.name}: ${d.amount}`)
                    .join(', ')}
                </p>
                <p>
                  Resistance:{' '}
                  {selectedItems.chest.resistance
                    .map((r) => `${r.name}: ${r.amount}`)
                    .join(', ')}
                </p>
                <p>Weight: {selectedItems.chest.weight}</p>
              </div>
            </div>
          )}
        </div>
        <div className="category">
          <h2>Leg Armor</h2>
          <ItemSelector
            category="armors"
            filter="Leg Armor"
            onSelect={(item) => handleItemSelect('legs', item)}
          />
          {selectedItems.legs && (
            <div className="selected-item">
              <img
                src={selectedItems.legs.image}
                alt={selectedItems.legs.name}
              />
              <p>{selectedItems.legs.name}</p>
              <div className="armor-stats">
                <p>
                  Dmg Negation:{' '}
                  {selectedItems.legs.dmgNegation
                    .map((d) => `${d.name}: ${d.amount}`)
                    .join(', ')}
                </p>
                <p>
                  Resistance:{' '}
                  {selectedItems.legs.resistance
                    .map((r) => `${r.name}: ${r.amount}`)
                    .join(', ')}
                </p>
                <p>Weight: {selectedItems.legs.weight}</p>
              </div>
            </div>
          )}
        </div>
        <div className="category">
          <h2>Shield</h2>
          <ItemSelector
            category="shields"
            onSelect={(item) => handleItemSelect('shield', item)}
          />
          {selectedItems.shield && (
            <div className="selected-item">
              <img
                src={selectedItems.shield.image}
                alt={selectedItems.shield.name}
              />
              <p>{selectedItems.shield.name}</p>
              <p>
                Required Attributes:{' '}
                {selectedItems.shield.requiredAttributes
                  .map((attr) => `${attr.name}: ${attr.amount}`)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
        <div className="category">
          <h2>Talisman</h2>
          <ItemSelector
            category="talismans"
            onSelect={(item) => handleItemSelect('talisman', item)}
          />
          {selectedItems.talisman && (
            <div className="selected-item">
              <img
                src={selectedItems.talisman.image}
                alt={selectedItems.talisman.name}
              />
              <p>{selectedItems.talisman.name}</p>
              <p>Description: {selectedItems.talisman.effect}</p>
            </div>
          )}
        </div>
      </div>
      <div className="stats">
        <h2>Total Stats</h2>
        <p>Attack: {stats.attack}</p>
        <p>Defense: {stats.defense}</p>
        <p>Bonuses: {stats.bonuses.join(', ')}</p>
        <p>
          Dmg Negation:{' '}
          {Object.entries(stats.dmgNegation)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')}
        </p>
        <p>
          Resistance:{' '}
          {Object.entries(stats.resistance)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')}
        </p>
      </div>
    </div>
  );
};

export default Builder;
