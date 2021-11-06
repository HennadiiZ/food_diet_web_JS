
        function modalOpen(modalSelector, modalShowUp){
            const modal = document.querySelector(modalSelector);
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';

            console.log(modalShowUp)
            if(modalShowUp){
                clearInterval(modalShowUp) //+
            }
            
        }
        
        function modalClose(modalSelector){
            const modal = document.querySelector(modalSelector);
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }



function modal(triggerSelector, modalSelector, modalShowUp){
  
        const btns = document.querySelectorAll(triggerSelector); //+
        const modal = document.querySelector(modalSelector); //+ 

        // function modalOpen(){
        //     modal.classList.add('show');
        //     modal.classList.remove('hide');
        //     document.body.style.overflow = 'hidden';
        //     clearInterval(modalShowUp)
        // }
        
        // function modalClose(){
        //     modal.classList.add('hide');
        //     modal.classList.remove('show');
        //     document.body.style.overflow = '';
        // }
        btns.forEach(btn=>{
            btn.addEventListener('click',()=>modalOpen(modalSelector, modalShowUp))
        });

        modal.addEventListener('click',(e)=>{
                if(e.target.classList.contains('modal') || e.target.classList.contains('modal__close')){  
                modalClose(modalSelector)
            }
        })
        document.addEventListener('keydown',(e)=>{
            if(e.code === 'Escape'){
                modalClose(modalSelector)
            }
        });
        // const modalShowUp = setTimeout(modalOpen, 9000);
        // const modalShowUp = setTimeout(()=>modalOpen(modalSelector), 9000);
        window.addEventListener('scroll', endScrollShowUp);
        function endScrollShowUp(){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                modalOpen(modalSelector, modalShowUp);
                window.removeEventListener('scroll', endScrollShowUp);
            }
        }
}

export default modal;

export {modalOpen};
export {modalClose};