//cursor animations
const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('#cursor-readmore');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
    cursorText.setAttribute("style", "top: "+(e.pageY - 115)+"px; left: "+(e.pageX - 115)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

//cursor - READ MORE animation

$(function(){
    if ($(window).width() > 960) {
        $(".img-zoom").on('mouseover', function(){
            gsap.to($('#cursor-readmore'),{css:{display: "block"}, duration:0.5});
            gsap.to($('.cursor'),{css:{display:"none"}, duration:0.25});
        })
    }
})

$(function(){
    if ($(window).width() > 960) {
        $(".img-zoom").on('mouseleave', function(){
            gsap.to($('#cursor-readmore'),{css:{display:"none"}, duration:0.25});
            gsap.to($('.cursor'),{css:{display:"block"}, duration:0.25});
        })
    }
})

// scroll triggers - onload
$(function(){
    gsap.registerPlugin(ScrollTrigger);
})


$(function(){
    //home page: animation for project title
    gsap.to($("#project1-h1"), {scrollTrigger: {
                                    trigger: "#project1-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                x: -40,
                                duration: 1,
                                delay: 1});
    gsap.to($("#project1-h1"), {scrollTrigger: {
                                    trigger: "#project1-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css: {opacity: "1"},
                                duration: 1,
                                delay: 0.5});

    gsap.to($("#project2-h1"), {scrollTrigger: {
                                    trigger: "#project2-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                x: 20,
                                duration: 1,
                                delay: 1});
    gsap.to($("#project2-h1"), {scrollTrigger: {
                                    trigger: "#project2-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css: {opacity: "1"},
                                duration: 1,
                                delay: 0.5});

    gsap.to($("#project3-h1"), {scrollTrigger: {
                                    trigger: "#project3-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                x: -40,
                                duration: 1,
                                delay: 1});
    gsap.to($("#project3-h1"), {scrollTrigger: {
                                    trigger: "#project3-h1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css: {opacity: "1"},
                                duration: 1,
                                delay: 0.5});

    //home page: animation for project graphics
    gsap.to($("#project1-graph"), {scrollTrigger: {
                                    trigger: "#project1-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"1"},
                                duration: 0.25});
    gsap.to($("#project1-graph"), {scrollTrigger: {
                                    trigger: "#project1-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                               x: 20,
                                duration: 0.25});
    gsap.to($("#project2-graph"), {scrollTrigger: {
                                    trigger: "#project2-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"1"},
                                duration: 0.25});
    gsap.to($("#project2-graph"), {scrollTrigger: {
                                    trigger: "#project2-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                x:-40,
                                duration: 0.25});
    gsap.to($("#project3-graph"), {scrollTrigger: {
                                    trigger: "#project3-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"1"},
                                duration: 0.25});
    gsap.to($("#project3-graph"), {scrollTrigger: {
                                    trigger: "#project3-graph",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                x: 20,
                                duration: 0.25});

    //home page: animation for project graphics
    gsap.to($("#green-circle-1"), {scrollTrigger: {
                                    trigger: "#green-circle-1",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"0.3", transform: "scale(1.2,1.2)"},
                                duration: 1});
    gsap.to($("#green-circle-2"), {scrollTrigger: {
                                    trigger: "#green-circle-2",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"0.3", transform: "scale(1.2,1.2)"},
                                duration: 1});
    gsap.to($("#green-circle-3"), {scrollTrigger: {
                                    trigger: "#green-circle-3",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"0.3", transform: "scale(1.2,1.2)"},
                                duration: 1});
    gsap.to($("#green-circle-4"), {scrollTrigger: {
                                    trigger: "#green-circle-4",
                                    start: "top center",
                                    scrub: 2,
                                    },
                                css:{opacity:"0.3", transform: "scale(1.2,1.2)"},
                                duration: 1});
});


// projecct pages: slide-in effect on load
$(function(){
    $(".slide-in").each(function() {
        gsap.to($(this), {scrollTrigger: {
                                trigger: this,
                                start: "top bottom"},
                            y: -20,
                            duration: 1,
                            delay: 0.5});
      });

    $(".slide-in").each(function() {
        gsap.to($(this), {scrollTrigger: {
                            trigger: this,
                            start: "top bottom"},
                        css: {opacity:"1"},
                        duration: 1,
                        delay: 0.5});
    });
});




// Modal - Image Lightbox
var $imageSrc; 
$(document).ready(function() {

    // Gets the image src from the data-src on each button 
    $('.container-fluid img').click(function() {
        $imageSrc = $(this).data('bigimage');
        console.log($imageSrc);  
        $("#modal-image").attr('src', $imageSrc);
        console.log($("#modal-image").attr("src")); 
        // when the modal is opened autoplay it  
        $('#myModal').on('shown.bs.modal')
    });

    // reset the modal image
    $('#myModal').on('hide.bs.modal', function (e) {
            $("#modal-image").attr('src',''); 
    }) 
});