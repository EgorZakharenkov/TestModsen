import React from "react";
import "./style.scss";
interface Props {
  isFull?: boolean;
}
export const ProductSkeleton: React.FC<Props> = ({ isFull }) => {
  return (
    <div className={`card-skeleton ${isFull ? "is-full" : ""}`}>
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-author"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};
