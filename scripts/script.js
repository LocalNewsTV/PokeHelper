const getPokeData = async () => {
    try{
        const pokemon = document.getElementById('searchBar').value; 
        const url = `https://pokeapi.co/api/v2/pokemon/name`;
        const responseURL = await fetch(url);
        response = responseURL.json();
        return response;
    } catch (ex) {
        console.log(ex);
        alert("Invalid Pokemon");
    }
}
