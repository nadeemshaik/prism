import axios from 'axios';

export const fetchAssets = () => {
  return axios.get('http://localhost:4000/assets')
    .then(response => {
      return response.data.images;
    })
    .catch(error => {
      console.log('Fetching assets failed ' + error);
    });
};
