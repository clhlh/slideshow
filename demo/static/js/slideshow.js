window.onload = function() {
    function slideshow(slideshow) {
        if (!window.document.getElementById(slideshow)) {
            console.error('Slideshow Not Found')
            return
        }

        var slideshow = window.document.getElementById('slideshow')
        var images = slideshow.getElementsByTagName('li')
        var length = images.length
        var current = 0;
        slideshow.className = 'slideshow'
        images.item(current).className = 'active'
        var check_radio = createCheckRadio()

        addCheckRadioClickEvent()

        // var prev_left = document.createElement("div")
        // prev_left.className = "prev_image"
        // prev_left.innerText = "<"
        // slideshow.appendChild(prev_left)

        function createCheckRadio() {
            var check_radio = document.createElement('div')
            check_radio.innerHTML = ''
            for (var i = 0; i < length; i++) {
                if (i == current) {
                    check_radio.innerHTML += '<span class="on"></span>'
                } else {
                    check_radio.innerHTML += '<span></span>'
                }
            }
            check_radio.className = 'check_radio'
            slideshow.appendChild(check_radio)
            check_radio.style.marginLeft = -check_radio.offsetWidth / 2
            return check_radio
        }

        function addCheckRadioClickEvent() {
            var spans = check_radio.getElementsByTagName("span");
            var spans_length = spans.length;
            for (var i = 0; i < spans_length; i++) {
                (function(j) {
                    spans[j].onclick = function() {
                        if (current === j) return

                        this.className = 'on'

                        if (current < j) {
                            images[current].classList.add('moving_left')
                            images[j].className = 'next moving_left'
                        } else {
                            images[current].classList.add('moving_right')
                            images[j].className = 'prev moving_right'
                        }

                        // remove current span class="on"
                        for (var k = 0; k < spans_length; k++) {
                            if (j !== k && spans.item(k).className == 'on') {
                                spans.item(k).removeAttribute("class")
                            }
                        }

                        setTimeout(function(){
                            images[current].removeAttribute("class")
                            images[j].className = 'active'
                            current = j
                        }, 300)

                    }
                })(i)
            }
        }

    }

    slideshow('slideshow')
}
