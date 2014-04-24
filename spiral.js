$(document).ready(function()
{
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
