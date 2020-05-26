

var serverURL = "http://localhost:8080";
let items=[];



function init(){
    $('#btn-register').on('click',function(){register();})
}


class Item{
    constructor(code,title,price,description,category,image,user){
        this.code = code;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.user = "Christopher";
    }
}

function register(){
    //save the input values into variables
    var code = $('#code').val();
    var title = $('#title').val();
    var price= $('#price').val();
    var description = $('#description').val();
    var category = $('#category').val();
    var image = $('#image').val();
    var user = user;
    
    if(code !="" && price != "" && title != ""){
        var newItem = new Item(code,title,price,description,category,image);
        items.push(newItem);
        var jsonString = JSON.stringify(newItem);
        console.log(newItem);
        console.log(items);
    }
    else{
        alert("Please fill all fields");
    }
    $.ajax({
        url:serverURL+"/api/items",
        type:"POST",
        contentType:"application/json",
        data:jsonString,
        success:function(){
            $('#alert-box').removeClass('hidden');
            setTimeout(function(){
                $('#alert-box').addClass('hidden');
            },3000);
        }
    });
    
    clearForm();

}

function clearForm(){
    var code = $('#code').val();
    var title = $('#title').val();
    var price = $('#price').val();
    var description = $('#description').val();
    var category = $('#category').val();
    var image = $('#image').val();
}


window.onload=init;