function timer(){

    // timer - 5
        const deadline = '2021-12-31';
        function getTimeRemaining(endtime){
            const t = Date.parse(endtime) - Date.parse(new Date);
            const days = Math.floor(t/(1000 * 60 * 60 * 24));
            const hours = Math.floor(t/(1000 * 60 * 60 )%24);
            const minutes = Math.floor(t/(1000 * 60 )%60);
            const seconds = Math.floor(t/(1000)%60);
            return {
                'total': t,
                'days' : days,
                'hours' : hours,
                'minutes': minutes,
                'seconds' : seconds
            }
        }
        getTimeRemaining(deadline);
        function setClock(selector, endtime){
            const timer = document.querySelector(selector);
            const days = timer.querySelector('#days');
            const hours = timer.querySelector('#hours');
            const minutes = timer.querySelector('#minutes');
            const seconds = timer.querySelector('#seconds');
        
            const timeInterval = setInterval(func, 1000);
            func();
            function func(){
        
                const t = getTimeRemaining(endtime);
                days.innerHTML = addZero(t.days); 
                hours.innerHTML = addZero(t.hours);  
                minutes.innerHTML = addZero(t.minutes);  
                seconds.innerHTML = addZero(t.seconds); 
        
                if(t.total <= 0){
                    clearInterval(timeInterval);
                }
            }
        
        }
        setClock('.timer', deadline);
        
        function addZero(num){
        
            if(num >= 0 && num < 10){
                return `0${num}`
            }else{
                return num
            }
        }
}
module.exports = timer;