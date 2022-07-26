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

export const ServiceGetCharactersPerText = (name) => {
  const url = RutaPrincipal + 'character/';
  console.log(url + '?name=' + name)
  return fetch(url + '?name=' + name,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error)
      
    })
};
