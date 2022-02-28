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
                      <p id="tags" class="card-text">Brand:${phone.brand ? phone.brand : 'No Brand Name'}</p>
                      <button onclick="detailsPhone()" type="button" class="btn btn-danger">Details</button>
                    </div>
                  </div>
        `
        searchPhonesContainer.appendChild(div);
    }
    toggleSpinner('none');
}