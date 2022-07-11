import './style.css'
import './reset.css'

type storeItem = {
  id: number,
  name: string,
  price: number,
  stock: number,
  inCart: number,
}

type state = {
  storeItem: storeItem[]
}


let state = {
  storeItems: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.6,
      stock: 12,
      inCart: 3,
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.35,
      stock: 10,
      inCart: 0,
    },
    {
      id: 3,
      name: 'apple',
      price: 0.3,
      stock: 60,
      inCart: 0.
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.4,
      stock: 7,
      inCart: 0.
    },
    {
      id: 5,
      name: 'avocado',
      price: 1.9,
      stock: 15,
      inCart: 2.
    },
    {
      id: 6,
      name: 'bananas',
      price: 0.25,
      stock: 40,
      inCart: 5.
    },
    {
      id: 7,
      name: 'bell-pepper',
      price: 1.1,
      stock: 9,
      inCart: 2.
    },
    {
      id: 8,
      name: 'berry',
      price: 0.75,
      stock: 14,
      inCart: 0.
    },
    {
      id: 9,
      name: 'blueberry',
      price: 1.5,
      stock: 16,
      inCart: 1.
    },
    {
      id: 10,
      name: 'eggplant',
      price: 0.6,
      stock: 9,
      inCart: 4.
    }
  ],
}


function imgPath(item) {
  let id = String(item.id).padStart(3, '0')
  return `assets/icons/${id}-${item.name}.svg`
}


function getCartItems() {
  return state.storeItems.filter(item => item.inCart > 0)
}




function increaseQuantity(item) {
  if (item.stock === 0) return

  item.inCart++
  item.stock--
}

function decreaseQuantity(item) {
  if (item.inCart > 0) {
    item.inCart--
    item.stock++
  }
}


function renderItems() {
  let storeUl = document.querySelector('.store--item-list')
  storeUl.textContent = ''

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement('li')

    let iconDiv = document.createElement('div')
    iconDiv.className = '.store--item-icon'

    let iconImg = document.createElement('img')
    iconImg.src = imgPath(item)

    let addButton = document.createElement('button')
    addButton.textContent = `Add to cart (${item.stock})`
    addButton.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    iconDiv.append(iconImg)
    storeItemEl.append(iconDiv, addButton)
    storeUl.append(storeItemEl)
  }
}

function renderCartItems() {
  let cartUl = document.querySelector('.cart--item-list')
  cartUl.textContent = ''

  let cartItems = getCartItems()

  for (let item of cartItems) {
    let cartLi = document.createElement('li')

    let itemImg = document.createElement('img')
    itemImg.className = 'cart--item-icon'
    itemImg.src = imgPath(item)
    itemImg.alt = item.name

    let itemName = document.createElement('p')
    itemName.textContent = item.name

    let removeButton = document.createElement('button')
    removeButton.className = 'quantity-btn remove-btn center'
    removeButton.textContent = '-'
    removeButton.addEventListener('click', function () {
      decreaseQuantity(item)
      render()
    })

    let spanQuantity = document.createElement('span')
    spanQuantity.className = 'quantity-text center'
    spanQuantity.textContent = String(item.inCart)

    let addButton = document.createElement('button')
    addButton.className = 'quantity-btn add-btn center'
    addButton.textContent = '+'
    addButton.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    cartLi.append(itemImg, itemName, removeButton, spanQuantity, addButton)
    cartUl.append(cartLi)
  }
}
function getTotal() {
  let total = 0
  let items = getCartItems()
  for (let item of items) {
    total += item.price * item.inCart
  }
  return total
}

function renderTotal() {
  let total = getTotal().toFixed(2)
  let totalEl = document.querySelector('.total-number')
  totalEl.textContent = `£${total}`
}

function render() {
  renderItems()
  renderCartItems()
  renderTotal()
}

render()