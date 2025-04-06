let price=document.getElementById('price');
let title=document.getElementById('title')
let taxes=document.getElementById('taxes');

let ads=document.getElementById('ads');

let total=document.getElementById('total');

let discount=document.getElementById('discount');

let count=document.getElementById('count');
let category=document.getElementById('category');
let creat=document.getElementById('creat');

let mood='creat'
let tmp;

// get total function()
function getTotale(){
    if(price.value !='' ){
        let result= ( +price.value+   +taxes.value+  +ads.value) -
    +discount.value;
    total.innerHTML=result;
    
}
}

//creat btn

let newpro;
if(localStorage.product !=null){
    newpro=JSON.parse(localStorage.product)
}
else{
    newpro=[];
}


creat.onclick=function(){
   let newdata={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    total:total.innerHTML,
    discount:discount.value,
    count:count.value,
    category:category.value,
    }
    if(mood==='creat'){
    if(newdata.count>1){
    for(let i=0;i<newdata.count;i++){
        newpro.push(newdata);
    }    
    }
    
    else{
        newpro.push(newdata)
    }
    }
    else if(mood==='update'){
        newpro[tmp]=newdata;
        mood='creat';
        creat.innerHTML='creat';
        count.style.display='block';
    }
    
    localStorage.setItem('product',JSON.stringify(newpro))
    //clear function
    clear()
    //data show function
    datashow()
}
//end creat btn

//start clear input function
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    
}
//end clear function
//tabel function
function datashow(){
    let tabel='';
    for(let i=0; i< newpro.length;i++){
        tabel +=`
        <tr>
                            <td>${i+1}</td>
                            <td>${newpro[i].title}</td>
                            <td>${newpro[i].price}</td>
                            <td>${newpro[i].taxes}</td>
                            <td>${newpro[i].ads}</td>
                            <td>${newpro[i].discount}</td>
                            <td>${newpro[i].total}</td>
                            <td>${newpro[i].category}</td>
                            
                            <td><button onclick="updatedata(${i})" id="update-btn">update</button></td>
                            <td><button onclick="dalete(${i})" id="delete-btn">delete</button></td>


                        </tr>
        
        `
    }
    
    document.getElementById('tbody').innerHTML=tabel;
    
    let deletbtn=document.getElementById('deletbtn');
    if(newpro.length>0){
        deletbtn.innerHTML=`
        <button onclick="deletb()" >delete all</button>`
    }
    else{
        deletbtn.innerHTML='';
    }
    
}
datashow()

//delet data
function dalete(i){
 newpro.splice(i,1);
 localStorage.product=JSON.stringify(newpro);

 datashow();

}
///delete all button
function deletb(){
    localStorage.clear();
    newpro.splice(0);
    
datashow()
}
function updatedata(i){
    title.value=newpro[i].title;
    price.value=newpro[i].price;
    taxes.value=newpro[i].taxes;
    ads.value=newpro[i].ads;
    category.value=newpro[i].category;
    discount.value=newpro[i].discount;
    getTotale()

    count.style.display='none';
    creat.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })    

}
let searchvalu='title';
function searchmood(id)
{
    let search=document.getElementById('search');
    if(id==='search-title')
    {
        searchvalu='title';
        search.placeholder='search by title';

    }
    else {
        searchvalu='category';
        search.placeholder='search by category';
    }
    search.focus()
}
function searchaction(value){
    let tabel;

    if(searchvalu=='title'){
        
        for(let i=0;i<newpro.length;i++){
            if(newpro[i].title.includes(value))
            tabel+=`
        <tr>
                            <td>${i}</td>
                            <td>${newpro[i].title}</td>
                            <td>${newpro[i].price}</td>
                            <td>${newpro[i].taxes}</td>
                            <td>${newpro[i].ads}</td>
                            <td>${newpro[i].discount}</td>
                            <td>${newpro[i].total}</td>
                            <td>${newpro[i].category}</td>
                            
                            <td><button onclick="updatedata(${i})" id="update-btn">update</button></td>
                            <td><button onclick="dalete(${i})" id="delete-btn">delete</button></td>


                        </tr>
        
        `
    
    
    
        }
    }
    else{
        for(let i=0;i<newpro.length;i++){
            if(newpro[i].category.includes(value))
            tabel+=`
        <tr>
                            <td>${i}</td>
                            <td>${newpro[i].title}</td>
                            <td>${newpro[i].price}</td>
                            <td>${newpro[i].taxes}</td>
                            <td>${newpro[i].ads}</td>
                            <td>${newpro[i].discount}</td>
                            <td>${newpro[i].total}</td>
                            <td>${newpro[i].category}</td>
                            
                            <td><button onclick="updatedata(${i})" id="update-btn">update</button></td>
                            <td><button onclick="dalete(${i})" id="delete-btn">delete</button></td>


                        </tr>
        
        `
    
    
    
        }
    }

    document.getElementById('tbody').innerHTML=tabel;
    
}
