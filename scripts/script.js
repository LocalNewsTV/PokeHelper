
const newE = (ele) => document.createElement(ele);
/**
 * @description - pulls pokemon data from the PokeAPI, checks value of input from the searchbar. 
 * @returns - api data from pokeApi
 */
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

/**
 * 
 * @param {Array} pokeTypes - Array of 1-2 pokemon types either manually searched for, or from the pokemon object
 * @param {Array} pokeWeaknesses - raw list of all weaknesses related to the PokeTypes 
 * @returns {Array} - updated Array holding proper weaknesses of pokemon
 * @description - Takes list of Pokemon Types and Weaknesses, compares for discrepancies that would negate a weakness (Two type pokemon) and returns an updated array
 */
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
/**
 * @param {String} warning - String for error messages to post
 * @description - empties pokemon fields when an invalid pokemon is selected and displays the warning 
 */
const notAPokeMon = (warning = 'Invalid Pokemon Requested') => {
    $('.weakness, .weakBanner, .imgCont').html('');
    $('.pokeName').html(warning)
}
/**
 * 
 * @param {Object} pokeInfo - Object holding data from PokeAPI
 * @description - Adds all the information pertaining to the searched pokemon, to the DOM
 */
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
/**
 * @param {Object} pokeInfo - Object holding data from PokeAPI
 * @returns array of pokemon types
 * @description - Parses through the PokeAPI information, and appends the types from the searched pokemon
 */
const gatherType = (pokeInfo) => {
    const pokeTypes = []; 
    for(const type in pokeInfo.types){
        pokeTypes.push(pokeInfo.types[type].type.name);
    }
    return pokeTypes;
}
/**
 * @param {Array} pokeTypes - Array of Pokemon's Types  
 * @returns Array of unique weaknesses
 * @description - gathers all the Typing that is super effective against the searched pokemons types. then filters duplicate data from the Array 
 */
const typeMatching = (pokeTypes) => {
    const pokeWeakness = [];
    pokeTypes.forEach(item => {
        pokeWeakness.push(...pokeTyping[item].defense.supereffective)
    })
    return [...new Set(pokeWeakness)];
}
/**
 * 
 * @param {Array} typesListed - an Array of pokemon Types
 * @param {String} target - location on the DOM to append the element to 
 * @description - for each element in the array, it appends divs with matching colors to the type
 */
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
/**
 * @description - For use with the manual typing search, pulls the selection from both select elements then runs the data through. Also resets the innerHTML on all elements pertaining to the Pokemon search
 */
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
/**
 * @description - the course of action for the pokemon search functioning
 * If pokemon is invalid, it calls notAPokemon() else it runs thr course
 */
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
/**
 * @description - Takes all the Key values from the pokeTyping object, and appends them as options to the select bars
 */
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