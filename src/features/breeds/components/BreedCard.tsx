import React, { memo } from 'react';
import { Breed } from '../../../shared/api/client';
import './breedCard.css';

export type BreedCardProps = {
  breed: Breed;
  onClick?: () => void;
};

const BreedCardComponent: React.FC<BreedCardProps> = ({ breed, onClick }) => {
  const bg = breed.image?.url;
  return (
    <div className="breed-card" onClick={onClick} role="button" tabIndex={0}>
      {bg && <div className="breed-bg" style={{ backgroundImage: `url(${bg})` }} />}
      <div className="breed-info">
        <div className="breed-name">{breed.name}</div>
        {breed.bred_for && <div className="breed-sub">{breed.bred_for}</div>}
      </div>
    </div>
  );
};

export const BreedCard = memo(BreedCardComponent);
export default BreedCard;
