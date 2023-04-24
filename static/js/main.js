const genreBlock = document.querySelector("#genreButtons")
for(let i of document.querySelectorAll(".watchbtn")){
    i.addEventListener('click', function(){
        let id = i.id;
        console.log(id);
        $.ajax({
            url : '/addWatched',
            data: {id : id},
            type: 'POST'
        }).done(function(data){
            alert('Watched');
        });
    })
}

function btnClick(e){
    let id = e.target.id;
    console.log(id);
    $.ajax({
        url : '/addWatched',
        data: {id : id},
        type: 'POST'
    }).done(function(data){
        alert("Watched");
    });
}

var UserTag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var genresList = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family',
            'Fantasy', 'Film-Noir', 'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News',
            'Reality-TV', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western']
// Change according to user click and unclick
function onTagPage(){
    if(window.localStorage.getItem('userTag')!=null){
        console.log("flag 0");
        UserTag = JSON.parse(window.localStorage.getItem('userTag'));
    }
    else{
        console.log("hello");
    }
    for(let i = 0; i< 26; i++){
        if(UserTag[i] == 0){
            genreBlock.innerHTML+=`<button type='button' id=b${i} onclick='changeTag(${i})' class='btn btn-outline-dark m-2'>${genresList[i]}</button>`
        }
        else{
            genreBlock.innerHTML+=`<button type='button' id=b${i} onclick='changeTag(${i})' class='btn btn-success m-2'>${genresList[i]}</button>`
        }
        
    }
    sendUserTag();
}
onTagPage();
function changeTag(butId){
    let tagVal = UserTag[butId];
    const chosenGenre = document.querySelector(`#b${butId}`)
    if(tagVal == 0){
        UserTag[butId] = 1;
        chosenGenre.className = "btn btn-success m-2" ;
    }
    else{
        UserTag[butId] = 0;
        chosenGenre.className =" btn btn-outline-dark m-2";
    }
    window.localStorage.setItem("userTag", JSON.stringify(UserTag));
    console.log(window.localStorage.getItem('userTag'));
    console.log(UserTag);
    sendUserTag();
}
// call this function on each update

function sendUserTag(){
    $.ajax({
        url : '/userTag',
        data: {tag : UserTag},
        type: 'POST'
    }).done(function(data){
        let inner = "";
        for(i of data["data"]){
            inner += '<div class="col"><div class="card shadow-sm"><img src="bthumb.webp" alt=""><div class="card-body"><p class="card-text">'+ i[0] + '</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" id="' + i[3] + '" class="btn btn-md btn-outline-secondary watchbtn" onclick = "btnClick(event)">Watch</button></div><small class="text-body-secondary">IMDB :  ' + i[2] + '</small></div></div></div></div>';
        }
        $('.row').empty(); //edited
        $('.row').append(inner);
    });
}
 

// document.addEventListener('keypress', function(){
//     sendUserTag();
// })
