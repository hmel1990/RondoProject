export class Basket {

  basketGoods = [];
  
  async addToBasket(productItem) {
  
  // Пытаемся получить уже сохранённые товары
  const existing = this.getCookie('bikesInBasket');                                                                                        //getCookie
  let basketArray;

  if (existing) {
    try 
    {
      basketArray = JSON.parse(existing);
      if (!Array.isArray(basketArray)) basketArray = [];
    } 
    catch (e) 
    {
      console.error('Ошибка при разборе JSON из cookie:', e);
      basketArray = [];
    }
  } 
  else {
    basketArray = [];
  }

  // Добавляем товар и обновляем cookie

    // const countMap = new Map();
    let newProduct = true;      
    basketArray.forEach(item => {
      if (item.id === productItem.id)
      {
        item.count +=1;
        newProduct = false;
      }
      
    })
    
    if (newProduct)
    {
      basketArray.push(productItem);
    }



  document.cookie = `bikesInBasket=${encodeURIComponent(JSON.stringify(basketArray))}; path=/; max-age=${3600 * 24}`;                         //document.cookie
}


  getCookie(name) { //возвращается строка
    const cookies = document.cookie.split('; '); //тут из строки куки делается массив
    for (let cookie of cookies) //каждый элемент массива разбивается на key, value
    {
      const [key, value] = cookie.split('=');
      if (key === name) 
      {
        return decodeURIComponent(value);
      }
    }
    return null;
  }//возвращается строка

 getCookieArray(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            try {
                return JSON.parse(decodeURIComponent(value)); // Парсим JSON в массив объектов
            } catch (e) {
                console.error("Ошибка парсинга JSON из cookie:", e);
                return [];
            }
        }
    }
    return [];
}

removeItemFromBasket (itemID)
{
  let originalArray = this.getCookieArray('bikesInBasket');

  originalArray.forEach(item => {
  if (item.id === itemID) {
    item.count -= 1;
  }
});

  const updatedArray = originalArray.filter(item => item.count > 0);    

  document.cookie = `bikesInBasket=${encodeURIComponent(JSON.stringify(updatedArray))}; path=/; max-age=${3600 * 24}`;
}

addItemToBasket (itemID)
{
  let originalArray = this.getCookieArray('bikesInBasket');

  originalArray.forEach(item => {
  if (item.id === itemID) {
    item.count += 1;
  }
});

  const updatedArray = originalArray.filter(item => item.count > 0);    

  document.cookie = `bikesInBasket=${encodeURIComponent(JSON.stringify(updatedArray))}; path=/; max-age=${3600 * 24}`;
}

removeAllItemsFromBasket (itemID)
{
  let originalArray = this.getCookieArray('bikesInBasket');

  originalArray.forEach(item => {
  if (item.id === itemID) {
    item.count = 0;
  }
});

  const updatedArray = originalArray.filter(item => item.count > 0);    

  document.cookie = `bikesInBasket=${encodeURIComponent(JSON.stringify(updatedArray))}; path=/; max-age=${3600 * 24}`;
}

updateTotalsInDOM() {
  const bikesInBasket = this.getCookieArray('bikesInBasket');
  const count = bikesInBasket.reduce((acc, cur) => acc + cur.count, 0);
  const totalPrice = bikesInBasket.reduce((acc, cur) => acc + cur.count * parseInt(cur.price), 0);

  const totalPriceDiv = document.querySelector('.totalPriceInBasket');
  const numberDiv = document.querySelector('.numberBikesInBasket');

  if (totalPriceDiv) totalPriceDiv.textContent = `TotalPrice: ${totalPrice} USD`;
  if (numberDiv) numberDiv.textContent = `Total number: ${count}`;
}

// ===================================== OPEN BASKET ==============================================================

 openbasket()
        {
            localStorage.setItem('currentView', 'basket');
            // let basket = new Basket();
            let body = document.body;
            body.innerHTML = `
<div class="mainWrapperInBasket">
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
              <a href="index.html">main</a    >

              <div id="category">
                <span class="category-link">categories</span>
              </div   >

              <a href="#" onclick="return false;">about</a>
              <a href="#" onclick="return false;">contact</a>   
            <!-- -------------------------------------------------------------------------- --    >

        </nav   >

            <div class="basket_wrapper">
              <div class="rondo_picture basket_picture"><img src="/img/basket2.png" alt=""></div>
            </div>
          </div>
     </div>

            `;

            // Создаём и добавляем новый resultDiv
            const resultDiv = document.createElement('div');
            resultDiv.id = 'result';
            resultDiv.className = 'basketResultDiv';
            body.appendChild(resultDiv);
            const bikesInBasketWrapper = document.createElement('div');
            bikesInBasketWrapper.id = 'bikesInBasketWrapper';
            resultDiv.appendChild(bikesInBasketWrapper);

  // получаем данные из корзины и отображаем
    let bikesInBasket = this.getCookieArray('bikesInBasket');

    

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
      <div class ="bikeInfoImagePlusMinus">
      <div class="controlsWrapper">
      <div class ="bikeInfo">
      <h3> bike name:${bike.name}</h3> 
      <h3> bike price:${bike.price}</h3> 
      </div> 
      <div class ="imageInBasket"><img src="/img/${bike.id}.jpg"></div>
      </div> 
      <div class ="plusMinus">
      <button class ="minus" data-id="${bike.id}">-</button>
      <div class ="quantity">${bike.count}</div>
      <button class ="plus" data-id="${bike.id}">+</button>
      </div>
      </div>
      `;
      // buttonAndProductWrapper.appendChild(cardLineInBasket);
      // buttonAndProductWrapper.appendChild(buttonRemove);
      
      const bikeInfoImagePlusMinus = cardLineInBasket.querySelector('.bikeInfoImagePlusMinus');
      bikeInfoImagePlusMinus.appendChild(buttonRemove);

      buttonAndProductWrapper.appendChild(cardLineInBasket);


      const plus = cardLineInBasket.querySelector('.plus');
      const minus = cardLineInBasket.querySelector('.minus');
      const basket = new Basket();

      plus.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        basket.addItemToBasket(id);
        // Обновляем количество в DOM
        const quantityDiv = e.target.parentElement.querySelector('.quantity');
        let currentCount = parseInt(quantityDiv.textContent);
        quantityDiv.textContent = currentCount + 1;

        basket.updateTotalsInDOM();

      });


      minus.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        basket.removeItemFromBasket(id);
        const quantityDiv = e.target.parentElement.querySelector('.quantity');
        let currentCount = parseInt(quantityDiv.textContent);
        if (currentCount > 1) {
          quantityDiv.textContent = currentCount - 1;
        } else {
          // Удалить весь блок товара
          const item = e.target.closest('.buttonAndProductWrapper');
          item.remove();
        }
        basket.updateTotalsInDOM();
      });



      buttonRemove.addEventListener ('click', (e) => {
      const id = e.target.getAttribute('data-id');
      basket.removeAllItemsFromBasket (id);

      const item = e.target.closest('.buttonAndProductWrapper');
      item.remove();
      
      });


      bikesInBasketWrapper.appendChild(buttonAndProductWrapper);
    });
    
    const basketHeader = document.createElement('div');
    basketHeader.innerHTML = `<h1 class = "basketHeader"> Basket </h1>`;

    const basketPriceNumberWrapper = document.createElement('div');
    basketPriceNumberWrapper.classList.add('basketPriceNumberWrapper');

    basketPriceNumberWrapper.append(totalPriceInBasket);
    basketPriceNumberWrapper.append(numberBikesInBasket);

    bikesInBasketWrapper.prepend(basketPriceNumberWrapper);

    const buttonForm = document.createElement('button');
    buttonForm.classList.add('buttonForm');
    buttonForm.textContent = 'Place an order';
    bikesInBasketWrapper.append(buttonForm);
    bikesInBasketWrapper.prepend (basketHeader);

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
          line.style.height = "12vh";
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

      submenu.addEventListener('click', ()=> {
        body.innerHTML = ``;
        resultDiv.innerHTML = ``;
        localStorage.setItem('currentView', 'card');

        renderFunction()
      } ); /////////////////////////////////////////////////////////////////////////
            
// =============================== Оформление формы ================================================================

            buttonForm.addEventListener ('click', () => this.openForm());

    }

            openForm ()
            {
              const body = document.body;
              let resultDiv = document.getElementById (`result`);
              resultDiv.innerHTML=``;
              resultDiv.innerHTML=`
              <form id="myForm" action="/submit" method="POST" enctype="multipart/form-data">
              <div class="form-container">

                <div name="userForm">

                  <div class="buttons_wrapper">
                      <button type="button" id = "showData">Показать данные</button>

                      <input type="reset" id = "resetData" value="Сбросить форму">
                  </div>

                  <label for="name">Имя:</label>
                  <input type="text" id="name" name="name" maxlength="50" required pattern="^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\\s-]+$">

                  <label for="surname">Фамилия:</label>
                  <input type="text" id="surname" name="surname" required pattern="^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\\s-]+$">
                          
                  <label for="telephone">Телефон:</label>
                  <input type="tel" id="telephone" name="telephone" required pattern="^\\+?\\d{10,15}$">

                  <label for="email">Почта:</label>
                  <input type="email" id="email" name="email" required>

                  <div class="text_delivery"> <p> Доставка</p> </div>

                  <label for="password">Адрес доставки:</label>
                  <input type="text" id="adress" name="adress" required>

                  <label>Способ доставки:</label>
                  <div class="radio-group">
                    <div class="radio-option">
                      <input type="radio" id="newPost" name="delivery" value="newPost" required>
                      <label for="newPost">НоваяПочта</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="ukrPost" name="delivery" value="ukrPost">
                      <label for="ukrPost">УкрПочта</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="meest" name="delivery" value="meest">
                      <label for="meest">MeestПочта</label>
                    </div>
                  </div>
                              
                  <label>Способ оплаты:</label>
                  <div class="radio-group">
                    <div class="radio-option">
                      <input type="radio" id="cardPay" name="payment" value="cardPay" required>
                      <label for="cardPay">Наличными или карточкой при получении</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="applePay" name="payment" value="applePay">
                      <label for="applePay">Оплата картой (Apple Pay, Google Pay)</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="fop" name="payment" value="fop">
                      <label for="fop">Оплата на счет (только для ФОП и ТОВ)</label>
                    </div>
                  </div>



                  
                  
                  <div class="submitButton_wrapper">        
                    <button type="submit" id="submitButton"><p>Отправить</p></button>
                  </div>

                </div>
                <div id="output" class="output"></div>
              </div>
              `;
              const submitButton = document.getElementById("submitButton");
              const showData = document.getElementById("showData");
              const resetData = document.getElementById("resetData");

              submitButton.addEventListener ('click', (e)=>this.getdata(e));
              showData.addEventListener ('click', (e)=>this.getdata(e));
              resetData.addEventListener ('click', (e)=>this.openForm);
              localStorage.setItem('currentView', 'form');


            }

            getdata(event) 
            {

                const form = document.getElementById("myForm");
  
              // Проверка валидности формы
              if (!form.checkValidity()) {
                form.reportValidity(); // Показывает встроенные браузерные сообщения
                return; // Прерываем выполнение, если форма невалидна
              }


              event.preventDefault();



              let name = document.getElementById("name").value;
              let surname = document.getElementById("surname").value;
              let telephone = document.getElementById("telephone").value;
              let email = document.getElementById("email").value;
              let adress = document.getElementById("adress").value;

              // Радиокнопки: способ доставки
              let delivery = document.querySelector('input[name="delivery"]:checked')?.value || "";

              // Радиокнопки: способ оплаты
              let payment = document.querySelector('input[name="payment"]:checked')?.value || "";
        
              let confirmationMessage = `
				            <p><strong>Имя:</strong> ${name}</p>
				            <p><strong>Фамилия:</strong> ${surname}</p>
				            <p><strong>Телефон:</strong> ${telephone}</p>
				            <p><strong>email:</strong> ${email}</p>
				            <p><strong>Адрес доставки: </strong> ${adress}</p>
				            <p><strong>Способ доставки:</strong> ${delivery}</p>
				            <p><strong>Способ оплаты:</strong> ${payment}</p>				
			              `;
              let bikesInBasket = this.getCookieArray('bikesInBasket');
              let bikesForSale = bikesInBasket.map(bike => {
                return `
                  <p><strong>Название:</strong> ${bike.name}, 
                  <strong>Цена:</strong> ${bike.price}, 
                  <strong>Цвет:</strong> ${bike.color}, 
                  <strong>Кол-во:</strong> ${bike.count}</p>
                `;
              }).join('');
              document.getElementById("output").innerHTML = confirmationMessage + `<strong> <br>Приобретенные товары:</strong> ${bikesForSale}`;
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: 'smooth'
                              });

            }


// ===============================================================================================
// ===============================================================================================
}  