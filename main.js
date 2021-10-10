/*
d61e30a1010fe3e1dab106d3a2df0f21
*/
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const key = "d61e30a1010fe3e1dab106d3a2df0f21";
const per_page = 50; 
const tagmode = "any"; //기본값이므로 굳이 안쓰겠다  
const privacy_filter = 5; //기본값이므로 굳이 안쓰겠다 
const format = "json"; 

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`; 

const frame = document.querySelector("#list"); 

//해당 url값으로 비동기 방식 데이터 호출
fetch(url) //url호출 
//호출된 데이터가 전달완료가 되면 해당 데이터값을 json객체로 변환 
.then(data =>{
    let result = data.json();
    return result;      
})
//변환된 json객체로 전달받아서 필요정보값만 호출 
.then(json=>{    
    let items = json.photos.photo; 
    let htmls =''; 
  // console.log(items); 

    //배열의 갯수만큼 반복처리 
    items.map(data=>{
        console.log(data); 
        
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        //frame 안쪽에 반복되며 생성될 태그 구조를 문자열 형태로 만든 다음에 
        //반복돌 때마다 생성할 DOM구조를 중첩해서 문자열 형태로 변수 htmls에 저장 
        htmls+=`
            <li class="item">
                <div>
                    <a href="#">
                        <img src=${imgSrc} alt="">
                    </a>
                    <p>${data.title}</p>
                </div>
            </li>
            `;
 
    });

    //완성된 DOM문자열을 frame 에 삽입해서 동적 리스트 DOM생성 
    frame.innerHTML = htmls; 
    
    //동적으로 생성된 이미지의 전체 갯수를 구함 
    const imgs = frame.querySelectorAll("img"); 
    const len = imgs.length; 
    let count =0; 

    //이미지의 갯수만큼 반복을 돌면서 
    for(let el of imgs){
        //각 이미지의 소스까지 로딩이 완료되면 1씩 count값 증가 
        el.onload =()=>{
            count++; 
            //카운트값이 전체 이미지갯수와 동일해지면 
            //모든 이미지소스가 로딩이 완료되면 isoLayout 함수 호출 
            if(count==len) isoLayout();
        }
    }
   
});

//isotope 호출 
function isoLayout(){
    //isoLayout 함수 호출 될때 list에 on클래스 를 붙여서 
    //아래에서 위로 올라오는 초기 모션 추가 
    //이미지로딩이 될 때까지 모든 이미지가 isoLayout이 적용되지 않으므로 
    //지저분한 레이아웃을 숨기기 위한 용도 
    frame.classList.add("on"); 
    new Isotope("#list", {
        itemSelector : ".item", 
        columnWidth : ".item",
        transitionDuration : "0.5s"
    })
}