import {openModal, closeModal} from './modal';
import { postData } from '../sevices/services';

function forms(formSelector){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Failure',
    }

    forms.forEach(item =>{
        bindPostData(item);
    })

    function bindPostData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            console.log(formData)

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests',json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModelDialog = document.querySelector('.modal__dialog');

        prevModelDialog.classList.add('hiden');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModelDialog.classList.add('show');
            prevModelDialog.classList.remove('hiden');
            closeModal('.modal');
        },4000)
    }
}
export default forms;