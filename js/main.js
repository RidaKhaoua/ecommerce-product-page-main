// get icon cart
const iconCart = document.querySelector(".navbar .cart-profile .icon-cart img");

// get cart
const cart = document.querySelector(".navbar .cart-profile .icon-cart .cart");

// get small image
const smallImages = [
  ...document.querySelectorAll(".products .small-images .image"),
];

//  small images of show-full-products
const smallImagesOfShowFullProducts = [
  ...document.querySelectorAll(
    ".products .show-full-products .small-images .image"
  ),
];

// get show message no product in cart
const noProductInCart = document.querySelector(".navbar .cart-profile p");

// elemet content products
const product = document.querySelector(".navbar  .cart-profile .product");

// number of products in product content
const numberProducts = document.querySelector(
  ".navbar .cart-profile .number-products"
);

// get image of product
const imageProduct = document.querySelector(".products .big-image");

// get button close to close show full page
const btnClose = document.querySelector(".products  .close");

// get button next
const btnNext = document.querySelectorAll(".products  .next img");

// get button previous
const btnPrevisouse = document.querySelectorAll(".products  .previous img");

// get button increment
const btnIncrement = document.querySelector(
  ".products .product-info .buttons .increment"
);

// get button decrement
const btnDecrement = document.querySelector(
  ".products .product-info .buttons .decrement"
);

// get buttons add products
const btnAddProduct = document.querySelector(
  ".products .product-info .add-to-card "
);

// get btn checkout
const btnCheckout = document.querySelector(".cart-profile .btn-checkout");

// set index
let index = 0;

// set variable to store Images of show full products
let bigImagesOfShowFullProducts;

// get quantity
const quantity = document.querySelector(
  ".products .product-info .buttons span.quantity "
);

// events

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    btnCheckout.classList.add("hidden");
    noProductInCart.classList.add("active");
    numberProducts.textContent = product.children.length;
  }
});

btnAddProduct.addEventListener("click", function (params) {
  addProductToCart();
});

function addProductToCart(params) {
  if (+quantity.textContent != 0) {
    product.innerHTML += `
                  <div class="content-product d-flex  justify-content-between align-items-center mb-3">
                    <img src="images/image-product-1-thumbnail.jpg" alt="">
                    <div class="content-info">
                      <div class="title">Fall Limited Edition Sneakrs</div>
                      <div class="price-info">
                        <span class="price-quantity">$125.00 x${
                          quantity.textContent
                        }</span>
                        <span class="total">$${
                          125.0 * +quantity.textContent
                        }.00</span>
                      </div>
                    </div>
                    <i class="delete fa-regular fa-trash-can p-3"></i>
                  </div>
                  
                
 `;

    noProductInCart.classList.remove("active");

    btnCheckout.classList.remove("hidden");
    numberProducts.textContent = product.children.length;
  } else {
    alert("you should choose the quantity");
  }
}

btnClose.addEventListener("click", function (params) {
  closeShowFullProductPage();
});

iconCart.addEventListener("click", function (e) {
  showCart();
});

smallImages.forEach((image) => {
  image.addEventListener("click", showImage);
});

smallImagesOfShowFullProducts.forEach((image) => {
  image.addEventListener("click", showImage);
});

imageProduct.addEventListener("click", function (params) {
  // check size of window
  if (document.documentElement.clientWidth > 566) {
    const bigImages = document.querySelectorAll(
      ".products .show-full-products .content-image .images img"
    );
    document
      .querySelector(".products .show-full-products")
      .classList.add("active");

    document
      .querySelector(
        ".products .show-full-products .content-image .images img.active"
      )
      .classList.remove("active");

    bigImages[index].classList.add("active");
  }
});

btnNext.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const parentClass = checkParent(e.target);
    next(parentClass);
  });
});

btnIncrement.addEventListener("click", function (params) {
  incrementQuantity();
});

btnDecrement.addEventListener("click", function (params) {
  decrementQuantity();
});

function incrementQuantity(params) {
  quantity.textContent = +quantity.textContent + 1;
}

function decrementQuantity(params) {
  +quantity.textContent > 0
    ? (quantity.textContent = +quantity.textContent - 1)
    : "";
}

function next(parentClass) {
  bigImagesOfShowFullProducts = [
    ...document.querySelectorAll(
      `.products ${parentClass}  .big-image .content-image .images  img`
    ),
  ];

  if (index < bigImagesOfShowFullProducts.length - 1) {
    index += 1;
    document
      .querySelector(
        `.products ${parentClass} .content-image .images img.active`
      )
      .classList.remove("active");
    bigImagesOfShowFullProducts[index].classList.add("active");
  }
}

btnPrevisouse.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const parentClass = checkParent(e.target);
    previous(parentClass);
  });
});

function previous(parentClass) {
  bigImagesOfShowFullProducts = [
    ...document.querySelectorAll(
      `.products ${parentClass}  .big-image .content-image .images  img`
    ),
  ];

  if (index > 0) {
    index -= 1;
    document
      .querySelector(
        `.products  ${parentClass}  .content-image .images img.active`
      )
      .classList.remove("active");

    bigImagesOfShowFullProducts[index].classList.add("active");
  }
}

// functions

function checkParent(element) {
  let className = "";
  if (
    element.parentElement.parentElement.parentElement.classList.contains(
      "show-full-products"
    )
  ) {
    className = ".show-full-products";
  } else {
    className = ".show-products";
  }
  return className;
}

function showCart() {
  cart.classList.toggle("hidden");
  setTimeout(() => {
    cart.classList.toggle("active");
  }, 500);
}

function showImage(e) {
  const parentClass = checkParent(e.target);

  // get image inside content small-image  has class active and remove it
  document
    .querySelector(`${parentClass} .small-images .image.active`)
    .classList.remove("active");
  e.target.parentElement.classList.add("active");

  // get image inside content image has class active and remove it
  document
    .querySelector(`.products ${parentClass} .content-image .images img.active`)
    .classList.remove("active");

  // get image has class with same value in dataset
  document
    .querySelector(
      `.products ${parentClass} .content-image .${e.target.dataset.img}`
    )
    .classList.add("active");

  // when you click on the image to shwo image you need to
  // remberer index bceause when you need to navigate between
  // images with button next or previous you need the current index not start from 0
  rememberIndex(e.target, parentClass);
}

function rememberIndex(element, parentClass) {
  // get images with specific parent class
  bigImagesOfShowFullProducts = [
    ...document.querySelectorAll(
      `.products ${parentClass}  .big-image .content-image .images img`
    ),
  ];
  // set current index of the image
  for (let img of bigImagesOfShowFullProducts) {
    if (img.classList.contains(element.dataset.img)) {
      index = bigImagesOfShowFullProducts.indexOf(img);
    }
  }
}

function closeShowFullProductPage() {
  //hidde show full products
  document
    .querySelector(".products .show-full-products")
    .classList.remove("active");

  // remove class active from img inside content image
  document
    .querySelector(
      ".products .show-full-products .content-image .images img.active"
    )
    .classList.remove("active");

  // when you close the show full products reset to first img and show it
  document
    .querySelector(".products .show-full-products .content-image .images img")
    .classList.add("active");

  document
    .querySelector(".products .show-full-products .small-images .image.active")
    .classList.remove("active");

  document
    .querySelector(".products .show-full-products .small-images .image")
    .classList.add("active");
}
