import {Product} from "./product.js";

document.addEventListener('DOMContentLoaded', function() {
  const buttonAdmin = document.getElementById ('admin');
  if (buttonAdmin)
  {
    buttonAdmin.addEventListener('click', ()=> {
      let adminInstance = new Admin();
      adminInstance.openAdmin();
    })
  }
})

class Admin {
  XXXopenAdmin ()
    {
            let body = document.body;
            body.innerHTML = `
            <form id="adminForm" action="/submit" method="POST" enctype="multipart/form-data" onsubmit="getdata(event)">

            <div class="form_wrapper">
                  <label for="name">Login:</label>
                  <input type="text" id="Login" name="Login" size="50" required pattern="^[A-Za-z\s]+$">

                  <label for="surname">Password:</label>
                  <input type="text" id="Password" name="Password" size="50" required pattern="^[A-Za-z\s]+$">
                  
                  <div class="submitButton_wrapper">        
                    <button type="submit" id="submitButton"><p>Отправить</p></button>
                  </div>
            </div>
            </form>
            `;
    }

    openAdmin (){
      const modal_wrapper = document.querySelector(".modal_wrapper");
      modal_wrapper.style.display = 'block';
      requestAnimationFrame(() => {
      modal_wrapper.style.opacity = '1'; // Анимированно показать
      });
// =================================================================================

      const submitButton = document.getElementById ('submitButton');
      const reject = document.getElementById ('reject');

        reject.addEventListener('click', () => {
        modal_wrapper.style.opacity = '0'; // Плавное исчезновение
      
        setTimeout(() => {
          modal_wrapper.style.display = 'none'; // Скрываем только после анимации
        }, 1000); // 700 мс = длительность анимации из CSS
      });
      
      submitButton.addEventListener('click', ()=>{
        let login = document.getElementById("Login").value;
        let password = document.getElementById("Password").value;
        if (login === "hmel" && password === "123")

          {
          let body = document.body;
            body.innerHTML = `
            <form id="adminFormForUpload" action="/submit" method="POST" enctype="multipart/form-data" onsubmit="getdata(event)">
            <div class="header_text_form_wrapper"><div class="header_text_form"> Добавление нового продукта в базу</div></div>
            <div class="form_wrapper form_wrapper_upload">
                  <label for="category">category:</label>
                  <input type="text" id="category" name="category" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="name">name:</label>
                  <input type="text" id="name" name="Login" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="frame">frame:</label>
                  <input type="text" id="frame" name="frame" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="tyres">tyres:</label>
                  <input type="text" id="tyres" name="tyres" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="deraileurFront">deraileurFront:</label>
                  <input type="text" id="deraileurFront" name="deraileurFront" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="deraileurRear">deraileurRear:</label>
                  <input type="text" id="deraileurRear" name="deraileurRear" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="saddle">saddle:</label>
                  <input type="text" id="saddle" name="saddle" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="shifters">shifters:</label>
                  <input type="text" id="shifters" name="shifters" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="price">price:</label>
                  <input type="text" id="price" name="price" size="50" required pattern="^[A-Za-z\s]+$">
                  <label for="color">color:</label>
                  <input type="text" id="color" name="color" size="50" required pattern="^[A-Za-z\s]+$">
                  
                  <div class="submitButton_wrapper">        
                    <button type="button" id="submitButtonForUpload"><p>Отправить</p></button>
                    <button type="button" id="exitButtonForUpload"><p>Выход</p></button>

                  </div>
            </div>
            </form>
            `;
            const submitButtonForUpload = document.getElementById("submitButtonForUpload");
            const exitButtonForUpload = document.getElementById("exitButtonForUpload");
            submitButtonForUpload.addEventListener('click', () => this.getdataFromFormForUpload());
        }
        else (alert("логин или пароль неверные"))       
      })




    }

    getdataFromFormForUpload() 
            {
                let bikes = JSON.parse(localStorage.getItem('bikes'));
                let id = bikes.length+1;
                let category = document.getElementById("category").value;
                let name = document.getElementById("name").value;
                let frame = document.getElementById("frame").value;
                let tyres = document.getElementById("tyres").value;
                let deraileurFront = document.getElementById("deraileurFront").value;
                let deraileurRear = document.getElementById("deraileurRear").value;
                let saddle = document.getElementById("saddle").value;
                let shifters = document.getElementById("shifters").value;
                let price = document.getElementById("price").value;
                let color = document.getElementById("color").value;
                let image = `img/${id}.jpg`;

                const bike = new Product(
                                            id, category, name, frame, tyres,
                                            deraileurFront, deraileurRear,
                                            saddle, shifters, price, color, image
                                          );
                this.uploadBikes(bike);
            }


            
            async uploadBikes(bike) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const addBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/upload.php';
  const getBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/get_cities.php';

            const resultDiv = document.createElement ('div');
            resultDiv.classList.add ("resultDiv");
            resultDiv.style.height= "100vh";
            try {
                const response = await fetch(addBikesUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bike)
              });
              const result = await response.json();
            
              if (!response.ok) throw new Error(result.error || 'Ошибка при отправке данных');
              alert(`${result.filter(item => item.status === "success").length}`)

              resultDiv.innerHTML = `<p>Успешно добавлено: ${result.filter(item => item.status === "success").length} велосипедов.</p>`;
            } catch (error) {
              alert(error.message)
              resultDiv.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
            }
          }

}
