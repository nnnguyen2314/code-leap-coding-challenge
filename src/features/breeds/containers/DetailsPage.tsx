import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBreeds } from '../hooks/useBreeds';
import './detailsPage.css';

export const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: breeds = [] } = useBreeds(0);
  const breed = breeds.find((b) => String(b.id) === id);

  if (!breed) return <div>Loading details...</div>;

  return (
    <div className="details">
      <div className="details-hero-wrap">
        {breed.image?.url && (
          <div className="details-hero" style={{ backgroundImage: `url(${breed.image.url})` }} />
        )}
        <button
          className="back-btn"
          aria-label="Back"
          title="Back"
          onClick={() => navigate('/')}
        >
          ←
        </button>
      </div>
      <div className="details-body">
        <h1>{breed.name}</h1>
        <ul>
          {breed.weight?.metric && (
            <li>
              <strong>Weight:</strong> {breed.weight.metric} kg
            </li>
          )}
          {breed.height?.metric && (
            <li>
              <strong>Height:</strong> {breed.height.metric} cm
            </li>
          )}
          {breed.bred_for && (
            <li>
              <strong>Bred for:</strong> {breed.bred_for}
            </li>
          )}
          {breed.breed_group && (
            <li>
              <strong>Breed group:</strong> {breed.breed_group}
            </li>
          )}
          {breed.life_span && (
            <li>
              <strong>Life span:</strong> {breed.life_span}
            </li>
          )}
          {breed.temperament && (
            <li>
              <strong>Temperament:</strong> {breed.temperament}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;
