import {Store} from "./store.js";
import {Basket} from "./basket.js";
import {Product} from "./product.js";



let basket;

          const resultDiv = document.querySelector('#result');
          let body = document.body;



      document.addEventListener("DOMContentLoaded", ()=> {
          basket = new Basket();
          const lastPage = localStorage.getItem('currentView');
          if (lastPage === 'cart') opencard();
          else if (lastPage === 'basket') openbasket();
          else renderFunction();
      });




      export function openbasket()
        {
            localStorage.setItem('currentView', 'basket');
            basket = new Basket();
            body.innerHTML = `

<div class="mainblock mainblock_in_basket">
      <div class="mainblock__content basket_line">
        <div id="subline">
                <ul class="submenu">
                <li><a href="categories.html?category=RUUT">RUUT</a></li>
                <li><a href="categories.html?category=MYLC">MYLC</a></li>
                <li><a href="categories.html?category=RATT">RATT</a></li>
            </ul>
        </div>
        <div class="rondo_picture">
          <img src="img/logo.png">
        </div>
        <!-- -------------------------------------------------------------------------- -->
        <nav class="mainblock__nav">
          <a href="index.html">main</a>

          <div id="category">
            <a href="">categories</a>
          </div>

          <a href="/about">about</a>
          <a href="/contact">contact</a>
        <!-- -------------------------------------------------------------------------- -->

        </nav>

        <div class="basket_wrapper">
          <div class="rondo_picture basket_picture"><img src="/img/basket2.png" alt=""></div>
        </div>
      </div>
    </div>
            `;

            // Создаём и добавляем новый resultDiv
            const resultDiv = document.createElement('div');
            resultDiv.id = 'result';
            body.appendChild(resultDiv);
            const bikesInBasketWrapper = document.createElement('div');
            bikesInBasketWrapper.id = 'bikesInBasketWrapper';
            resultDiv.appendChild(bikesInBasketWrapper);

  // получаем данные из корзины и отображаем
    let bikesInBasket = basket.getCookieArray('bikesInBasket');

    

    let count =  bikesInBasket.reduce((acc, cur) => acc + cur.count, 0);
    let totalPrice = bikesInBasket.reduce((acc, curr) =>acc+parseInt(curr.price), 0); 
    
    const numberBikesInBasket = document.createElement('div');
    const totalPriceInBasket = document.createElement('div');

    totalPriceInBasket.classList.add ('totalPriceInBasket');
    numberBikesInBasket.classList.add ('numberBikesInBasket');

    totalPriceInBasket.innerHTML = `TotalPrice: ${totalPrice} USD`;
    numberBikesInBasket.innerHTML = `Total number: ${count}`;


    bikesInBasket.forEach(bike => {
      const buttonAndProductWrapper = document.createElement('div');
      buttonAndProductWrapper.classList.add('buttonAndProductWrapper');

      const buttonRemove = document.createElement('button');
      buttonRemove.classList.add('buttonRemove');
      buttonRemove.setAttribute('data-id', bike.id);
      buttonRemove.textContent = 'Удалить';

      const cardLineInBasket = document.createElement('div');
      cardLineInBasket.classList.add('cardLineInBasket');
      cardLineInBasket.setAttribute('data-id', bike.id);
      cardLineInBasket.innerHTML = `
      <h3> bike name:${bike.name}</h3> 
      <h3> bike price:${bike.price}</h3> 
      <h3> bike quantity:${bike.count}</h3> 
      `;
      buttonAndProductWrapper.appendChild(cardLineInBasket);
      buttonAndProductWrapper.appendChild(buttonRemove);

      buttonRemove.addEventListener ('click', (e) => {
      const basket = new Basket();
      const id = e.target.getAttribute('data-id');
      basket.removeItemFromBasket (id);
      window.location.reload();
      });


      bikesInBasketWrapper.appendChild(buttonAndProductWrapper);
    });
    
    const basketPriceNumberWrapper = document.createElement('div');
    basketPriceNumberWrapper.classList.add('basketPriceNumberWrapper');

    basketPriceNumberWrapper.append(totalPriceInBasket);
    basketPriceNumberWrapper.append(numberBikesInBasket);

    bikesInBasketWrapper.prepend(basketPriceNumberWrapper);

    const buttonForm = document.createElement('button');
    buttonForm.classList.add('buttonForm');
    buttonForm.textContent = 'Оформить';
    bikesInBasketWrapper.append(buttonForm);




// ===================== Подстрока с категориями  ========================= 
     const cat = document.getElementById('category');

     const line = document.getElementById('subline');
     const submenu = document.getElementsByClassName('submenu')[0];

    const basket_wrapper = document.querySelector('.basket_wrapper');
    const basket_picture = document.querySelector('.basket_picture');


      if (cat && submenu) {
        cat.addEventListener("mouseover", () => {
          submenu.style.height = "100px";
          submenu.style.opacity = "1";
        
          line.style.opacity = "1";
          line.style.height = "15vh";
        })
      };
    
      line.addEventListener("mouseleave", () => {
        submenu.style.height = "0";
        submenu.style.opacity = "0";
      
        line.style.opacity = "0";
        line.style.height = "0";
      });

              submenu.addEventListener('click', ()=> {
              body.innerHTML = ``;
              resultDiv.innerHTML = ``;
              renderFunction()
            } );

      // ===============================================================================================

        }

        export function renderFunction ()
        {
            basket = new Basket();
            let store = new Store();
            store.renderBikes(basket);
            localStorage.setItem('currentView', 'home');
        }


        export function opencard(e) {
            let id;
            if (e && e.target)
            {
                id = e.target.getAttribute('data-id');
                localStorage.setItem('lastOpenedBikeId', id);
            }
            else {
                // Если вызвано напрямую, например, при загрузке страницы
                id = localStorage.getItem('lastOpenedBikeId');
                if (!id) {
                    alert('ID не найден. Невозможно отобразить карточку товара.');
                    return;
                }
            }

        let bikes = JSON.parse(localStorage.getItem('bikes'));
        let product = bikes.find(data => data.id === id);

        resultDiv.innerHTML = '';
            body.innerHTML = `

<div class="mainblock">
      <div class="mainblock__content">
        <div id="subline">
                <ul class="submenu">
                <li><a href="categories.html?category=RUUT">RUUT</a></li>
                <li><a href="categories.html?category=MYLC">MYLC</a></li>
                <li><a href="categories.html?category=RATT">RATT</a></li>
            </ul>
        </div>
        <div class="rondo_picture">
          <img src="img/logo.png">
        </div>
        <!-- -------------------------------------------------------------------------- -->
        <nav class="mainblock__nav">
          <a href="/main">main</a>

          <div id="category">
            <a href="">categories</a>
          </div>

          <a href="/about">about</a>
          <a href="/contact">contact</a>
        <!-- -------------------------------------------------------------------------- -->

        </nav>

        <div class="basket_wrapper">
          <div class="rondo_picture basket_picture"><img src="/img/basket2.png" alt=""></div>
        </div>
      </div>
    </div>

<!--================================================================================================================-->
            <div class="card_forShow_wrapper">
                <div class="card_forShow">
                    <button class="backToCategory">
                        К категориям
                    </button>
                </div>
                <div class="card_forShow_text_wrapper">
                <div class="card_forShow_text">
                <p>name:${product.name}</p>
                <p>category:${product.category}</p>
                <p>frame:${product.frame}</p>
                <p>tyres:${product.tyres}</p>
                <p>deraileurFront:${product.deraileurFront}</p>
                <p>deraileurRear:${product.deraileurRear}</p>
                <p>color:${product.color}</p>
                <p>saddle:${product.saddle}</p>
                <p>shifters:${product.shifters}</p>
                <p>price:${product.price}</p>
                </div>
                </div>
            </div>
            `;



            const card_forShow = document.querySelector('.card_forShow');
            card_forShow.style.background = `url(${product.image}) center center/contain no-repeat`;
            // ======================================================================================
            const buttons = document.querySelectorAll('.backToCategory');

            buttons.forEach(button => {
                button.addEventListener('click', (e) => {location.reload();});
            });

            // ======================================================================================

            const cat = document.getElementById('category');
            const line = document.getElementById('subline');
            const submenu = document.getElementsByClassName('submenu')[0];




            if (cat && submenu) {
                cat.addEventListener("mouseover", () => {
                    submenu.style.height = "100px";
                    submenu.style.opacity = "1";

                    line.style.opacity = "1";
                    line.style.height = "15vh";

                    card_forShow.style.margin = "22vh auto 0 auto"
                })
            }

            line.addEventListener("mouseleave", () => {
                submenu.style.height = "0";
                submenu.style.opacity = "0";

                line.style.opacity = "0";
                line.style.height = "0";

                card_forShow.style.margin = "90px auto 0 auto";

            });

            submenu.addEventListener('click', ()=> {
              body.innerHTML = ``;
              resultDiv.innerHTML = ``;
              renderFunction()
            } );

            const basket_wrapper = document.querySelector('.basket_wrapper');
            const basket_picture = document.querySelector('.basket_picture');
            basket_picture.addEventListener ('click', () => {
            
            localStorage.setItem('currentView', 'basket');
            window.location.href = 'categories.html';

          });
          basket_wrapper.addEventListener ('click', openbasket);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            localStorage.setItem('currentView', 'cart');
            localStorage.setItem('lastOpenedBikeId', id);

        }



      export async function basketAdd(e, basket)
        {
          const id = e.target.getAttribute('data-id');
          let bikes = JSON.parse(localStorage.getItem('bikes'));


          let findProduct = bikes.find(data => data.id === id);

          let product = {id:findProduct.id, name:findProduct.name, 
            price:findProduct.price, color:findProduct.color, count:1}


          await basket.addToBasket (product);
          alert( 'тыц')

        }
        
        

          
        
// =============================== class Store  ===================================================================================================
        
// ========================================================================================================================================
    

// =============================== class Basket  ===================================================================================================





// =============================== class Product  ===================================================================================================
