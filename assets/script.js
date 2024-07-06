const input_elem = document.getElementById("input_search");
const items = document.getElementById("items_list");

// add price slider
const price_taken = document.getElementById("Price");
const price_elem = document.getElementById("Price_list");


price_taken.addEventListener("input",(event)=>{
    const price_value = parseInt(event.target.value);
    price_elem.innerText = "Price 0 to " + price_value;

    filter_products = products.filter((e) => {
        return e.price <= price_value;
    })
    renderListUi();
})

// add search method 
input_elem.addEventListener("input",(event) => {
    const search_input = event.target.value.toLowerCase();

    filter_products = products.filter(e =>{
         return e.title.toLowerCase().includes(search_input);
        console.log(e.title.toLowerCase().includes(search_input));
    })
    renderListUi();
});

let products = null;
let filter_products = null;

// Use fetch API
fetch("https://fakestoreapi.com/products")
.then((data)=> data.json())
.then((data) =>{
    products = data;
    filter_products = data;
    renderListUi();
})

function renderListUi() {
    //we create fragment.
    const fragment = document.createDocumentFragment();

    // Using for loop and iterate all items
    for (let i = 0; i < filter_products.length; i++) {
        // console.log("filter_products",filter_products);

        const product = filter_products[i];

        const {title, price, category, image, rating} = product;

        const li_elem = document.createElement("li");
        li_elem.className = "card";
        
        const img_elem = document.createElement("img");

        const title_elem = document.createElement("p");
        title_elem.className = "title";

        const price_elem = document.createElement("p");

        const category_elem = document.createElement("p");
        category_elem.className = "category";

        
        const rating_elem = document.createElement("p");
        rating_elem.className = "rating";

        img_elem.src = image;
        img_elem.height = 200;
        img_elem.width = 200;

        title_elem.innerText = title;
        price_elem.innerText = "Price: " + price;
        category_elem.innerText = category;

        rating_elem.innerText ="Rate: " + rating.rate;

        li_elem.appendChild(img_elem);
        li_elem.appendChild(title_elem);
        li_elem.appendChild(price_elem);
        li_elem.appendChild(category_elem);
        li_elem.appendChild(rating_elem);

        fragment.appendChild(li_elem);
    }
    items.innerHTML = "";
    items.appendChild(fragment);
}
