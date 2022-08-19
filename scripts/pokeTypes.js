const pokeTyping = {
    bug: {
        color: '#A6B91A',
        offense: {
            supereffective: ['Dark', 'Grass', 'Psychic'],
            halfDamage: ['Fighting', 'Fire', 'Flying', 'Ghost', 'Poison', 'Steel'],
        },
        defense: {
            supereffective: ['Fire', 'Flying', 'Rock'],
            halfDamage: ['Grass', 'Fighting', 'Ground'],
            immune: [],
        },
    },
    dark: {
        color: '#705746',
        offense: {
            supereffective: ['Ghost', 'Psychic'],
            halfDamage: ['Dark', 'Fairy', 'Fighting'],
        },
        defense: {
            supereffective: ['Bug', 'Fairy', 'Fighting'],
            halfDamage: ['Dark', 'Ghost'],
            immune: ['Psychic'],
        },
    },
    dragon: {
        color: '#6F35FC',
        offense: {
            supereffective: ['Dragon'],
            halfDamage: ['Steel'],
        },
        defense: {
            supereffective: ['Dragon', 'Fairy', 'Ice'],
            halfDamage: ['Fire', 'Water', 'Electric', 'Grass'],
            immune: [],
        },
    },
    electric: {
        color: '#F7D02C',
        offense: {
            supereffective: ['Flying', 'Water'],
            halfDamage: ['Dragon', 'Electric', 'Grass'],
        },
        defense: {
            supereffective: ['Ground'],
            halfDamage: ['Electric', 'Flying', 'Steel'],
            immune: [],
        },
    },
    fairy: {
        color: '#D685AD',
        offense: {
            supereffective: ['Dark', 'Dragon', 'Fighting'],
            halfDamage: ['Dragon', 'Electric', 'Grass'],
        },
        defense: {
            supereffective: ['Poison', 'Steel'],
            halfDamage: ['Fighting', 'Bug', 'Dark'],
            immune: ['Dragon'],
        },
    },
    fighting: {
        color: '#C22E28',
        offense: {
            supereffective: ['Dark', 'Ice', 'Normal', 'Rock', 'Steel'],
            halfDamage: ['Bug', 'Fairy', 'Flying', 'Poison', 'Psychic'],
        },
        defense: {
            supereffective: ['Fairy', 'Flying', 'Psychic'],
            halfDamage: ['Bug', 'Rock', 'Dark'],
            immune: [],
        },
    },
    fire: {
        color: '#EE8130',
        offense: {
            supereffective: ['Bug', 'Grass', 'Ice', 'Steel'],
            halfDamage: ['Dragon', 'Fire', 'Rock', 'Water'],
        },
        defense: {
            supereffective: ['Ground', 'Rock', 'Water'],
            halfDamage: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
            immune: [],
        },
    },
    flying: {
        color: '#A98FF3',
        offense: {
            supereffective: ['Bug', 'Fighting', 'Grass'],
            halfDamage: ['Electric', 'Rock', 'Steel'],
        },
        defense: {
            supereffective: ['Electric', 'Ice', 'Rock'],
            halfDamage: ['Grass', 'Fighting', 'Bug'],
            immune: ['Ground'],
        },
    },
    ghost: {
        color: '#735797',
        offense: {
            supereffective: ['Ghost', 'Psychic'],
            halfDamage: ['Dark'],
        },
        defense: {
            supereffective: ['Dark','Ghost'],
            halfDamage: ['Poison', 'Bug'],
            immune: ['Normal', 'Fighting'],
        },
    },
    grass: {
        color: '#7AC74C',
        offense: {
            supereffective: ['Ground', 'Rock', 'Water'],
            halfDamage: ['Bug', 'Fire', 'Flying', 'Grass', 'Poison', 'Steel'],
        },
        defense: {
            supereffective: ['Bug', 'Fire', 'Flying', 'Ice', 'Poison'],
            halfDamage: ['Water', 'Electric', 'Grass', 'Ground'],
            immune: [],
        },
    },
    ground: {
        color: '#E2BF65',
        offense: {
            supereffective: ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'],
            halfDamage: ['Bug', 'Grass'],
        },
        defense: {
            supereffective: ['Grass', 'Ice', 'Water'],
            halfDamage: ['Poison', 'Ground'],
            immune: ['Electric'],
        },
    },
    ice: {
        color: '#96D9D6',
        offense: {
            supereffective: ['Dragon', 'Flying', 'Grass', 'Ground'],
            halfDamage: ['Fire', 'Ice', 'Steel', 'Water'],
        },
        defense: {
            supereffective: ['Fighting', 'Fire', 'Rock', 'Steel'],
            halfDamage: ['Ice'],
            immune: [],
        },

    },
    normal: {
        color: '#A8A77A',
        offense: {
            supereffective: [],
            halfDamage: ['Rock', 'Steel'],
        },
        defense: {
            supereffective: ['Fighting'],
            halfDamage: [],
            immune: ['Ghost'],
        },
    },
    poison: {
        color: '#A33EA1',
        offense: {
            supereffective: ['Fairy', 'Grass'],
            halfDamage: ['Poison', 'Ghost', 'Ground', 'Rock'],
        },
        defense: {
            supereffective: ['Ground', 'Psychic'],
            halfDamage: ['Grass', 'Fighting', 'Ghost', 'Bug', 'Fairy'],
            immune: [],
        },
    },
    psychic: {
        color: '#F95587',
        offense: {
            supereffective: ['Fighting', 'Poison'],
            halfDamage: ['Steel', 'Psychic'],
        },
        defense: {
            supereffective: ['Bug', 'Dark', 'Ghost'],
            halfDamage: ['Fighting', 'Psychic'],
            immune: [],
        },
    },
    rock: {
        color: '#B6A136',
        offense: {
            supereffective: ['Bug', 'Fire', 'Flying', 'Ice'],
            halfDamage: ['Fighting', 'Ground', 'Steel'],
        },
        defense: {
            supereffective: ['Fighting', 'Grass', 'Ground', 'Steel', 'Water'],
            halfDamage: ['Normal', 'Fire', 'Ghost', 'Flying'],
            immune: [],
        },
    },
    steel: {
        color: '#B7B7CE',
        offense: {
            supereffective: ['Fairy', 'Ice', 'Rock'],
            halfDamage: ['Electric', 'Fire', 'Steel', 'Water'],
        },
        defense: {
            supereffective: ['Fighting', 'Fire', 'Ground'],
            halfDamage: ['Normal', 'Grass', 'Ice', 'Flying', 'Psychic', 'Bug', 'Rock', 'Dragon', 'Steel', 'Fairy'],
            immune: ['Poison'],
        },
    },
    water: {
        color: '#6390F0',
        offense: {
            supereffective: ['Fire', 'Ground', 'Rock'],
            halfDamage: ['Dragon', 'Grass', 'Water'],
        },
        defense: {
            supereffective: ['Electric', 'Grass'],
            halfDamage: ['Fire', 'Water', 'Ice', 'Steel'],
            immune: [],
        },
    },
}