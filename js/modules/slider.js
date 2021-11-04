function slider(){
    //slider - 2
    const leftSlider = document.querySelector('.current');
    const rightSlider = document.querySelector('.total');
    const slides = document.querySelectorAll('.offer__slide')
    
    rightSlider.innerHTML = funcTotal(slides.length);
    function funcTotal(n){
        return (n >= 0 && n < 10) ? '0' + n : n;
    }
    let counter = 1;
    
    showSlides(counter)
    function showSlides(n){
    
        (n > slides.length) && (counter = 1);
        (n < 1) && (counter = slides.length);
         
        slides.forEach((item, i)=>{
            item.style.display = 'none';
        })
    
        slides[counter - 1].style.display = '';
        slides[counter - 1].classList.add('fade');
    
        leftSlider.innerHTML = funcCurrent(counter);
        function funcCurrent(n){
            return (n >= 0 && n < 10) ? '0' + n : n;
        };
    };
    
    rightSlider.addEventListener('click',()=>{
        showSlides(++counter)
    });
    leftSlider.addEventListener('click',()=>{
        showSlides(--counter)
    })
}
    
module.exports = slider;