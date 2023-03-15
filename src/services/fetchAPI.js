import axios from 'axios';

const API_KEY = '32106886-cb1cc02bd30eab36270ed5df7';

const searchPictures = async (query, page) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: page,
      q: query,
    },
  });
  return response.data;
};

export default searchPictures;

// const instance = axios.create({
//     baseURL: 'https://pixabay.com/api/',
//     params: {
//         key: API_KEY,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         per_page: '12',
//     },
// });

// export const searchPictures = async (q, page) => {
//     const response  = await instance.get('/', {
//         params: {
//             q,
//             page
//         },
//     });
//     return response.data;
// };
