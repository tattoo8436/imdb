import axios from "axios";
import { BASE_URL_API } from "../utils";

export const movieApi = {
  searchMovie: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie/search`, payload);
  },
  getMovieById: (id: any) => {
    return axios.get(`${BASE_URL_API}/movie?id=${id}`);
  },
  searchGenre: (payload: any) => {
    return axios.post(`${BASE_URL_API}/genre/search`, payload);
  },
  comment: (payload: any) => {
    return axios.post(`${BASE_URL_API}/comment`, payload);
  },
  ratingMovie: (payload: any) => {
    return axios.post(`${BASE_URL_API}/rating/movie`, payload);
  },
  ratingEpisode: (payload: any) => {
    return axios.post(`${BASE_URL_API}/rating/episode`, payload);
  },
  getRatingMovieByAccount: (payload: any) => {
    return axios.post(`${BASE_URL_API}/rating/movie/get-by-account`, payload);
  },
  getRatingEpisodeByAccount: (payload: any) => {
    return axios.post(`${BASE_URL_API}/rating/episode/get-by-account`, payload);
  },
  getActorById: (id: any) => {
    return axios.get(`${BASE_URL_API}/actor?id=${id}`);
  },
  getDirectorById: (id: any) => {
    return axios.get(`${BASE_URL_API}/director?id=${id}`);
  },
  getListMoviesByActor: (actorId: any) => {
    return axios.get(`${BASE_URL_API}/actor/movie?actorId=${actorId}`);
  },
  getListMoviesByDirector: (directorId: any) => {
    return axios.get(`${BASE_URL_API}/director/movie?directorId=${directorId}`);
  },
  getEpisodeById: (id: any) => {
    return axios.get(`${BASE_URL_API}/episode?id=${id}`);
  },
  getTrendingMovie: () => {
    return axios.get(`${BASE_URL_API}/movie/trending`);
  },
  getListMoviesSimilar: (id: any) => {
    return axios.get(`${BASE_URL_API}/movie/similar?id=${id}`);
  },
};
