window.onload = function() {
    function slideshow(slideshow) {
        /**
         * step1 check element and image length
         */

        if (!window.document.getElementById(slideshow)) {
            console.error('#'+slideshow+' Not Found')
            return
        }

        var timeInterval = 4300, current = 0;

        var slideshow = window.document.getElementById(slideshow)
        var images = slideshow.getElementsByTagName('li')
        var imageLength = images.length

        slideshow.classList.add('slideshow')
        images.item(current).classList.add('active')

        if (imageLength == 1) return

        /**
         * step2 createElement
         */
        var checkRadio = createCheckRadio()
        var spans = checkRadio.getElementsByTagName("span")

        var slidebar = createSlidebar()

        bindSlideShowEvent()
        var showing = setInterval(autoSlideShow, timeInterval)

        function createSlidebar() {
            var slidebar_left = document.createElement('div')
            slidebar_left.className = 'slidebar_left'
            slidebar_left.innerText = '‹'
            slideshow.appendChild(slidebar_left)
            slidebar_left.onclick = function() {var i = current <= 0 ? imageLength - 1 : current - 1;spans.item(i).click()}
            slidebar_left.onmouseover = function() {AutoSlideShowControl(false)}
            slidebar_left.onmouseout = function() {AutoSlideShowControl(true)}

            var slidebar_right = document.createElement('div')
            slidebar_right.className = 'slidebar_right'
            slidebar_right.innerText = '›'
            slideshow.appendChild(slidebar_right)
            slidebar_right.onclick = function() {spans.item((current + 1) % imageLength).click()}
            slidebar_right.onmouseover = function() {AutoSlideShowControl(false)}
            slidebar_right.onmouseout = function() {AutoSlideShowControl(true)}
        }

        function createCheckRadio() {
            var checkRadio = document.createElement('div')
            checkRadio.innerHTML = ''
            for (var i = 0; i < imageLength; i++) {
                if (i == current) {
                    checkRadio.innerHTML += '<span class="on"></span>'
                } else {
                    checkRadio.innerHTML += '<span></span>'
                }
            }
            checkRadio.className = 'check_radio'
            slideshow.appendChild(checkRadio)
            return checkRadio
        }

        function autoSlideShow() {
            spans.item((current + 1) % imageLength).click()
        }

        function AutoSlideShowControl(flag = false) {
            if (!flag) {
                clearInterval(showing)
            } else {
                showing = setInterval(autoSlideShow, timeInterval)
            }
        }

        function bindSlideShowEvent() {
            for (var i = 0; i < imageLength; i++) {
                (function(j) {
                    spans[j].onclick = function() {
                        if (current === j) return

                        this.className = 'on'

                        if (current < j) {
                            images.item(current).classList.add('moving_left')
                            images.item(j).className = 'next moving_left'
                        } else {
                            images.item(current).classList.add('moving_right')
                            images.item(j).className = 'prev moving_right'
                        }

                        // remove current span class="on"
                        for (var k = 0; k < imageLength; k++) {
                            if (j !== k && spans.item(k).className == 'on') {
                                spans.item(k).removeAttribute("class")
                            }
                        }

                        setTimeout(function() {
                            images.item(current).removeAttribute("class")
                            images.item(j).className = 'active'
                            current = j
                        }, 300)

                    }

                    images.item(j).onmouseover = function() {
                        AutoSlideShowControl(false)
                    }

                    images.item(j).onmouseout = function() {
                        AutoSlideShowControl(true)
                    }

                })(i)

            }
        }

    }

    slideshow('slideshow')
}
