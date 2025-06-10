

import {basketAdd } from "./main.js";

// =============================== class Store  ===================================================================================================


export class Store 
  {
          urlParams = new URLSearchParams(window.location.search);
          category = this.urlParams.get('category');
          addBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/upload.php';
          getBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/get_cities.php';

  
// =============================== Метод по отрисовке страницы  ===================================================================================================

async  renderBikes(basket) {                                                                          //async
const mainblock__wrapper = document.createElement('div');
mainblock__wrapper.classList.add('mainblock__wrapper');
const body = document.body;
body.prepend(mainblock__wrapper);
const mainblock__content = document.createElement('div');
mainblock__content.classList.add('mainblock__content');
mainblock__content.innerHTML = `
        <!-- ----------------------------- Подстрока с категориями которая исчезает --------------------------------------------- -->
        <div id="subline">
                <ul class="submenu">
                <li><a href="categories.html?category=RUUT">RUUT</a></li>
                <li><a href="categories.html?category=MYLC">MYLC</a></li>
                <li><a href="categories.html?category=RATT">RATT</a></li>
            </ul>
        </div>     
        <div class="rondo_picture"> <img src="img/logo.png"> </div>
        <!-- -------------------------------------------------------------------------- -->
        <nav class="mainblock__nav">
            <div id="main">
          <a href="index.html">main</a>
            </div>
          <div id="category">
            <a href="">categories</a>
          </div>
          <a href="#" onclick="return false;">about</a>
          <a href="#" onclick="return false;">contact</a>
        </nav>
        <div class="basket_wrapper">
          <div class="rondo_picture basket_picture"><img src="/img/basket2.png" alt=""></div>
        </div>
        
`;
const lineWithCategory = document.createElement('div');
lineWithCategory.classList.add('lineWithCategory');
mainblock__wrapper.prepend(lineWithCategory);
mainblock__wrapper.prepend(mainblock__content);
lineWithCategory.innerHTML = `<p>${this.category}</p>`;

// ===================== Подстрока с категориями  ========================= 
     const cat = document.getElementById('category');                                                     //getElementById

     const line = document.getElementById('subline');             
     const submenu = document.getElementsByClassName('submenu')[0];                                       //getElementsByClassName                                         

    const basket_wrapper = document.querySelector('.basket_wrapper');
    const basket_picture = document.querySelector('.basket_picture');                                     //querySelector


      if (cat && submenu) {
        cat.addEventListener("mouseover", () => {                                                         // addEventListener
          submenu.style.height = "100px";
          submenu.style.opacity = "1";
        
          line.style.opacity = "1";
          line.style.height = "25vh";
        })
          cat.addEventListener("touchstart", () => {                                                      // addEventListener
          submenu.style.height = "100px";
          submenu.style.opacity = "1";
        
          line.style.opacity = "1";
          line.style.height = "25vh";
        })
      };
    
      line.addEventListener("mouseleave", () => {                                                         // addEventListener
        submenu.style.height = "0";
        submenu.style.opacity = "0";
      
        line.style.opacity = "0";
        line.style.height = "0";
      });

    basket_picture.addEventListener ('click', () => basket.openbasket());
    basket_wrapper.addEventListener ('click', () => basket.openbasket());
// ======================================================================= 






// =====================  Загрузка продуктов  ========================= 

const resultDiv = document.querySelector('#result');
let products = []; // Инициализация как массива

  try 
  {
    const response = await fetch(this.getBikesUrl);                                               //await fetch

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }

    const bikes = await response.json();                                                          //await
    
    localStorage.setItem('bikes', JSON.stringify(bikes));                 

// ======================================================================= 




// =====================  Фильтр продуктов по категориям ========================= 

    products = bikes.filter(bike => bike.category === this.category);
    
    if (Array.isArray(bikes) && bikes.length > 0) 
    {
      resultDiv.innerHTML = ''; // очищаем контейнер

      const mainContainer = document.createElement ('div');
      mainContainer.classList.add('main_container', 'mainContainer_inbasket');
      

      products.forEach(bike => {
        const card = document.createElement('div'); // создаем контейнер с карточкой товара
        card.classList.add('bike_card');
        card.setAttribute('data-id', bike.id);
        card.style.background = `url(${bike.image}) center center/contain no-repeat`;
               
        card.innerHTML = `
          <h3>Model name: ${bike.name}</h3>
          <p>Price: ${bike.price} USD.</p>
          <p>Color: ${bike.color} USD.</p>
          <button class="add-to-cart" id = "buybtn" data-id="${bike.id}" data-name="${bike.name}" data-price="${bike.price}">
            В корзину
          </button>
          <button class="heart"></button>
          <button class="scales"></button>
          <div class="discount">Price with discount: ${bike.price*0.9}</div>
        `;

        mainContainer.appendChild (card) // добавляем каждую созданную карту товара в общий контейнер
        
      });
      resultDiv.appendChild(mainContainer); // добавляем общий контейнер в основной контейнер
// ======================================================================= 



      // ================ Ставим обработчик событй на кнопку добавить ==========================
      const buttons = document.querySelectorAll('.add-to-cart');

      buttons.forEach(button => {
          button.addEventListener('click', (e) => {
              e.stopPropagation(); // Останавливает всплытие события
              basketAdd(e, basket);
          });
      });
      // =======================================================================================
      const buttonsHeart = document.querySelectorAll('.heart');
      const buttonsScales = document.querySelectorAll('.scales');
      buttonsHeart.forEach (button => {
          button.addEventListener('click', (e) => {e.stopPropagation()})
      });
      buttonsScales.forEach (button => {
          button.addEventListener('click', (e) => {e.stopPropagation();})
      });

        // ================ Ставим обработчик событий на нажатие на кнопку ==========================

        const cards = document.querySelectorAll('.bike_card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => this.opencard(e));

        })
    }

    else
    {
      resultDiv.innerHTML = '<p>Список товаров пуст.</p>';
    }
  } 
  catch (error) 
  {
    resultDiv.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
  }
}

// ========================================================================================================================================
// ========================================================================================================================================
// ========================================================================================================================================
// ========================================================================================================================================
opencard(e) {
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

        let resultDiv = document.getElementById ('result')
        resultDiv.innerHTML = '';
        let body = document.body;
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
          <a href="index.html">main</a>

          <div id="category">
            <a href="">categories</a>
          </div>

          <a href="#" onclick="return false;">about</a>
          <a href="#" onclick="return false;">contact</a>
        <!-- -------------------------------------------------------------------------- -->

        </nav>

        <div class="basket_wrapper">
          <div class="rondo_picture basket_picture"><img src="/img/basket2.png" alt=""></div>
        </div>
      </div>
    </div>

<!--================================================================================================================-->
<div class="card_forShow_wrapper_wrapper">            
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


}

    