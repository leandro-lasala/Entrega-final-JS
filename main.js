const products = [
  // Mug
  {
    id: 1,
    name: "Bud",
    price: 3599,
    description:
      "Handmade ceramic mug with blue glaze. Perfect for coffee or tea.",
    category: "Mug",
    image: "./products_img/cup_bud.jpg",
    stock: 30,
  },
  {
    id: 2,
    name: "Enchanter",
    price: 4199,
    description:
      "Ceramic mug with floral pattern in pastel colors. Ideal for gifts.",
    category: "Mug",
    image: "./products_img/cup_enchanter.jpg",
    stock: 20,
  },
  {
    id: 3,
    name: "Flowers",
    price: 3299,
    description: "Simple and elegant white ceramic mug. Microwave safe.",
    category: "Mug",
    image: "./products_img/cup_flowers.jpg",
    stock: 25,
  },
  {
    id: 4,
    name: "Hearts",
    price: 3799,
    description:
      "Black ceramic mug with a matte finish. Ideal for hot beverages.",
    category: "Mug",
    image: "./products_img/cup_hearts.jpg",
    stock: 15,
  },
  {
    id: 5,
    name: "Mashroom",
    price: 3899,
    description: "Vintage-style mug decorated with 1960s patterns.",
    category: "Mug",
    image: "./products_img/cup_mashroom.jpg",
    stock: 10,
  },
  {
    id: 6,
    name: "Star",
    price: 3999,
    description: "Ceramic mug with motivational quotes in various colors.",
    category: "Mug",
    image: "./products_img/cup_star.jpg",
    stock: 18,
  },
  {
    id: 7,
    name: "TikTakToe Heart",
    price: 4299,
    description:
      "Ceramic mug that can be personalized with your name or favorite phrase.",
    category: "Mug",
    image: "./products_img/cup_tiktaktoe_heart.jpg",
    stock: 12,
  },

  // Plate
  {
    id: 8,
    name: "Flower blue",
    price: 5499,
    description:
      "Rustic ceramic plate with a matte finish. Ideal for meals and decorations.",
    category: "Plate",
    image: "./products_img/plate_flower_blue.jpg",
    stock: 15,
  },
  {
    id: 9,
    name: "Flower yellow",
    price: 6100,
    description:
      "Handmade ceramic plate with white glaze. Elegant and durable.",
    category: "Plate",
    image: "./products_img/plate_flower_yellow.jpg",
    stock: 10,
  },
  {
    id: 10,
    name: "Blue flowers",
    price: 6200,
    description:
      "Decorative ceramic plate with blue details, perfect for decoration.",
    category: "Plate",
    image: "./products_img/plate_flowers_blue.jpg",
    stock: 12,
  },
  {
    id: 11,
    name: "Flowers loop",
    price: 5899,
    description: "Wide and shallow ceramic plate, ideal for salads and pasta.",
    category: "Plate",
    image: "./products_img/plate_flowers_loop.jpg",
    stock: 20,
  },
  {
    id: 12,
    name: "Flowers",
    price: 6599,
    description: "Elegant ceramic plate with a gold rim for special occasions.",
    category: "Plate",
    image: "./products_img/plate_flowers.jpg",
    stock: 8,
  },
  {
    id: 13,
    name: "Pear",
    price: 5700,
    description:
      "Artisan ceramic plate with a green finish. Ideal for main courses.",
    category: "Plate",
    image: "./products_img/plate_pear.jpg",
    stock: 14,
  },
  {
    id: 14,
    name: "Strawberry",
    price: 6400,
    description:
      "Ceramic plate decorated with geometric patterns. Perfect for home decor.",
    category: "Plate",
    image: "./products_img/plate_strawberry.jpg",
    stock: 16,
  },
];

const productsContainer = document.querySelector(".cards_products");
const cartModal = document.getElementById("cartModal");
const cartItem = document.querySelector(".cart-items");
const subtotalElement = document.querySelector(".cart-footer span");
console.log(subtotalElement);
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Mostrar/Ocultar carrito
function toggleCart() {
  cartModal.classList.toggle("active");
}

// Renderizar un producto del carrito
const renderCartProduct = (product) => {
  return `
    <div class="cart-item">
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-item-info">
        <h4>${product.name} <span>x${product.quantity}</span></h4>
        <p>$${product.price * product.quantity}</p>
      </div>
      <button class="remove-item" data-id="${product.id}">✕</button>
    </div>
  `;
};

// Renderizar todos los productos del carrito
const renderCart = () => {
  if (cart.length === 0) {
    cartItem.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    cartItem.innerHTML = cart.map(renderCartProduct).join("");
  }
};

// Agregar producto al carrito
const addToCart = (e) => {
  if (e.target.classList.contains("addcard_button")) {
    const productName =
      e.target.parentElement.previousElementSibling.children[1].textContent;
    const product = products.find((p) => p.name === productName);

    if (product) {
      const existingProduct = cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      saveCart();
      renderCart();
      calculateSubtotal();
      updateCartCount();
    }
  }
};

const deleteProduct = (e) => {
  if (e.target.classList.contains("remove-item")) {
    const productId = parseInt(e.target.dataset.id);
    const productIndex = cart.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        cart.splice(productIndex, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      saveCart();
      renderCart();
      calculateSubtotal();
      updateCartCount();
    }
  }
};

const updateCartCount = () => {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const contador = document.querySelector("#cart-count");
  if (contador) contador.textContent = count;
};

// ******************Finalizar compra*******************
const checkout = () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra!");
  cart.length = 0; // Vacía el carrito
  saveCart();
  renderCart();
  calculateSubtotal();
  updateCartCount();
};

// Calcular y mostrar el subtotal
const calculateSubtotal = () => {
  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  subtotalElement.innerHTML = `<span>$${subtotal}</span>`;
};

// **********************Renderizar productos************************
const imgProducts = (product) => {
  return `
    <div class="card"> 
      <img src="${product.image}" alt="${product.name}" />
      <div class="card_names_p">
        <div class="card_names">
          <h3>${product.category}</h3>
          <h4>${product.name}</h4>
        </div>
        <div class="card_p">
          <p>$${product.price}</p>
          <button class="addcard_button">Add to cart</button>
        </div>
      </div>
    </div>`;
};

const renderProducts = (products) => {
  productsContainer.innerHTML += products.map(imgProducts).join("");
};

// ************FILTROS*************
const filterButtons = document.querySelectorAll(".filter_buttons button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("button_active"));
    btn.classList.add("button_active");

    const category = btn.dataset.category;
    productsContainer.innerHTML = "";

    if (category === "All") {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      renderProducts(filteredProducts);
    }
  });
});

// Inicializar la página
const init = () => {
  renderProducts(products);
  renderCart(); // Renderizar los productos
  document.querySelector(".cart-icon").addEventListener("click", toggleCart); // Botón de carrito
  productsContainer.addEventListener("click", addToCart); // Detectar clic en "Agregar al carrito"
  cartItem.addEventListener("click", deleteProduct); // Detectar clic en "Eliminar del carrito"
  document.getElementById("checkout-btn").addEventListener("click", checkout);
  calculateSubtotal(); // Calcular el subtotal
  updateCartCount(); // Actualizar el contador del carrito
};

init();
