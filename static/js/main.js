
for(let i of document.querySelectorAll(".watchbtn")){
    i.addEventListener('click', function(){
        let id = i.id;
        console.log(id);
        $.ajax({
            url : '/addWatched',
            data: {id : id},
            type: 'POST'
        }).done(function(data){
            console.log('success');
        });
    })
}

function btnClick(e){
    alert(e.target.id);
}

var UserTag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
// Change according to user click and unclick



// call this function on each update

function sendUserTag(){
    $.ajax({
        url : '/userTag',
        data: {tag : UserTag},
        type: 'POST'
    }).done(function(data){
        // document.querySelector(".row").innerHTML = "";
        let inner = "";
        for(i of data["data"]){
            inner += '<div class="col"><div class="card shadow-sm"><svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg><div class="card-body"><p class="card-text">'+ i + '</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" id="Loading" class="btn btn-md btn-outline-secondary watchbtn" onclick = "btnClick(event)">Watch</button></div><small class="text-body-secondary">IMDB : </small></div></div></div></div>';
        }
        $('.row').append(inner);
    });
}
 

// document.addEventListener('keypress', function(){
//     sendUserTag();
// })
