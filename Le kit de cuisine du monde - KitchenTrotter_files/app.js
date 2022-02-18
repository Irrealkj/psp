// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).ready(function(){
//    $(document).foundation();
    $(document).foundation({
        equalizer : {
          equalize_on_stack: true
        }
    });
 
});


/*ADDEED TO MAKE THE MENU WORK*/

$('.menu-opener').click(function(){
	$('body').toggleClass("nav-open");
});