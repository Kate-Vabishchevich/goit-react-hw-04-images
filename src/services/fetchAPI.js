import axios from 'axios';

const API_KEY = '32106886-cb1cc02bd30eab36270ed5df7';
const BASE_URL = 'https://pixabay.com/api/';

const getPictures = async (query, page) => {
  const options = {
    params: {
      q: query,
      page: page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: API_KEY,
    },
  };
  const response = await axios.get(`${BASE_URL}`, options);
  const { hits, totalHits } = response.data;
  if (response.status !== 200) {
    return;
  }
  return { hits, totalHits };
};

export default getPictures;
