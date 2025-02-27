document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const productGrid = document.getElementById("productGrid");
  let products = [];

  // Function to Render Product Cards
  function renderProducts() {
      productGrid.innerHTML = "";
      products.forEach((product, index) => {
          const card = document.createElement("div");
          card.classList.add("product-card");
          card.innerHTML = `
              <h4>${product.name}</h4>
              <p>Price: $${product.price}</p>
              <p>Category: ${product.category}</p>
              <button onclick="editProduct(${index})">Edit</button>
              <button onclick="deleteProduct(${index})" class="delete">Delete</button>
          `;
          productGrid.appendChild(card);
      });
  }

  // Function to Add or Update a Product
  productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const productId = document.getElementById("productId").value;
      const name = document.getElementById("productName").value;
      const price = document.getElementById("productPrice").value;
      const category = document.getElementById("productCategory").value;

      if (productId) {
          products[productId] = { name, price, category };
      } else {
          products.push({ name, price, category });
      }

      productForm.reset();
      document.getElementById("productId").value = "";

      renderProducts();
      observeScrollAnimations();
  });

  // Function to Edit a Product
  window.editProduct = function (index) {
      const product = products[index];
      document.getElementById("productId").value = index;
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productCategory").value = product.category;
  };

  // Function to Delete a Product
  window.deleteProduct = function (index) {
      if (confirm("Are you sure you want to delete this product?")) {
          products.splice(index, 1);
          renderProducts();
      }
  };

  // Scroll Animation for Product Cards
  function observeScrollAnimations() {
      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach((card) => {
          const observer = new IntersectionObserver(
              ([entry]) => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add("visible");
                  }
              },
              { threshold: 0.2 }
          );
          observer.observe(card);
      });
  }

  observeScrollAnimations();
});

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer");

  const observer = new IntersectionObserver(
      ([entry]) => {
          if (entry.isIntersecting) {
              footer.classList.add("fade-in");
          }
      },
      { threshold: 0.1 }
  );

  observer.observe(footer);
});

