import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import getPictures from '../services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
    const fetchPictures = async () => {
      try {
        setIsLoading(true);
        const data = await getPictures(query, page);
        if (data.totalHits) {
          setPictures(prevState => [...prevState, ...data.hits]);
          setTotal(data.totalHits);
        }
      } catch (error) {
        setError(error => error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPictures();
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

  const totalPage = total / pictures.length;

  return (
    <div>
      <Searchbar onSubmit={searchPictures} />
      {pictures.length !== 0 && <ImageGallery pictures={pictures} />}
      {totalPage > 1 && pictures.length !== 0 && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      {error &&
        toast.error('Whoops, something went wrong. Please, refresh the page')}
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default Pictures;
