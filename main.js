var curr_page = 1;

$( function() {
   
    const urlParams = new URLSearchParams(window.location.search);
    curr_page = urlParams.get('page');
    retrieve_users(curr_page);

});

// Delete runtime resource from Graph
$("body").on("click", ".btn-delete", function(){
	
    if(confirm("are you sure you want to delete user: "+$(this).data("id") ) )
    {
        delete_user($(this).data("id"));
    }
});


function retrieve_users(page){
    $.ajax('https://reqres.in/api/users?page='+curr_page, {
        data: {
            per_page: 3
        }
    })
    .then(
        function success(obj) {
            console.log(obj.data);
            console.log(obj);

            obj.data.forEach(function(item){
                console.log(item['first_name']);
                $('#mytable').append('<tr>');
                $('#mytable').append ('<td><img src="'+item["avatar"]+'"></td><td>'+item["first_name"]+'</td><td>'+item["last_name"]+'</td><td><button class="btn btn-delete" data-id="'+item["id"]+'">DELETE</button></td>');

                for(var i=0;i++;i<item.length)
                $('#mytable').append('</tr>');

            })

            //alert('User\'s name is ' + obj.data.first_name);
        },

        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );

}

function delete_user(id){
    $.ajax({
        url: "https://reqres.in/api/users/"+id,
        type: "DELETE",
        success: function(response){
            console.log(response);
        },
        fail: function(r){
            console.log("failed to delete");
        }
    });
                
}