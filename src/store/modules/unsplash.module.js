import unsplashService from "../../services/unsplash.service.js";

const unsplashInitialState = {
  randomPhoto: {},
  suggestions: {},
  photos: [],
  modalPhoto: {},
};

export const unsplash = {
  namespaced: true,
  state: unsplashInitialState,
  actions: {
    getRandomPhoto({ commit }) {
      return unsplashService
        .getRandomPhoto()
        .then(
          (randomPhoto) => {
            commit("getRandomPhotoSuccess", randomPhoto);
            return Promise.resolve(randomPhoto);
          },
          (error) => {
            commit("getRandomPhotoFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateRandomPhotoErrorMsg", errorMsg);
        });
    },

    getSuggestions({ commit }, query) {
      return unsplashService
        .getSuggestions(query)
        .then(
          (suggestions) => {
            commit("getSuggestionsSuccess", suggestions);
            return Promise.resolve(suggestions);
          },
          (error) => {
            commit("getSuggestionsFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateSuggestionsErrorMsg", errorMsg);
        });
    },

    getPhotos({ commit }, params) {
      return unsplashService
        .getPhotos(params)
        .then(
          (photos) => {
            commit("getPhotosSuccess", photos);
            return Promise.resolve(photos);
          },
          (error) => {
            commit("getPhotosFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updatePhotosErrorMsg", errorMsg);
        });
    },

    modalPhoto({ commit }, photo) {
      return commit("modalPhotoSuccess", photo);
    },
  },
  mutations: {
    getRandomPhotoSuccess(state, randomPhoto) {
      state.randomPhoto = randomPhoto.response[0];
    },

    getRandomPhotoFailure(state) {
      state.randomPhoto = null;
    },

    getSuggestionsSuccess(state, suggestions) {
      state.suggestions = suggestions.data.autocomplete;
    },

    getSuggestionsFailure(state) {
      state.suggestions = null;
    },

    getPhotosSuccess(state, photos) {
      state.photos = photos.response.results;
    },

    getPhotosFailure(state) {
      state.photos = null;
    },

    modalPhotoSuccess(state, photo) {
      state.modalPhoto = photo;
    },
  },
  getters: {
    randomPhoto: (state) => {
      return state.randomPhoto && state.randomPhoto;
    },
    suggestions: (state) => {
      return state.suggestions && state.suggestions;
    },
    photos: (state) => {
      return state.photos && state.photos;
    },
    modalPhoto: (state) => {
      return state.modalPhoto && state.modalPhoto;
    },
  },
};
