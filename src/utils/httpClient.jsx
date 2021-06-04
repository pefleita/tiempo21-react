const API_URL = "https://www.tiempo21.cu/wp-json/wp/v2/";

export function get(path) {
  return fetch(API_URL + path).then((result) => result.json());
}
