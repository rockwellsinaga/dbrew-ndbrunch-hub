const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const products = [
  { id:"oat-latte", name:"Oat Latte", category:"drink", price:32000, image:"./img/oat-latte.png", description:"Espresso, creamy oat milk, and a gently toasted finish." },
  { id:"kopi-susu", name:"Kopi Susu", category:"drink", price:26000, image:"./img/kopi-susu.png", description:"A comforting Indonesian milk coffee with balanced sweetness." },
  { id:"croissant", name:"Butter Croissant", category:"breakfast", price:28000, image:"./img/croissant.png", description:"Flaky, buttery layers baked for slow brunch mornings." },
  { id:"waffles", name:"Morning Waffles", category:"breakfast", price:38000, image:"./img/waffles.png", description:"Golden waffles with a crisp edge and tender center." },
  { id:"kintamani", name:"Kintamani Bali", category:"beans", price:78000, image:"./img/kintamani-bali.png", description:"Bright citrus notes from Bali's volcanic highlands." },
  { id:"toraja", name:"Toraja Coffee", category:"beans", price:82000, image:"./img/arabika-toraja.png", description:"Full-bodied Indonesian beans with an earthy cocoa finish." },
];
let cart = JSON.parse(localStorage.getItem("dbrewCart") || "[]");
const $ = (selector) => document.querySelector(selector);

function renderProducts(filter="all") {
  $("#product-grid").innerHTML = products.filter(p => filter === "all" || p.category === filter).map(p => `<article class="product-card"><img src="${p.image}" alt="${p.name}"><div class="product-body"><div class="product-meta"><div><h3>${p.name}</h3><p>${p.category === "beans" ? "250 g" : "per serving"}</p></div><strong>${rupiah.format(p.price)}</strong></div><p>${p.description}</p><button class="add-button" data-product="${p.id}">Add to cart</button></div></article>`).join("");
}
function saveCart(){localStorage.setItem("dbrewCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  $("#cart-count").textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
  $("#cart-items").innerHTML=cart.length?cart.map(item=>{const p=products.find(product=>product.id===item.id);return `<article class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${item.quantity} × ${rupiah.format(p.price)}</p></div><button class="remove-button" data-remove="${p.id}">Remove</button></article>`}).join(""):"<p>Your cart is ready for a good morning.</p>";
  $("#cart-total").textContent=rupiah.format(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.quantity,0));
}
async function api(path,payload){const response=await fetch(path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const data=await response.json().catch(()=>({message:"The API is not available."}));if(!response.ok)throw new Error(data.message||"Request failed.");return data}
function status(id,message,type){const el=$(id);el.textContent=message;el.className=`form-status ${type}`}

document.addEventListener("click",event=>{
  const open=event.target.closest("[data-open]");if(open)$("#"+open.dataset.open).showModal();
  if(event.target.closest("[data-close]"))event.target.closest("dialog").close();
  const add=event.target.closest("[data-product]");if(add){const found=cart.find(item=>item.id===add.dataset.product);found?found.quantity++:cart.push({id:add.dataset.product,quantity:1});saveCart();add.textContent="Added ✓";setTimeout(()=>add.textContent="Add to cart",900)}
  const remove=event.target.closest("[data-remove]");if(remove){cart=cart.filter(item=>item.id!==remove.dataset.remove);saveCart()}
  const filter=event.target.closest("[data-filter]");if(filter){document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));filter.classList.add("active");renderProducts(filter.dataset.filter)}
  const tab=event.target.closest("[data-tab]");if(tab){document.querySelectorAll(".account-tab").forEach(b=>b.classList.remove("active"));tab.classList.add("active");document.querySelectorAll("[data-panel]").forEach(p=>p.classList.toggle("hidden",p.dataset.panel!==tab.dataset.tab))}
});
$(".menu-toggle").addEventListener("click",event=>{const open=$("#site-nav").classList.toggle("open");event.currentTarget.setAttribute("aria-expanded",String(open))});
$("#checkout-button").addEventListener("click",()=>alert("Portfolio demo: checkout is intentionally disabled and no payment data is collected."));
$("#contact-form").addEventListener("submit",async event=>{event.preventDefault();status("#contact-status","Sending…","");try{const data=await api("/contact",{name:$("#contact-name").value,email:$("#contact-email").value,message:$("#contact-message").value});status("#contact-status",data.message,"success");event.target.reset()}catch(error){status("#contact-status",error.message,"error")}});
$("#login-form").addEventListener("submit",async event=>{event.preventDefault();status("#login-status","Signing in…","");try{const data=await api("/register/login",{username:$("#login-username").value,password:$("#login-password").value});sessionStorage.setItem("dbrewUser",JSON.stringify(data.data));status("#login-status",data.message,"success")}catch(error){status("#login-status",error.message,"error")}});
$("#register-form").addEventListener("submit",async event=>{event.preventDefault();status("#register-status","Creating account…","");try{const data=await api("/register",{username:$("#register-username").value,email:$("#register-email").value,password:$("#register-password").value});status("#register-status",data.message,"success");event.target.reset()}catch(error){status("#register-status",error.message,"error")}});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();
