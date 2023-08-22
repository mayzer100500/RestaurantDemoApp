import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuItems = [
    {
        name: 'Pizza',
        describtion: 'pepperoni, mushrom, mozarella',
        img: './images/pizza.png',
        price: 14,
        uuid: uuidv4()
    },
    {
        name: 'Hamburger',
        describtion: 'beef, cheese, lettuce',
        img: "./images/hamburger.png",
        price: 12,
        uuid: uuidv4()
    },   
    {
        name: 'Beer',
        describtion: 'grain, hops, yeast, water',
        img: './images/beer.png',
        price: 12,
        uuid: uuidv4()
    }
]