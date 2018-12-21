$(function () {

    // Mobile Menu
    $(".mobile-menu-toggle").on('click', function () {
        $("nav.mobile-menu")
            .addClass("open")
            .css("transform", "translateX(0)");

    });

    // Click off Mobile Menu
    $(".close-mobile-menu").on('click', function () {
        $("nav.mobile-menu")
            .removeClass("open")
            .css("transform", "translateX(100%)");
    });


    // Scroll to  target given anchor with an id
    $("a[href^=\\#]").on('click', function (e) {

        // prevents native anchor behavior
        e.preventDefault();

        // store destination
        var dest = $(this).attr('href');

        // close mobile menu
        $("nav.mobile-menu")
            .removeClass("open")
            .css("transform", "translateX(100%)");


        // animate towards the dest via 2ms
        $('html, body').animate({
            scrollTop: $(dest).offset().top
        }, 2000);
    });

});