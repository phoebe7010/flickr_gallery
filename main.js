/*
d61e30a1010fe3e1dab106d3a2df0f21
*/
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const key = "d61e30a1010fe3e1dab106d3a2df0f21";
const per_page = 5; 
const tagmode = "any"; //기본값이므로 굳이 안쓰겠다  
const privacy_filter = 5; //기본값이므로 굳이 안쓰겠다 
const format = "json"; 

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`; 

//해당 url값으로 비동기 방식 데이터 호출
fetch(url) //url호출 
//호출된 데이터가 전달완료가 되면 해당 데이터값을 json객체로 변환 
.then(data =>{
    console.log(data); 
    let result = data.json();
    return result;  
     
})
//변환된 json객체로 전달받아서 필요정보값만 호출 
.then(json=>{
    console.log(json); 
    let items = json.photos.photo; 
    console.log(items); 
})