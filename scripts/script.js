
const newE = (ele) => document.createElement(ele);
const getPokeData = async () => {
    try{
        const pokemon = ($('#searchBar').val()).toLowerCase();            
        if(pokemon.valueOf() == new String('shaymin').valueOf()){
            notAPokeMon('Did you mean Shaymin-land or Shaymin-Sky?')
            return;
        }
        else if(pokemon.valueOf() === new String('').valueOf()){
            notAPokeMon('Field Cannot be Blank');
            return;
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const responseURL = await fetch(url);
        const response = responseURL.json();
        if(responseURL.status === 404){
            notAPokeMon();
        }
        return response;
    } catch (ex) {
        alert("Invalid response");
    }
}
const eliminateStrengths = (pokeTypes, pokeWeaknesses) => {
    const allStrengths = [];
    for(const type in pokeTypes){
            allStrengths.push(...pokeTyping[pokeTypes[type]].defense.halfDamage);
            allStrengths.push(...pokeTyping[pokeTypes[type]].defense.immune)
    }
    const filteredItems = pokeWeaknesses.filter((value) => {
        if(!allStrengths.includes(value)){
            return value;
        }
    }) 
    return filteredItems;
}

const notAPokeMon = (warning = 'Invalid Pokemon Requested') => {
    $('.weakness, .weakBanner, .imgCont').html('');
    $('.pokeName').html(warning)
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
    const pokeType = gatherType(pokeInfo);
    showData(pokeType, 'pokeTyping');
    
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
        pokeWeakness.push(...pokeTyping[item].defense.supereffective)
    })
    return [...new Set(pokeWeakness)];
}
const showData = (typesListed, target) => {
    $(`.${target}`).html('');
    $('.weakBanner').html('They are weak to:')
    typesListed.forEach(item => {
        const cont = newE('div');
        $(cont).addClass('typeCard')
        $(cont).css('background-color', pokeTyping[item.toLowerCase()].color);
        $(cont).html(item);
        $(`.${target}`).append(cont);
    });
}
const manualMain = () => {
    const first = $('#typeOne').val(); 
    const second = $('#typeTwo').val();
    const searchTypes = []
    if(first.valueOf() != new String('none').valueOf()){
        searchTypes.push(first);
    }
    if(second.valueOf() != new String('none').valueOf()){
        searchTypes.push(second);
    }
    const weaknesses = typeMatching(searchTypes)
    $('.weakness, .pokeName, .pokeTyping, .types, .weakBanner, .imgCont').html('');
    const finalList = eliminateStrengths(searchTypes, weaknesses)
    showData(finalList, 'weakness')
}
const searchPokeMain = async () => {
    const pokeInfo = await getPokeData();
    if(pokeInfo.valueOf() === new String('no').valueOf()){
        notAPokeMon()
    } else {
        whoIsIt(pokeInfo);
        const pokeTypes = gatherType(pokeInfo);
        const weaknesses = typeMatching(pokeTypes);
        const finalWeakness = eliminateStrengths(pokeTypes, weaknesses)
        showData(finalWeakness, 'weakness');
    }
}
const fillOptions = () => {
    const typesList = Object.keys(pokeTyping);
    for(const types in typesList){
        const type = newE('option');
        type.value = typesList[types];
        $(type).html(typesList[types]);
        $('#typeOne, #typeTwo').append(type);
    }
}
$(document).ready(() => {
    fillOptions();
})

$('#searchBarButt').on('click', searchPokeMain);
$('#searchBar').on('keypress', (e)=>{
    if(e.key === 'Enter')
        searchPokeMain();
})
$('#manualButt').click(manualMain)
$('#manualMode').toggle();
$('.toggleType').on('click', ()=>{$('#searchMode, #manualMode').toggle()});