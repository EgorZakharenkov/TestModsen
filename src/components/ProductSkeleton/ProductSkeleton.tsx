import './style.scss';
import { FC } from 'react';
interface Props {
  isFull?: boolean;
}
export const ProductSkeleton: FC<Props> = ({ isFull }) => {
  return (
    <div className={`card-skeleton ${isFull ? 'is-full' : ''}`}>
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-author"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};
