import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import getPictures from '../services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const Pictures = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    try {
      setIsLoading(true);
      getPictures(query, page).then(({ totalHits, hits }) => {
        if (totalHits) {
          setPictures(prevState => [...prevState, ...hits]);
          setTotal(totalHits / 12);
        }
      });
    } catch (error) {
      setError(error => error.message);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  const searchPictures = search => {
    if (search !== query.value) {
      setQuery(search);
      setPictures([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={searchPictures} />
      <ImageGallery pictures={pictures} />
      {total > 1 && !isLoading && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
      {error && <p>Whoops, something went wrong. Please, refresh the page </p>}
    </div>
  );
};

export default Pictures;
