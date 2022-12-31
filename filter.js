const data = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Invicta Men's Pro Diver 2",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 3,
      name: "Timex Men's Expedition Scout ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 4,
      name: "Breitling Superocean Heritage",
      img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 5,
      name: "Casio Classic Resin Strap ",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 6,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 74,
      cat: "Casual",
    },
  ];  

const productsContainer = document.querySelector(".products")
const searchInput =document.querySelector(".search")
const categoriesContainer=document.querySelector(".cats")
const priceRange= document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")


const displayProducts= (filteredProducts) =>{
  productsContainer.innerHTML = filteredProducts.map(product=>
    ` 
    <div class="product">
      <img src=${product.img} alt="">
      <span class="name">${product.name}</span>
      <span class="priceText">${product.price}</span>
    </div>
    `
    
    ).join("")

}

displayProducts(data)

searchInput.addEventListener("keyup",(e)=>{
  const value = e.target.value.toLowerCase();
  if(value===null){
   displayProducts(data) 
  }
  /*Here i am using filter func and searching for name of given value .
  If value doesnt exits then indexOf func returns -1 */
  else{
    displayProducts(data.filter(item=> item.name.toLowerCase().indexOf(value)!==-1))
  }
})

const displayCategories =(cats)=>{
  // console.log(cats) 
  categoriesContainer.innerHTML= cats.map(item=>
    `
    <span class="cat">${item}</span>
    
    `
    
    ).join("")

  categoriesContainer.addEventListener("click",(e)=>{
    const selectedcat = e.target.textContent
    selectedcat==="All" ? displayProducts(data) : displayProducts(data.filter((item)=>item.cat===selectedcat))
  }) 
}


const setCategories = ()=>{
  const allCats = data.map(item=>item.cat)
  console.log(allCats)
  /**
   * Here we are just adding "ALL" item to from front spo created an array,
   * in which first ele is all then rest element from data array. 
   */
  const Cats =  ["All", ... allCats.filter((item,i)=>{
    return allCats.indexOf(item)===i
  })]
  displayCategories(Cats)
}

const setPrice= ()=>{
  const Price = data.map(item=>item.price)
  /**
   * if we dont use ... it will give error so we have use ... get max and min
   */
  let miniprice =Math.min(...Price)
  let maxiprice =Math.max(...Price)
  // console.log(miniprice,maxiprice)
  priceRange.min = miniprice
  priceRange.max=maxiprice
  priceRange.value = maxiprice
  priceValue.textContent= "$"+ maxiprice
  
  
  priceRange.addEventListener("input",(e)=>{
    val=e.target.value
    priceValue.textContent="$"+val
    displayProducts(data.filter(item=> item.price<=val))
  })
}

setCategories()
setPrice()






