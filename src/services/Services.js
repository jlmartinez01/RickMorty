export const RutaPrincipal = "https://rickandmortyapi.com/api/";


export const ServiceGetCharactersPerPage = (page) => {
  const url = RutaPrincipal + 'character/';
  console.log(url + '?page=' + page)
  return fetch(url + '?page=' + page,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error)
      
    })
};
