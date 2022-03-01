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

/* start show more */
const showMore = ( state) => {
    const showMoreButton = document.getElementById('show-more')
    showMoreButton.style.display = state
}
const searchDescription = ( state) => {
    const searchDes = document.getElementById('search-description')
    searchDes.style.display = state
}

/* end show more */


const common = (phone)=>{
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

const lengthCheckForError = (phones) =>{
    if (phones.length == 0){
        const errorForWriteAnything = document.getElementById('error-for-write-anything')
        errorForWriteAnything.style.display = 'block';
        toggleSpinner('none');
    }
}


/* start search phone */
const searchPhone = () => {
    toggleSpinner('block');
    searchDescription('none')
    
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
            .then(data => showSearchPhone(data.data))
        }
        
    
        

 }
 


const showSearchPhone = (data) => {
   
    const searchResultDescriptionContainer = document.getElementById('searchResultDescriptionContainer');
     searchResultDescriptionContainer.textContent ='';
     let phones = data;
     lengthCheckForError(phones);
     phones = data.splice(0,20)
     
    
    document.getElementById('show-more').addEventListener('click',function(){
       
        phones = data.splice(21,40)
        for(const phone of phones){
            common(phone)
            showMore('none')
        }
        
    })

        searchTitle('block')

            for(const phone of phones){
                common(phone)
        
                showMore('block')
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
    showMore('none')
    searchTitle('none')
    searchDescription('block')
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
