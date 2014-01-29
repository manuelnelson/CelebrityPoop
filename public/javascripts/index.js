/**
 * Created by elnel_000 on 1/28/14.
 */
$(function(){
    $('#pooSearch').keypress(function(e){
         if(e.which == 13){
             e.preventDefault();
             var value = $(this).val();
             document.location.href = '/?name=' + value;
         }
    })
})