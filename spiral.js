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

    $('.cascade').draggable();
});
