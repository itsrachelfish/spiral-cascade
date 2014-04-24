function random_text()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789               ";
    var length = Math.floor((Math.random()*75)+25);

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(document).ready(function()
{
    // Randomly generate elements
    for(var i = 0; i < 25; i++)
    {
        var random_div = $('<div>'+random_text()+'</div>');
        random_div.css({
            position: 'absolute',
            top: Math.floor((Math.random() * $(window).height())),
            left: Math.floor((Math.random() * $(window).width())),
            backgroundColor: 'rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.random()+')',
            border: Math.floor(Math.random() * 10)+'px solid rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.random()+')',
            width: Math.random() * 100 + 50,
        });

        random_div.addClass('cascade');
        
        $('body').append(random_div);
    }
    
    $('body').on('click', '#hide', function()
    {
        $('.cascade').hide();
    });

    $('body').on('click', '#cascade', function()
    {
        var cascade = 0;
        
        $('.cascade').each(function()
        {
            $(this).show();
            $(this).css({opacity: 0}).delay(cascade).animate({opacity: 1});
            cascade += 50;
        });
    });

    $('body').on('click', '#edge', function()
    {
        var cascade = {top: [], bottom: [], left: [], right: []};

        // Hide everything
        $('.cascade').css({opacity: 0});
        
        $('.cascade').each(function()
        {
            var offset = $(this).offset();

            // Top row!
            if(offset.top < 200)
            {
                cascade.top.push({element: $(this), distance: offset.left});
            }

            // Right row!
            else if($('body').width() - offset.left < 200)
            {
                cascade.right.push({element: $(this), distance: offset.top})
            }

            // Bottom row!
            else if($('body').height() - offset.top < 200)
            {
                cascade.bottom.push({element: $(this), distance: Math.abs(offset.left - $('body').width())});
            }

            // Left row!
            else if(offset.left < 200)
            {
                cascade.left.push({element: $(this), distance: Math.abs(offset.top - $('body').height())});
            }
        });

        function compare(a,b) {
          if (a.distance < b.distance)
             return -1;
          if (a.distance > b.distance)
            return 1;
          return 0;
        }

        cascade.top.sort(compare);
        cascade.right.sort(compare);
        cascade.bottom.sort(compare);
        cascade.left.sort(compare);

        cascade.delay = 50;
        
        $.each(cascade.top, function(index, object)
        {
            object.element.show().css({opacity: 0}).delay(cascade.delay).animate({opacity: 1});
            cascade.delay += 50;
        });

        $.each(cascade.right, function(index, object)
        {
            object.element.show().css({opacity: 0}).delay(cascade.delay).animate({opacity: 1});
            cascade.delay += 50;
        });

        $.each(cascade.bottom, function(index, object)
        {
            object.element.show().css({opacity: 0}).delay(cascade.delay).animate({opacity: 1});
            cascade.delay += 50;
        });

        $.each(cascade.left, function(index, object)
        {
            object.element.show().css({opacity: 0}).delay(cascade.delay).animate({opacity: 1});
            cascade.delay += 50;
        });
    });

    $('.cascade').draggable();
});
