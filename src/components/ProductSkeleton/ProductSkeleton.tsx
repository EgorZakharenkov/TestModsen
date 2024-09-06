import './style.scss';

import { FC } from 'react';

import { SkeletonProps } from '../../utils/types';

export const ProductSkeleton: FC<SkeletonProps> = ({ isFull }) => {
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
