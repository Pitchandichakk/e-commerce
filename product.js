 // 2nd method
 let allProducts  =[];
 console.log(allProducts);
 
 
 fetch('https://fakestoreapi.com/products')
 
 .then(res => res.json()) 
 .then((products) => {
     console.log(products);
     
     
     allProducts = products;
   
     
     
     if(products.length > 0){
         allProducts.push(products);
         displayItems(products); 
     }else{
         console.log("the data length is not greater than zero");
         
     }
 }).catch((err)=>console.error("error fetching products",err));
 
 // Function to display products
 function displayItems(products){
     const container = document.getElementById('product-container')
     container.innerHTML = '';
 
     products.forEach((product) => {
         const card = document.createElement('div');
         card.className = 'card';
 
         let titles = product.title;
         let desc = product.description;
 
 
         card.innerHTML = `
          <img src="${product.image}" alt="img1">
             <div class="title">
                 <h4>${titles.length >0 ? desc.substring(0,11).concat("..."):titles}</h4>
                 <p>${desc.length >0 ? desc.substring(0,90).concat("..."): desc}</p>
                 <hr>
                 <h3>$${product.price}</h3>
                 <hr>
                 <button class="btns">Details</button>
                 <button class="btns" onClick="addToCart(${product.id})">Add to cart</button>
             </div>
         `
         container.appendChild(card)
 
     });
 }
 
 // Filter products
 function filteredProducts(cat){
     if(cat === 'all'){
         displayItems(allProducts)
     }else{
         let filteredProducts = allProducts.filter((product)=> product.category === cat)
         displayItems(filteredProducts)
     }
 }
 
 function addToCart(productId) {
     const product = allProducts.find(p =>p.id === productId);
     let cart = JSON.parse(localStorage.getItem('cart')) || []
     
     const existingProduct = cart.find(item => item.id === productId);
     if (existingProduct){
 
       } else {
         cart.push({ ...product, quantity: 1});
 
     }
     localStorage.setItem('cart',JSON.stringify(cart));
 
     updateCartCount();
 }
 
 // Update cart count in header
 
   function updateCartCount() {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
     const CartCount = cart.reduce((total, product) => total + product.quantity, 0);
     document.querySelector('#cart-btn').innerHTML = `<i calss = "fa-solid fa-c art-shopping"></i> Cart (${cartCount})`;
   } 
 
   window.onload = updateCartCount;
 
 
 