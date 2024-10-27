import React from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import "./PhotoList.css";

function PhotoList({ photos }) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {photos.map((photo) => (
        <Link key={photo.id} to={`/photos/${photo.id}`} className="photo-item">
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            className="photo-img"
          />
          <div className="photo-author">
            <img
              src={photo.user.profile_image.medium}
              alt={photo.user.name}
              className="author-img"
            />
            <p className="author-text">{photo.user.name}</p>
          </div>
        </Link>
      ))}
    </Masonry>
  );
}

export default PhotoList;
