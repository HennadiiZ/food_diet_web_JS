function cards(){
//cards - 4
    class Cards{
        constructor(src, alt, title, description, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.cardsWrapper = document.querySelector(parentSelector);
            this.ukrCurrency = 27;
            this.moneyRate()
        }
    
        moneyRate =()=>{
            this.price = this.price * this.ukrCurrency;
        };
    
        render(){
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card__one menu__item">
                    <div class="card__image">
                        <img src="${this.src}" alt="${this.alt}" >
                    </div>
                    <div class="card__info">
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <p class="menu__item-descr">${this.description}</p>
                    </div>
                    <div class="card__price menu__item-price">
                        <p class="menu__item-cost">price: </p>
                        <p class="menu__item-total"><span>${this.price}</span> UAH/day</p>
                    </div>
                </div>    
            `;
            this.cardsWrapper.append(div);
        }
    }
    const getResource = async (url) => {
        const result = await fetch(url); // ЭРРОР!!! fetch('db.json') 
    
        if(!result.ok){
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json(); // it's a promise
    };
    
    // getResource('http://localhost:3000/menu')
    getResource('db.json')
    .then(data => {
        // data.forEach( ({img, altimg, title, descr, price})=>{
        //     // new Cards(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render() - it's very long, so we need Destructuring
        //     new Cards(img, altimg, title, descr, price, '.cards__wrapper').render();
        // });
        data["menu"].forEach( ({img, altimg, title, descr, price})=>{
            // new Cards(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render() - it's very long, so we need Destructuring
            new Cards(img, altimg, title, descr, price, '.cards__wrapper').render();
        });
    });
};
    
// module.exports = cards;
export default cards;