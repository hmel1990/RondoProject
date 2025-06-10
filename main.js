import {Store} from "./store.js";
import {Basket} from "./basket.js";
import {Product} from "./product.js";



          let basket;
          let store;

          const resultDiv = document.querySelector('#result');
          let body = document.body;



      document.addEventListener("DOMContentLoaded", ()=> {
          basket = new Basket();
          store = new Store();
          const lastPage = localStorage.getItem('currentView');
          if (lastPage === 'cart') store.opencard();
          else if (lastPage === 'basket') basket.openbasket();
          else if (lastPage === 'form'){
            basket.openbasket();
            basket.openForm();
          } 
          else renderFunction();
      });



      

        export function renderFunction ()
        {
            basket = new Basket();
            let store = new Store();
            store.renderBikes(basket);
            localStorage.setItem('currentView', 'home');

        }




      export async function basketAdd(e, basket)
        {
          const id = e.target.getAttribute('data-id');
          let bikes = JSON.parse(localStorage.getItem('bikes'));


          let findProduct = bikes.find(data => data.id === id);

          let product = {id:findProduct.id, name:findProduct.name, 
            price:findProduct.price, color:findProduct.color, count:1}


          await basket.addToBasket (product);

        }
        
