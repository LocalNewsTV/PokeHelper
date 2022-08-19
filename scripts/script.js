
const newE = (ele) => document.createElement(ele);
const getPokeData = async () => {
    try{
        const pokemon = (document.getElementById('searchBar').value).toLowerCase(); 
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const responseURL = await fetch(url);
        const response = responseURL.json();
        return response;
    } catch (ex) {
        console.log(ex);
        alert("Invalid Pokemon");
    }
}
const whoIsIt = (pokeInfo) => {
    const name = pokeInfo.name[0].toUpperCase() + pokeInfo.name.substring(1);
    $('.pokeName').html(`${name}`);
    const shiny = newE('img');
    const reg = newE('img');
    $(shiny).addClass('shinyFront');
    $(reg).addClass('defaultFront');
    $(shiny).attr('src', pokeInfo.sprites.front_shiny);
    $(reg).attr('src', pokeInfo.sprites.front_default);
    $('.imgCont').html('');
    $('.imgCont').append(reg, shiny);
}
const gatherType = (pokeInfo) => {
    const pokeTypes = []; 
    for(const type in pokeInfo.types){
        pokeTypes.push(pokeInfo.types[type].type.name);
    }
    return pokeTypes;
}
const typeMatching = (pokeTypes) => {
    const pokeWeakness = [];
    pokeTypes.forEach(item => {
        pokeWeakness.push(...pokeTyping[item].weakAgainst)
    })
    return [...new Set(pokeWeakness)];
}
const showData = (weaknesses) => {
    $('.weakness').html('');
    $('.weakBanner').html('They are weak to:')
    weaknesses.forEach(item => {
        const cont = newE('div');
        $(cont).addClass('typeCard')
        $(cont).css('background-color', pokeTyping[item.toLowerCase()].color);
        $(cont).html(item);
        $('.weakness').append(cont);
    });
}
const searchPokeMain = async () => {
    const pokeInfo = await getPokeData();
    console.log(pokeInfo)
    whoIsIt(pokeInfo);
    const pokeTypes = gatherType(pokeInfo);
    const weaknesses = typeMatching(pokeTypes);
    showData(weaknesses);
}
$('#searchBar').on('submit', searchPokeMain);
$('#searchBar').on('keypress', (e)=>{
    if(e.key === 'Enter')
        searchPokeMain();
})
$('#manualMode').toggle();
$('.toggleType').on('click', ()=>{$('#searchMode, #manualMode').toggle()});