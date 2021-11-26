import axios from "axios";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.VUE_APP_API_ACCESS_KEY,
});

class UnsplashService {
  getRandomPhoto() {
    return unsplash.photos.getRandom({
      count: 1,
    });
  }

  getSuggestions(query) {
    return axios.get(`${process.env.VUE_APP_API_AUTOCOMPLETE_URL}/${query}`);
  }

  getPhotos(params) {
    return unsplash.search.getPhotos({
      query: params.query,
      page: params.page,
      perPage: 20,
    });
  }
}
export default new UnsplashService();
