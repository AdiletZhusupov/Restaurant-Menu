const endpoint = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";


const btnAll = document.getElementById('btnAll');
const btnBreakfast = document.getElementById('btnBreakfast');
const btnLunch = document.getElementById('btnLunch');
const btnShakes = document.getElementById('btnShakes');
const btnDinner = document.getElementById('btnDinner');
const mealsWrapper = document.getElementById('mealsWrapper');

// Audios
const allSound = new Audio();
allSound.src = "./sounds/1.mp3"

const breakfastSound = new Audio();
breakfastSound.src = "./sounds/2.mp3"

const shakesSound = new Audio();
shakesSound.src = "./sounds/3.mp3"

const lunchSound = new Audio();
lunchSound.src = "./sounds/4.mp3"

const dinnerSound = new Audio();
dinnerSound.src = "./sounds/5.mp3"


let initialData = [];

const callToApi = async (url) =>{
    try{
        const resp = await fetch(url);
        const data = await resp.json();
        initialData = await data;
        return data;
    }catch(error){
        console.log(error);
    }
}


const createBox = (item) => {
    const image = document.createElement('img');
    image.classList.add('meal-pic');
    image.src = item.img;
    image.alt = item.title;

    const itemTitle = document.createElement('h5');
    itemTitle.classList.add('item-title');
    itemTitle.innerText = item.title;
    const itemPrice = document.createElement('h5');
    itemPrice.classList.add('item-price');
    itemPrice.innerText = `$${item.price}`;
    const itemInfoTop = document.createElement('div');
    itemInfoTop.classList.add('item-top');
    itemInfoTop.append(itemTitle, itemPrice);

    const itemDescription = document.createElement('p');
    itemDescription.classList.add('item-description');
    itemDescription.innerText = ((item.desc).slice(1)).slice(0, -1)

    const itemInfoBox = document.createElement('div');
    itemInfoBox.classList.add('item-info-box');
    itemInfoBox.append(itemInfoTop, itemDescription)

    const mealBox = document.createElement('div');
    mealBox.classList.add('meal-box');
    mealBox.append(image, itemInfoBox);
    mealsWrapper.appendChild(mealBox);
}


const renderData = (data) => {
    data.forEach((item) => {
        createBox(item);
    })
}

btnAll.addEventListener('click', ()=>{
    allSound.play();
    mealsWrapper.innerHTML = '';
    renderData(initialData);
})

btnBreakfast.addEventListener('click', ()=>{
    breakfastSound.play();
    const filteredBreakfast = initialData.filter((item)=>{
        return item.category.includes('breakfast');
    })
    mealsWrapper.innerHTML = '';
    renderData(filteredBreakfast);
})

btnLunch.addEventListener('click', ()=>{
    lunchSound.play();
    const filteredLunch = initialData.filter((item)=>{
        return item.category.includes('lunch');
    })
    mealsWrapper.innerHTML = '';
    renderData(filteredLunch);
})

btnShakes.addEventListener('click', ()=>{
    shakesSound.play();
    const filteredShakes = initialData.filter((item)=>{
        return item.category.includes('shakes');
    })
    mealsWrapper.innerHTML = '';
    renderData(filteredShakes);
})

btnDinner.addEventListener('click', ()=>{
    dinnerSound.play();
    const filteredDinner = initialData.filter((item)=>{
        return item.category.includes('dinner');
    })
    mealsWrapper.innerHTML = '';
    renderData(filteredDinner);
})

callToApi(endpoint).then((data)=>{
    renderData(data)
})
