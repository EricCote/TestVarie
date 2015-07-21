/// <reference path="../typings/jquery/jquery.d.ts"/>


$(function() {
    var totalMax=50;
    $(".slider").slider({min:0, 
                         max:50, 
                         animate: true,
                         slide: function(event, ui) {
                           // Get current total
                           var total = 0;    
            
                           $(".slider").not(this).each(function() {
                               total += $(this).slider("option", "value");
                           });    
  
                           var max = totalMax - total;                          
                           if (max - ui.value >= 0) {
                               // Need to do this because apparently jQ UI
                               // does not update value until this event completes
                              total += ui.value;
                              var num = $(this).attr("id").substring( $(this).attr("id").length-1);
                              $("#txtSlider" + num).val(ui.value);
                           } else {
                               return false;
                           }
                         }
    }).slider("pips").slider("float");
    
   
    $(".slider").each(function() {
       var num = $(this).attr("id").substring( $(this).attr("id").length-1);
       $("#txtSlider" + num).change(function() {
           if (typeof $(this).val() == "number") {
             $("#slider" + num).slider("value",$(this).val());
           }  
       });
    });
    
   // $(".slider:nth-of-type(odd)").slider({min:0, max:100, animate: true}).slider("pips").slider("float");
});


//5=="5"   True
//5==="5"  False

// !=
// !==

