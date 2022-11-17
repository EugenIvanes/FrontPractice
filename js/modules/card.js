import { getResource } from "../sevices/services";
function card(){
    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.transfer = 19.8;
            this.changeToMDL();
            this.parentFind();
        };

        parentFind(){
            this.parentSelector = document.querySelector(this.parentSelector);
        }

        changeToMDL(){
            this.price = (this.price * this.transfer).toFixed(2);
        }

        render(){
            const menu_item = document.createElement('div');
            const img = document.createElement('img');
            const menu_subtitle = document.createElement('h3');
            const menu_descr = document.createElement('div');
            const menu_divider = document.createElement('div');
            const menu_price = document.createElement('div');
            const menu_cost = document.createElement('div');
            const menu_total = document.createElement('div');

            menu_item.classList.add('menu__item');
            menu_subtitle.classList.add('menu__item-subtitle');
            menu_descr.classList.add('menu__item-descr');
            menu_divider.classList.add('menu__item-divider');
            menu_price.classList.add('menu__item-price');
            menu_cost.classList.add('menu__item-cost');
            menu_total.classList.add('menu__item-total');

            img.setAttribute('src', this.src);
            img.setAttribute('alt', this.alt);

            this.parentSelector.append(menu_item);
            menu_item.append(img);
            menu_item.append(menu_subtitle);
            menu_item.append(menu_descr);
            menu_item.append(menu_divider);
            menu_item.append(menu_price);
            menu_price.append(menu_cost);
            menu_price.append(menu_total);

            menu_subtitle.textContent = this.title;
            menu_descr.textContent = this.descr;
            menu_cost.textContent = 'Цена:';
            menu_total.innerHTML = `<span>${this.price}</span> MLD/день`;
        }
    }

    getResource('http://localhost:3000/menu')
    .then(item => {
        item.forEach(({src, alt, title, desc, price, parent})=>{
            new MenuCard(src, alt, title, desc, price, parent).render()
        })
    });
}

export default card;