

import {opencard, basketAdd } from "./main.js";

// =============================== class Store  ===================================================================================================


export class Store 
  {
          urlParams = new URLSearchParams(window.location.search);
          category = this.urlParams.get('category');
          addBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/upload.php';
          getBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/get_cities.php';

   async  uploadBikes() {
   const resultDiv = document.querySelector('#result');
  try {
    const response = await fetch(addBikesUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bikes)
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || 'Ошибка при отправке данных');
    resultDiv.innerHTML = `<p>Успешно добавлено: ${result.filter(item => item.status === "success").length} велосипедов.</p>`;
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
  }
}

// =============================== Метод по отрисовке страницы  ===================================================================================================

async  renderBikes(basket) {
// let basket = new Basket();
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
          line.style.height = "25vh";
        })
      };
    
      line.addEventListener("mouseleave", () => {
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
    const response = await fetch(this.getBikesUrl);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }

    const bikes = await response.json();

    
    localStorage.setItem('bikes', JSON.stringify(bikes));

    // const savedProducts = JSON.parse(localStorage.getItem('bikes')); для возврата данных обратно
// ======================================================================= 




// =====================  Фильтр продуктов по категориям ========================= 

    products = bikes.filter(bike => bike.category === this.category);
    
    if (Array.isArray(bikes) && bikes.length > 0) 
    {
      resultDiv.innerHTML = ''; // очищаем контейнер

      const mainContainer = document.createElement ('div');
      mainContainer.classList.add('main_container');
      

      products.forEach(bike => {
        const card = document.createElement('div'); // создаем контейнер с карточкой товара
        card.classList.add('bike_card');
        card.setAttribute('data-id', bike.id);
        card.style.background = `url(${bike.image}) center center/contain no-repeat`;
               
        card.innerHTML = `
          <h3>${bike.name}</h3>
          <p>${bike.price} USD.</p>
          <button class="add-to-cart" id = "buybtn" data-id="${bike.id}" data-name="${bike.name}" data-price="${bike.price}">
            В корзину
          </button>
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

        // ================ Ставим обработчик событий на нажатие на кнопку ==========================

        const cards = document.querySelectorAll('.bike_card');
        cards.forEach(card => {
            card.addEventListener('click', opencard);
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
}

// ========================================================================================================================================
    