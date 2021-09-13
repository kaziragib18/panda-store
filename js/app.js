const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image; //debugged - images to image    
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product m-3 shadow p-3 pb-2 mb-5 bg-body rounded">
      <div class="pl-2 m-2 w-100">
    <img class="product-image" src="${image}"></img>
      </div>
      <br>
      <div id="card" class= "pb-4">
      <h3 class="text-info fs-6 fst-italic pt-2">${product.title}</h3>
      <hr>
      <p class="fs-6 text-center fw-bold">Category:<span class="text-success"> ${product.category}</p>
      <hr>
      <h2 class="fs-6 pb-2 fw-bold">Price:<span class="text-danger"> $ ${product.price}</h2>
      <hr>
      <h2 class="fs-6 pb-2 fw-bold">Rating:<span class="text-primary"> ${product.rating.rate}<span class="text-warning"> <i class="fas fa-star"></i></span>  <span class="text-dark">Reviews: <span class="text-primary">${product.rating.count}</span> <img class="p-1 mb-2" width="30px" src="image/review.svg"></h2>
      <hr>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-dark fst-italic rounded rounded-pill pl-2">Add To Cart</button>
      <button id="details-btn" class="btn btn-danger rounded rounded-pill fst-italic pl-2">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();  //debugged - updateTotal wasn't called
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element); //debugged - parseInt to parseFLoat
  return converted;
};


// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.fround(total).toFixed(2); //decimal point fix
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.fround(value).toFixed(2); //decimal point fix
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  // const price = document.getElementById('price').value;
  // console.log(price);
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2); //total decimal point fix

};
