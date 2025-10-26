import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreeds } from '../hooks/useBreeds';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../shared/store';
import { advance, setVote } from '../store/progressSlice';
import { Breed } from '../../../shared/api/client';
import BreedCard from '../components/BreedCard';
import { useVote } from '../hooks/useVote';
import './mainPage.css';

const Buttons: React.FC<{ onDislike: () => void; onLike: () => void; onSuper: () => void }> = ({ onDislike, onLike, onSuper }) => (
  <div className="btn-bar">
    <button aria-label="dislike" className="btn btn-dislike" onClick={onDislike}>❌</button>
    <button aria-label="super like" className="btn btn-super" onClick={onSuper}>⭐</button>
    <button aria-label="like" className="btn btn-like" onClick={onLike}>✅</button>
  </div>
);

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentIndex } = useSelector((s: RootState) => s.progress);
  const { data: breeds = [], isLoading, isError } = useBreeds(0);
  const vote = useVote();

  const current: Breed | undefined = breeds[currentIndex];

  const goDetails = useCallback(() => {
    if (current) navigate(`/breeds/${current.id}`);
  }, [navigate, current]);

  const doVote = useCallback(
    (value: -1 | 1 | 2) => {
      if (!current?.image?.id) return; // require image id for vote API
      vote.mutate({ image_id: current.image.id, value });
      dispatch(
        setVote({ breedId: current.id, pref: value === -1 ? 'dislike' : value === 1 ? 'like' : 'super', imageId: current.image.id }),
      );
      dispatch(advance());
    },
    [current, dispatch, vote],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load breeds.</div>;
  if (!current) return <div>No more breeds.</div>;

  let startX = 0; let startY = 0;
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 40) doVote(1); // right
      else if (dx < -40) doVote(-1); // left
    } else {
      if (dy < -60) doVote(2); // up
    }
  };

  return (
    <div className="main-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <BreedCard breed={current} onClick={goDetails} />
      <Buttons onDislike={() => doVote(-1)} onLike={() => doVote(1)} onSuper={() => doVote(2)} />
      <div className="hint">Swipe: left=dislike, right=like, up=super like. Click card for details.</div>
    </div>
  );
};

export default MainPage;
