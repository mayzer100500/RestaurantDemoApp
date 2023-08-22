import { menuItems } from '../data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let orderedListArray = []
let ccnLength = 1

document.addEventListener('click', (e) => {
    if (e.target.dataset.item) {
        document.querySelector(".order-placed").style.display = 'none'
        handleAddItem(e.target.dataset.item)
    } else if (e.target.id === 'remove') {
        handleRemoveItem(e.target.dataset.remove)
    } else if (e.target.id === 'order-btn') {
        handleOrder()
    } else if ((e.target.parentElement.id !== 'payment') && (e.target.parentElement.id !== 'main')){
        document.querySelector(".payment").style.display = 'none'
    } else if (e.target.id === 'pay-btn') {
        if (validateCredentials()) {
            document.querySelector(".payment").style.display = 'none'
            document.querySelector(".order-container").style.display = 'none'
            document.querySelector(".order-placed").style.display = 'block'
            orderedListArray = []
            ccnLength = 1
        }
        }
    } 
)

document.getElementById('ccn').addEventListener('input', () => {
    if (ccnLength % 4 === 0 && ccnLength < 16) {
        ccn.value += `-`
    }
    ccnLength++
})

const handleAddItem = (itemId) => {
    orderedListArray.push(menuItems.filter(it => it.uuid === itemId)[0])
    orderedListArray = orderedListArray.map(it => {
        return {
            ...it,
            uuid: uuidv4()
        }
    })
    renderOrder(orderedListArray)
}

const handleRemoveItem = (itemId) => {
    orderedListArray = orderedListArray.filter(it => it.uuid !== itemId)
    renderOrder(orderedListArray)
}

const handleOrder = () => {
    document.querySelector(".payment").style.display = 'flex'
}

const validateCredentials = () => {
    const name = document.getElementById('name')
    document.getElementById("customer").innerText = name.value
    if (name.value === '') {
        name.style.borderColor = 'red'
        return false
    } else {
        name.style.borderColor = '#757575'
    }
    if ((ccn.value === '') || (ccn.value.length < 19)) {
        ccn.style.borderColor = 'red'
        return false
    } else {
        ccn.style.borderColor = '#757575'
    }
    if (cvv.value === '') {
        cvv.style.borderColor = 'red'
        return false
    } else {
        cvv.style.borderColor = '#757575'
    }
    return true
}

const renderMenu = () => {
    let menuList = ''
    menuItems.forEach(it => {
        menuList += `
        <div class="main-item">
            <img src="${it.img}" alt="${it.name}">
            <div class="description">
                <h3>${it.name}</h3>
                <span>${it.describtion}</span>
                <span>$${it.price}</span>
            </div>
            <div class="add" data-item="${it.uuid}">+</div>
        </div>`
    })
    document.querySelector(".main").innerHTML = menuList
}

const renderOrder = (orderArr) => {
    let orderList = ''
    let totalCheck = 0
    document.querySelector(".order-container").style.display = 'block'
    orderArr.forEach(it => {
        totalCheck += it.price
        orderList += `
        <div class="order-list-items">
            <div class="order-list-items-item">
                <span>${it.name}</span>
                <span id="remove" data-remove="${it.uuid}">remove</span>
            </div>
            <span>$${it.price}</span>
        </div>`
    })
    document.querySelector(".order-list").innerHTML = orderList
    document.getElementById("total").innerText = `$${totalCheck}`
}

renderMenu()