import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import PhotoDetail from "./PhotoDetail/PhotoDetail";
import PhotoList from "./PhotoList/PhotoList";

function App() {
  const [photos, setPhotos] = useState([]);
  const [photoIds, setPhotoIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // Thay YOUR_UNSPLASH_ACCESS_KEY bằng API Key của bạn

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}&per_page=10`
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const newPhotos = data.filter((photo) => !photoIds.has(photo.id));
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setPhotoIds(
          (prevIds) =>
            new Set([...prevIds, ...newPhotos.map((photo) => photo.id)])
        );
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [accessKey, page, loading, hasMore, photoIds]);

  useEffect(() => {
    fetchPhotos(); // Tải 12 ảnh đầu tiên
  }, []); // Dependency array rỗng để chỉ chạy một lần

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        fetchPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPhotos, loading, hasMore]);

  return (
    <Router>
      <div className="App">
        <h1 className="title">Unsplash Photo Gallery</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route
            path="/photos"
            element={
              <div className="photo-grid-container">
                <div className="">
                  <PhotoList photos={photos} />
                </div>
                {loading && (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading...</div>
                  </div>
                )}
                {!hasMore && <p className="no-more">No more photos to load.</p>}
              </div>
            }
          />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
