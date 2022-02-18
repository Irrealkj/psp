function redim_menu(){
    // Redimension only works in medium and long devices.
    if($(window).width() < 625){
        $('.menu_equalizer li a').width('100%').height('inherit').css('min-height',0);
    }else{
        // Get the total disponible space for the menu container
        $('.menu_equalizer').width("100%");
        var real = parseInt($('.menu_equalizer').width());

        // Get the space (width + margins + paddings) used by the excluded elements
        var max_height=0;
        var total_excluded=0;
        $('.menu_equalizer li a.excluded').each(function(){
            var padding_right = parseInt($(this).css("padding-right").replace("px",""));
            var padding_left  = parseInt($(this).css("padding-left").replace("px",""));

            var margin_right = parseInt($(this).css("margin-right").replace("px",""));
            var margin_left  = parseInt($(this).css("margin-left").replace("px",""));

            total_excluded += parseInt($(this).width()) + padding_right + padding_left + margin_right + margin_left;

            // Find the max element height
            $(this).height("auto");
            if(parseInt($(this).height()) > max_height) max_height = parseInt($(this).height());
        });
        // Diference between usable space and excluded elements space required
        var divisible_space = real - total_excluded;

        // Count the resizable elements and calculate the size for each one (I leave a 1 pixel tolerance for element)
        var resizable_elements =  $('.menu_equalizer li a:not(.excluded)').length;
        var element_width = (divisible_space / resizable_elements) - resizable_elements;

        // Resize elements looking its margins and paddings
        $('.menu_equalizer li a:not(.excluded)').each(function(){
            var padding_right = parseInt($(this).css("padding-right").replace("px",""));
            var padding_left  = parseInt($(this).css("padding-left").replace("px",""));

            var margin_right  = parseInt($(this).css("margin-right").replace("px",""));
            var margin_left   = parseInt($(this).css("margin-left").replace("px",""));

            $(this).width((element_width - padding_right - padding_left - margin_right - margin_left) + "px");

            // Find the max element height
            $(this).height("auto");
            if(parseInt($(this).height()) > max_height) max_height = parseInt($(this).height());
        });
        $('.menu_equalizer li a').height($('.menu_equalizer').height()).css('min-height',max_height + 'px');
    }
}

$(window).load(function() {
    $.fn.customToolTip = function() {
        var position;
        var className = ($(this).attr('position')) ? $(this).attr('position') : 'right';
        switch (className) {
            case 'top':
                position = {my: 'center bottom', at: 'center top-20'};
                break;
            case 'bottom':
                position = {my: 'center top', at: 'center bottom+20'};
                break;
            case 'left':
                position = {my: 'right center', at: 'left-20 center'};
                break;
            case 'right':
                position = {my: 'left center', at: 'right+20 center'};
                break;
        }

        $(this).tooltip({
            hide: 600,
            items: '[tt]',
            content: function() {
                return $(this).attr('tt');
            },
            position: position,
            tooltipClass: className
        });
    }

    $('.go-to-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 'slow');
    });

    /**** SET ALIGNEMENTS BEFORE AND AFTER IMAGES ARE LOADED ****/
    Foundation.utils.image_loaded($('img'), function(){
        Foundation.libs.equalizer.reflow();
        set_alignments();
         $('.hide-element').css('visibility', 'visible');
    });

    /*** Load menu with special fonts ****/
    redim_menu();

    $('div.alert-box a.close').on('click', function(){
        $(this).closest('div.alert-box').slideUp();
    });
});

$(window).resize(function(){
   redim_menu();
});

function set_alignments()
{

    /**** VERTICAL ALIGN MIDDLE ****/
    $('.valign-middle').each(function() {
        var diffHeight = $(this).parent().height() - $(this).height();
        if ((diffHeight > 0)) {
            $(this).css('margin-top', diffHeight / 2);
        }
    });

    /**** VERTICAL ALIGN BOTTOM ****/
    $('.valign-bottom').each(function() {
        $(this).parent().css('position', 'relative');
        var diffHeight = $(this).parent().height() - $(this).height();

        if (diffHeight > 0) {
            var width = $(this).width();
            $(this).css('position', 'absolute');
            $(this).css('bottom', '0');
            $(this).css('width', width);
        }
    });

}
