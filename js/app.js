/* start spinner */
const toggleSpinner = (state) =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = state;

}
/* end spinner */

/* start search Title */
const searchTitle = (state) => {
    const searchTitle = document.getElementById('search-title')
    searchTitle.style.display = state;
}

/* end search title */

/* start search phone */
const searchPhone = () => {
    toggleSpinner('block');
    const errorForWriteAnything = document.getElementById('error-for-write-anything')
    errorForWriteAnything.style.display = 'none';
    const errorForWriteNothing = document.getElementById('error-for-write-nothing')
    errorForWriteNothing.style.display = 'none';
    const searchPhonesContainer = document.getElementById('searchPhonesContainer');
    searchPhonesContainer.textContent = ''


    const searchText = document.getElementById('search-text').value;
    if(searchText === ''){
        const errorForWriteNothing = document.getElementById('error-for-write-nothing')
        errorForWriteNothing.style.display = 'block';
        const searchPhonesContainer = document.getElementById('searchPhonesContainer');
        searchPhonesContainer.textContent = ''
        toggleSpinner('none')
    }
    /* console.log(searchText) */
    else{
        document.getElementById('search-text').value =''
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        /* console.log(url)  */
        fetch(url)
        .then(res => res.json())
        .then(data => showSearchPhone(data.data.slice(0,20)))

 }

}

const showSearchPhone = (phones) => {
    console.log(phones)
    if (phones.length == 0){
        const errorForWriteAnything = document.getElementById('error-for-write-anything')
        errorForWriteAnything.style.display = 'block';
        searchTitle('block')
        toggleSpinner('none');
    }
    for(const phone of phones){
        const searchPhonesContainer = document.getElementById('searchPhonesContainer')
        const div = document.createElement('div');
        div.classList.add('col');
        
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Name: ${phone.phone_name}</h5>
                      <p id="tags" class="card-text">Brand: ${phone.brand ? phone.brand : 'No Brand Name'}</p>
                      <button onclick="detailsPhone('${phone.slug}')" type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        searchPhonesContainer.appendChild(div);
    }
    toggleSpinner('none');
}

/* start show details */

const detailsPhone = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showDetailsPhone(data.data))
}

const showDetailsPhone = (phone) =>{
    /*  console.log(meal); */
     const searchPhonesContainer = document.getElementById('searchPhonesContainer');
     searchPhonesContainer.textContent = ''
     const searchResultDescriptionContainer = document.getElementById('searchResultDescriptionContainer');
     searchResultDescriptionContainer.textContent ='';
     const div = document.createElement('div');
     div.classList.add('for-add');
     div.innerHTML = `
             
     <div class="row g-0">
     <div class="col-md-4">
       <img src="${phone.image}" class="img-fluid w-100 rounded-start" alt="...">
     </div>
     <div class="col-md-8">
       <div class="card-body">
         <h3 class="card-title"><span class= "name">Name: </span> ${phone.name}</h3>
         <h4 id="tags" class="card-text"> <span class= "name">Brand: </span>${phone.brand ? phone.brand : 'No Brand Name'}</h4>
         <h4 id="tags" class="card-text"><span class= "name">Release Date: </span> ${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate Published'}</h4>
         <h4 class="card-features"><span class= "name">Main Features: </span> 
         <h5 class="card-features"><span class= "name">Storage: </span> ${phone.mainFeatures.storage}</h5>
         <h5 class="card-features"><span class= "name">Display Size: </span> ${phone.mainFeatures.displaySize}</h5>
         <h5 class="card-features"><span class= "name">Chipset: </span>: ${phone.mainFeatures.chipSet}</h5>
         <h5 class="card-features"><span class= "name">Memory: </span>: ${phone.mainFeatures.memory}</h5>
         </h5>
         <h5 class="card-features"><span class= "name">Sensors: </span>${phone.mainFeatures.sensors} </h5>


       </div>
     </div>
     `
     searchResultDescriptionContainer.appendChild(div);
 }
 


/* end show details */