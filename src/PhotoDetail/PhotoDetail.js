import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./PhotoDetail.css";

function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // Thay YOUR_UNSPLASH_ACCESS_KEY bằng API Key của bạn

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
        );
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [id, accessKey]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="photo-detail p-4">
      <Link
        to="/photos"
        className="back-link text-blue-500 underline mb-4 block"
      >
        Back to Gallery
      </Link>
      <div className="photo-detail-content max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
        <img
          src={photo.urls.full}
          alt={photo.description}
          className="photo-detail-image w-full h-auto mb-4 rounded-lg shadow-md"
        />
        <h2 className="text-2xl font-bold mb-2">
          {photo.alt_description || "Untitled"}
        </h2>
        <div className="photo-author1">
          <a
            href={`https://www.instagram.com/${photo.user.instagram_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="author-img1"
          >
            <img
              className="author-img1"
              src={photo.user.profile_image.medium}
              alt={photo.user.name}
            />
          </a>
          <a
            href={`https://www.instagram.com/${photo.user.instagram_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="author-text1"
          >
            {photo.user.name}
          </a>
        </div>{" "}
        <p className="text-gray-600">
          {photo.description ||
            photo.alt_description ||
            "No description available."}
        </p>
      </div>
    </div>
  );
}

export default PhotoDetail;
