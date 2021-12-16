if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}
function ready() {

	var removeCartItemBtns = document.getElementsByClassName('btn-danger')
	for (var i = 0; i < removeCartItemBtns.length; i++) {
		var button = removeCartItemBtns[i]
		button.addEventListener('click', removeCartItem)
	}
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i = 0; i < removeCartItemBtns.length; i++) {
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChange)
	}
	var addToCartBtns = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartBtns.length; i++) {
		var button = addToCartBtns[i]
		button.addEventListener('click', addToCartClicked)
	}
	document.getElementsByClassName('btn-purchase')[0]
		.addEventListener('click', purchaseClicked)
}
function purchaseClicked() {
	alert('Thank you for your purchase')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}
function addToCartClicked(e) {
	var button = e.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var img = shopItem.getElementsByClassName('shop-item-image')[0].src
	addItemToCart(title, price, img)
}
const addItemToCart = (title, price, img) => {
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert('This item is already added to the cart')
			return
		}
	}
	var cartRowContents = `
	
		<div class="cart-item cart-column">
		<img class="cart-item-image" src="${img}" width="100" height="100">
		<span class="cart-item-title">${title}</span>
	</div>
	<span class="cart-price cart-column">${price}</span>
	<div class="cart-quantity cart-column">
		<input class="cart-quantity-input" type="number" value="2">
		<button class="btn btn-danger" type="button">REMOVE</button>
	</div>
	`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener
		('change', quantityChange)
}
function quantityChange(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}
function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}
function updateCartTotal() {
	var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
	var cartRow = cartItemsContainer.getElementsByClassName('cart-row')
	var total = 0
	for (var i = 0; i < cartRow.length; i++) {
		var cartRow = cartRow[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0]
		.innerText = '$' + total

}