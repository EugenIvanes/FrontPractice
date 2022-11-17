function slider({container, slide, nextArrow, prevArrow, currentCounter, wrapper, field}){
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all 0.5s';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((item)=>{
        item.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            --webkit-box-sizing: content-box;
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            --webkit-background-clip: padding-box;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity 0.6s ease;
        `;
        if(i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', ()=>{
        if (offset == +width.replace(/\D/g,'') * (slides.length - 1)){
            offset = 0;
        }else{
            offset += +width.replace(/\D/g,'');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
        dots.forEach(item => item.style.opacity = '0.5');
        dots[slideIndex-1].style.opacity = '1';
    })
    prev.addEventListener('click', ()=>{
        if (offset == 0){
            offset = +width.replace(/\D/g,'') * (slides.length - 1);
        }else{
            offset -= +width.replace(/\D/g,'');
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`
        
        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
        dots.forEach(item => item.style.opacity = '0.5');
        dots[slideIndex-1].style.opacity = '1';
    });

    dots.forEach(item => {
        item.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g,'') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent = slideIndex;
            }

            dots.forEach(item => item.style.opacity = '0.5');
            dots[slideIndex-1].style.opacity = '1';
        });
    })
}

export default slider;