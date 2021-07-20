import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(1);

  const fetchById = async () => {
    setIsLoading(!isLoading);
    try {
      const data = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
      setGallery(data.data);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchById();
  }, [])

  return (
    <div className='gallery'>
      <div className='searchBar'>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder='Album id' className='text-field' />
        <button className='btn' onClick={fetchById}>
          <span>&#xf002;</span>
        </button>
      </div>
      {isLoading ? (<div className='loader'>
        <div className='outer-border'>

        </div>
      </div>) : (
        <div className='gallery-items'>
          {gallery.map(({ thumbnailUrl, title }, i) => (
            <div key={i} className='gallery-item'>
              <img src={thumbnailUrl} alt='' />
              <div className='title'>
                <span>{title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
