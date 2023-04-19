

document.addEventListener('keypress',function(e){
    if(e.key == "Enter"){
        alert("sddfgsg");
    }
}
);

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

