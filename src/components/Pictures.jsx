import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
// import searchPictures from '../services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ColorRing } from 'react-loader-spinner';

const Pictures = () => {
  const [pictures, setPictures] = useState(null);
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
      setIsLoading(true);
      try {
        const images = await searchPictures;
        console.log('images:', images);
        if (images === 0) {
          return;
        }
        setPictures(prevState => [...prevState, ...images.hits]);
      } catch (error) {
        setError(error => error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPictures();
  }, [query, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //     const { search, page } = this.state;
  //     if (prevState.search !== search || prevState.page !== page) {
  //         try {
  //             this.setState({ isLoading: true });
  //             const data = await searchPictures(search, page);
  //             this.setState(({ pictures }) => ({
  //                 pictures: [...pictures, ...data.hits],
  //                 total: data.totalHits,
  //             }));
  //         } catch (error) {
  //             this.setState(error => error.message);
  //         }
  //         finally {
  //             this.setState({ isLoading: false });
  //         }
  //     }
  // };

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

  // const { pictures, error, isLoading, total } = this.state;
  // const { searchPictures, loadMore } = this;
  //   const totaPage = pictures.length / total;
  return (
    console.log(pictures),
    (
      <div>
        <Searchbar onSubmit={searchPictures} />
        {/*pictures && <ImageGallery pictures={pictures} /> */}
        {error && (
          <p>Whoops, something went wrong. Please, refresh the page </p>
        )}
        {/* {totaPage < 1 && !isLoading && <Button onClick={loadMore} />} */}
        {/* {isLoading && <Loader />} */}
      </div>
    )
  );
};

export default Pictures;
