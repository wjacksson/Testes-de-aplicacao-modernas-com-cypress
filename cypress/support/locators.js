const locators = {
LOGIN:{
    USER: '[data-test="email"]',
    PASSWORD: '[data-test="passwd"]',
    BTN_LOGIN: 'button[type=submit]'
},
MENU:{
    SETTING: '[data-test="menu-settings"]',
    CONTAS: '[href="/contas"]',
    RESET: '[href="/reset"]'
},
CONTAS:{
    NOME: '[data-test="nome"]',
    BTN_SALVAR: 'button[class="btn btn-primary btn-block"]'
},
MESSAGE: '.toast-message'
}

export default locators;

