const locators = {
LOGIN:{
    USER: '[data-test="email"]',
    PASSWORD: '[data-test="passwd"]',
    BTN_LOGIN: 'button[type=submit]'
},
MENU:{
    SETTING: '[data-test="menu-settings"]',
    CONTAS: '[href="/contas"]',
    RESET: '[href="/reset"]',
    MOVIMENTACAO: '[data-test="menu-movimentacao"]',
    HOME: '[data-test="menu-home"]'
},
MOVIMENTACAO:{
    DERSCRICAO: '[data-test="descricao"]',
    INTERESSADO: '[data-test="envolvido"]',
    VALOR: '[data-test="valor"]',
    CONTA: '[data-test="conta"]',
    STATUS: '[data-test="status"]',
    BTN_SALVAR: '[class="btn btn-block btn-primary"]'
},
CONTAS:{
    NOME: '[data-test="nome"]',
    BTN_SALVAR: 'button[class="btn btn-primary btn-block"]'
},
MESSAGE: '.toast-message'
}

export default locators;

