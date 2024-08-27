const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        if(!document.startViewTransition){
            $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
            $(this).parent()
            .siblings()
            .removeClass("show");
        }else{
            document.startViewTransition(() => {
                $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
            $(this).parent()
            .siblings()
            .removeClass("show");
            });
        }
        
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            if(!document.startViewTransition){
                $(".dashboard").toggleClass("dashboard-compact");
                return;
            }else{
                document.startViewTransition(() => {
                    $(".dashboard").toggleClass("dashboard-compact");
    
                });
            }
            
        }
    });
});