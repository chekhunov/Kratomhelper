document.addEventListener("DOMContentLoaded", function(){
    
    // Header
    
    let burger = document.querySelector('.header__burger');
    let burgerList = document.querySelector(".header__nav");
    let burgerClose = document.querySelector('.header__close-nav');

    burger.addEventListener('click', function(){
        burgerList.classList.add("active");
        document.querySelector('html').classList.add('overflow');
    });

    burgerClose.addEventListener('click', function(){
        burgerList.classList.remove('active');
        document.querySelector('html').classList.remove('overflow');
    });

    // /Header
    
    // Main input
    
    let allInput = document.querySelectorAll('.js-input');
    
    function checkInput(inputItems) {
        inputItems.forEach(function(item){
            let itemLenght = item.value.length;
            let inputWrapper = item.closest('.js-input-wrapper')
            if(itemLenght) {
                inputWrapper.classList.add('active-input');
            }else {
                inputWrapper.classList.remove('active-input');
            }
            item.addEventListener("keyup", function(){
                let itemLenght = item.value.length;
                if(itemLenght) {
                    inputWrapper.classList.add('active-input');
                }else {
                    inputWrapper.classList.remove('active-input');
                }
            });
        });
    }
    
    checkInput(allInput);
    
    // /Main input
    
    // Shop password 
    
    document.addEventListener("click", function(e){
        let item = e.target;
        
        if(item.closest(".show-password")) {
            let wrapperInput = item.closest(".js-input-wrapper");
            let activeInput = wrapperInput.querySelector(".js-input");
            let getState = activeInput.getAttribute("type");
            
            if(getState == "password") {
                activeInput.setAttribute("type", "text");
            }else {
                activeInput.setAttribute("type", "password");
            }
        }
    });
    
    // document.addEventListener("mouseup", function(e){
    //     let item = e.target;
        
    //     if(item.closest(".show-password")) {
    //         let wrapperInput = item.closest(".js-input-wrapper");
    //         let activeInput = wrapperInput.querySelector(".js-input");
    //         console.log(activeInput)
    //         activeInput.setAttribute("type", "password");
    //     }
    // });
    
    // document.addEventListener("mouseout", function(e){
    //     let item = e.target;
        
    //     if(item.closest(".show-password")) {
    //         let wrapperInput = item.closest(".js-input-wrapper");
    //         let activeInput = wrapperInput.querySelector(".js-input");
    //         console.log(activeInput)
    //         activeInput.setAttribute("type", "password");
    //     }
    // });
    
    // Drop
    
    var dropList = document.querySelectorAll('.js-drop-item');


    document.addEventListener('click', function(e){
        let element = e.target;
        
        if(element.closest('.js-drop-button')){
            let isActive = element.closest('.js-drop-item').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.js-drop-item').classList.remove('active');
            else
                element.closest('.js-drop-item').classList.add('active');
        }
        
        if(element.closest('.js-drop-contains')){
            let dropList = element.closest('.js-drop-item');
            let dropItems = dropList.querySelectorAll('.js-drop-contains');
            
            dropItems.forEach(item => {item.classList.remove('active')});
            element.closest('.js-drop-contains').classList.add('active');
            let innerContent = element.closest('.js-drop-contains').querySelector('.text').innerHTML;
            let dropInput = dropList.querySelector('.js-drop-input');
            
            if(dropInput) {
                dropInput.value = innerContent;
            }
            
            checkInput(allInput);
            
            // close dropdown
            dropList.classList.remove('active');
        }
    });
    
    document.querySelector('body').addEventListener('click', function(event){
        
        let dropItem = event.target.closest('.js-drop-item');
        
        if(!dropItem) {
            document.querySelectorAll('.js-drop-item').forEach(function(item){
                item.classList.remove('active');
            }); 
        }
        if(dropItem) {
            if(!dropItem.classList.contains("active")) {
                document.querySelectorAll('.js-drop-item').forEach(function(item){
                    item.classList.remove('active');
                });
            }
        }
        
    });
    
    // //Drop
    
    // mainSLider
    
    let arrows = document.querySelectorAll(".js-arrows");
    
     function initialSlider() {
        for(var i = 0;arrows.length > i; i++) {
            let slider = arrows[i].closest(".slider");
            let arrowNext = arrows[i].querySelector('.next');
            let arrowPrev = arrows[i].querySelector('.prev');
            let allItems = slider.querySelectorAll('.js-slider-item').length;
            
            if(allItems < 2) {
                arrowNext.classList.add("disabled");
            }
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item.show');
                let itemElseShow = slider.querySelector('.js-slider-item-else.show');
                let dotActive = slider.querySelector('.js-dot.active');
                
                if(slider.querySelector('.js-slider-item.show').nextElementSibling == null) {
                    return;
                }
                
                if(dotActive) {
                    dotActive.nextElementSibling.classList.add('active');
                    dotActive.classList.remove('active');
                }
                
                arrowPrev.classList.remove('disabled');
                
                if(itemElseShow) {
                    itemElseShow.nextElementSibling.classList.add('show');
                    itemElseShow.classList.remove('show');
                }
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                if(slider.querySelector('.js-slider-item.show').nextElementSibling == null) {
                    arrowNext.classList.add('disabled');
                }
            });
            
            arrowPrev.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item.show');
                let itemElseShow = slider.querySelector('.js-slider-item-else.show');
                let dotActive = slider.querySelector('.js-dot.active');
                
                if(slider.querySelector('.js-slider-item.show').previousElementSibling == null) {
                    return;
                }
                 
                if(dotActive) {
                    dotActive.previousElementSibling.classList.add('active');
                    dotActive.classList.remove('active');
                }
                
                arrowNext.classList.remove('disabled');
                
                if(itemElseShow) {
                    itemElseShow.previousElementSibling.classList.add('show');
                    itemElseShow.classList.remove('show');
                }
                
                itemShow.previousElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                if(slider.querySelector('.js-slider-item.show').previousElementSibling == null) {
                    arrowPrev.classList.add('disabled');
                }
            });

            var startPointX;
            var startPointY;
            slider.addEventListener("touchstart", function(event) {
                startPointX = event.changedTouches[0].screenX;
                startPointY = event.changedTouches[0].screenY;
            }, false);
            slider.addEventListener("touchend", function(event){
                var endPointX = event.changedTouches[0].screenX;
                var endPointY = event.changedTouches[0].screenY;
                
                if(startPointX - endPointX > 40) {
                    arrowNext.click();
                } else if(endPointX - startPointX > 40) {
                    arrowPrev.click();
                }
            }, false);
        }
    }
    

    initialSlider();
    
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.main-banner__nav__button')) {
            document.querySelectorAll('.main-banner__nav__button').forEach(function(item){
                item.classList.remove('active');
            });
            
            let mainItem = document.querySelectorAll('.main-banner__item')
            mainItem.forEach(function(item){
                item.classList.remove('show');
            });
            
            let buttonPrev = document.querySelector('.main-banner__arrows .prev');
            let buttonNext = document.querySelector('.main-banner__arrows .next');
            
            buttonPrev.classList.remove('disabled');
            let index = elem.getAttribute('data-index');
            
            if(index == 1) {
                buttonPrev.classList.add('disabled');
                buttonNext.classList.remove('disabled');
            }
            
            if(index == mainItem.length) {
                buttonNext.classList.add('disabled');
                buttonPrev.classList.remove('disabled');
            }
            
            document.querySelector('.main-banner__item[data-index= "'+ index + '"]').classList.add('show');
            elem.classList.add('active');
        }
    });
    
    // /Main SLider
    
     // Infinty slider
    
    let arrowsInfinity = document.querySelectorAll('.js-arrow-infinity');
    
    function initialInfinitySlider() {
        for(var i = 0;arrowsInfinity.length > i; i++) {
            let slider = arrowsInfinity[i].closest(".slider-infinity");
            let arrowNext = arrowsInfinity[i].querySelector('.next');
            let arrowPrev = arrowsInfinity[i].querySelector('.prev');
            let sliderList = slider.querySelector('.js-infinity-slider-list');
            
            
            var checkSlider = true;
            
            arrowNext.addEventListener('click', function() {
                
                setTimeout(() => {
                    checkSlider = true;
                }, 400);
                
                if(!checkSlider) {
                    return;
                }
                
                checkSlider = false;
                
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                let indexItemShow = itemShow.getAttribute('data-index');
                let allDots = slider.querySelectorAll('.js-dot');
                let activeDot = slider.querySelector('.js-dot.active');
                
                if(allDots.length > 1) {
                    if(indexItemShow % 3 == 0) {
                        if(activeDot.nextElementSibling == null) {
                            allDots[0].classList.add('active');
                            activeDot.classList.remove('active');
                        }else {
                            activeDot.nextElementSibling.classList.add('active');
                            activeDot.classList.remove('active');
                        }
                    }
                }
                
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                setTimeout(function(){
                    let newElem = itemShow;
                    itemShow.remove();
                    sliderList.append(newElem);
                },390);
                
            });
            
            arrowPrev.addEventListener('click', function() {
                setTimeout(() => {
                    checkSlider = true;
                }, 400);
                
                if(!checkSlider) {
                    return;
                }
                
                checkSlider = false;
                
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                let indexItemShow = itemShow.getAttribute('data-index');
                let allDots = slider.querySelectorAll('.js-dot');
                let activeDot = slider.querySelector('.js-dot.active');
                let lastElem = sliderList.lastElementChild;
                
                if(allDots.length > 1) {
                    if(indexItemShow % 3 == 0) {
                        if(activeDot.previousElementSibling == null) {
                            allDots[allDots.length - 1].classList.add('active');
                            activeDot.classList.remove('active');
                        }else {
                            activeDot.previousElementSibling.classList.add('active');
                            activeDot.classList.remove('active');
                        }
                    }
                }

                sliderList.prepend(lastElem);
                
                setTimeout(function(){
                    itemShow.previousElementSibling.classList.add('show');
                    itemShow.classList.remove('show');
                },20);
            });
            
            var startPointX;
            var startPointY;
            slider.addEventListener("touchstart", function(event) {
                startPointX = event.changedTouches[0].screenX;
                startPointY = event.changedTouches[0].screenY;
            }, false);
            slider.addEventListener("touchend", function(event){
                var endPointX = event.changedTouches[0].screenX;
                var endPointY = event.changedTouches[0].screenY;
                
                if(startPointX - endPointX > 40) {
                    arrowNext.click();
                } else if(endPointX - startPointX > 40) {
                    arrowPrev.click();
                }
            }, false);
        }
    }
    
    initialInfinitySlider();
    
    // //Infinty slider
    
    // More info
        
      function showMoreInfo() {
            
        let info = document.querySelectorAll('.js-item .js-content p');
        let content = document.querySelectorAll('.js-item .js-content');
        let moreButton = document.querySelectorAll('.js-item .js-more');
        
        if(info) {
            for(var i = 0; info.length > i; i++) {
                if(info[i].offsetHeight > content[i].offsetHeight) {
                    moreButton[i].classList.add('show');
                }else {
                    moreButton[i].classList.remove('show');
                }
            }
        }
    }
        
    showMoreInfo();
    
    window.addEventListener('resize', function(){
        showMoreInfo();
    });
    

    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest(".js-more")) {
            let wrapper = elem.closest(".js-more").closest('.js-item');
            let firstElem = wrapper.querySelector(".clients-say__info__text").cloneNode(true);
            let secondElem = wrapper.querySelector(".clients-say__item__footer").cloneNode(true);
            document.querySelector('.popup-reviews__wrapper').append(firstElem);
            document.querySelector('.popup-reviews__wrapper').append(secondElem);
        }
    });
    
    // /More info
    
    // Popup
        
    let mainButton = document.querySelectorAll('.js-button');
    let overlay = document.querySelector('.overlay');
    let htmlOverflow = document.querySelector('html');
    
    for(var i = 0; mainButton.length > i; i++) {
        if(mainButton[i] !== null) {
            
            mainButton[i].addEventListener('click', function(){
                let getData = this.getAttribute('data-target');
                let popup = document.querySelector('.popup[data-target = ' + getData + ']');
                popup.classList.add('active');
                overlay.classList.add('active');
                htmlOverflow.classList.add('overflow')
            });
        }
    }
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.js-close')){
            let popupActive = document.querySelector('.popup.active');
            let popupReviews = document.querySelector(".popup-reviews.active");
            
            if(popupReviews) {
                popupReviews.querySelector('.clients-say__info__text').remove();
                popupReviews.querySelector('.clients-say__item__footer').remove();
            }
            
            if(popupActive) {
                
                popupActive.classList.remove('active');
                overlay.classList.remove('active');
                htmlOverflow.classList.remove('overflow');
            }
        }
    });

    overlay.addEventListener('click', function(){
        let popupActive = document.querySelector('.popup.active');
        let popupReviews = document.querySelector(".popup-reviews.active");
        
        if(popupReviews) {
            popupReviews.querySelector('.clients-say__info__text').remove();
            popupReviews.querySelector('.clients-say__item__footer').remove();
        }
        
        popupActive.classList.remove('active');
        overlay.classList.remove('active');
        htmlOverflow.classList.remove('overflow');
    });
    
    // //Popup
    
     // Scroll to top
    
    let wrapperToTop = document.querySelector('.button-to-top');
    let buttonToTop = document.querySelector('.to-top');
    
    document.addEventListener('scroll', function(){
        if(window.pageYOffset > 1000) {
            wrapperToTop.classList.add('show');
        }else {
            wrapperToTop.classList.remove('show');
        }
    });
    
    buttonToTop.addEventListener('click', function(){
       window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // /Scroll to top
    
    /* Reviews */
    
    document.addEventListener('click', function(e){
        let item = e.target;
        
        if(item.closest('.js-reviews-button')) {
            let wrapper = item.closest('.js-drop-item');
            
            wrapper.classList.remove('active');
        }
    });
});