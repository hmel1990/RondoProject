export class Basket {

  basketGoods = [];
  
  async addToBasket(productItem) {
  
  // Пытаемся получить уже сохранённые товары
  const existing = this.getCookie('bikesInBasket');
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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  document.cookie = `bikesInBasket=${encodeURIComponent(JSON.stringify(basketArray))}; path=/; max-age=${3600 * 24}`;
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




// ===============================================================================================
}  