var serverURL = "http://localhost:8080";
var items=[];
function fetchCatalog(){
    $.ajax({
        url: serverURL+"/api/items",
        type:"GET",
        success:function(res){
            console.log("works",res);
            for(var i = 0; i<res.length;i++){
                if(res[i].user=="Christopher" && res[i].title != "" && res[i].description!="" && res[i].code!=""){
                    items.push(res[i]);
                }
            }
            displayCatalog();
        },
        error:function(details){
            console.log("not working",details);
        }
    })
}

/*let items=[
    {
       code: '123',
        title: 'Desktop Computer',
      price: 2000,
        description: 'Computer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern  workloadsComputer for modern workloadsComputer for modern workloadsComputer for modern workloads',
        category: 'Computers',
        image: 'https://i.dell.com/das/dih.ashx/527x340/sites/csimages/app-merchandizing_images/all/xps-tower-geforce.png'
    },
    {
        code: '124',
        title: 'Knife Set',
        price: 250,
        description: 'Fancy chef knife set',
        category: 'Housewares',
        image: 'https://secure.img1-fg.wfcdn.com/im/59538211/resize-h800%5Ecompr-r85/1108/11086804/Wusthof+Gourmet+18+Piece+Knife+Block+Set.jpg'
    },
    {
        code: '125',
        title: 'Coffee Table',
        price: 1599,
        description: 'A quality wood table',
        category: 'Furniture',
        image: 'https://secure.img1-ag.wfcdn.com/im/28439128/resize-h800%5Ecompr-r85/7292/72927853/Thornhill+Coffee+Table+with+Storage.jpg'
    }
];*/

function displayCatalog(){
    //travel array
    //$('#list-items').val();
    for(i=0;i<items.length;i++){
        let item = items[i];
       drawItem(item);
       
    }


  
    //display on the DOM
   
}
function drawItem(product){
    var layout = ` <div id="${product.code}" class="displayedItem"> 
                            <img src="${product.image}">
                            <h4>${product.title}</h4>
                            <h5 class="itemPrice">$${product.price}</h5>
                            <p>${product.description}</p>
                            <div>
                                <button class="btn btn-dark">Add to Cart</button>
                            </div>
                      </div>
       
       `;
       //console.log(i,layout);
       $('#catalog').append(layout);
}


function Search(){
    var searchText = $('#txt-search').val();
    //clear previous results
    $('#catalog').html("");

    //travel array and display the items that contain seachText in the title
    //OR the description contains
    // or the code contains the searcText
    //create a function that
    
    for(var i=0;i<items.length;i++){
        var item = items[i];
            if(item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText.toLowerCase()) || item.code.includes(searchText) || item.price.toString().includes(searchText)){
                drawItem(item);
    }
    

    }
}

function init(){
    fetchCatalog();
    $('#btn-search').click(Search);

    $('#txt-search').change(function(){
        var searchText = $('#txt-search').val();
        for(var i=0;i<items.length;i++){
            if(searchText==''){
                //$('#'+items[i].code).show();
                drawItem(items[i]);
            }
        }
    });
    
    $('#txt-search').keypress(function(e){
        if(e.keyCode == 13){
            Search();
        }
    });
    
}
//homework







window.onload=init;
