function bind(nodes, event, handler) {
    Array.from(nodes).forEach(node => {
        node.addEventListener(event, handler);
    });
}

function selectTab(newId) {
    const oldTab = document.querySelector('.section__tab_active');
    const oldPanel = document.querySelector('.section__panel:not(.section__panel_hidden)');
    const newTab = document.querySelector(`.section__tab[data-id=${newId}]`);
    const newPanel = document.querySelector(`.section__panel[data-id=${newId}]`);

    oldTab.classList.remove('section__tab_active');
    oldTab.setAttribute('aria-selected', 'false');
    oldTab.removeAttribute('tabindex');
    newTab.classList.add('section__tab_active');
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.focus({
        preventScroll: true
    });

    oldPanel.classList.add('section__panel_hidden');
    oldPanel.setAttribute('aria-hidden', 'true');
    newPanel.classList.remove('section__panel_hidden');
    newPanel.setAttribute('aria-hidden', 'false');
}

function makeTabs() {
    let selected = document.querySelector('.section__tab_active').dataset.id;
    const tabs = document.querySelectorAll('.section__tab');
    const list = Array.from(tabs).map(node => node.dataset.id);
    const select = document.querySelector('.section__select');

    select.addEventListener('input', () => {
        selectTab(select.value);
    });

    bind(tabs, 'click', event => {
        const newId = event.target.dataset.id;
        select.value = newId
        selectTab(newId);
    });

    bind(tabs, 'keydown', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        let index = list.indexOf(selected);
        if (event.key === 'ArrowLeft') {
            --index;
        } else if (event.key === 'ArrowRight') {
            ++index;
        } else if (event.key === 'Home') {
            index = 0;
        } else if (event.key === 'End') {
            index = list.length - 1;
        } else {
            return;
        }

        if (index >= list.length) {
            index = 0;
        } else if (index < 0) {
            index = list.length - 1;
        }

        selected = list[index]
        selectTab(list[index]);
        event.preventDefault();
    });
}

function makeMenu() {
    let expanded = false;
    const links = document.querySelector('.header__links');
    const menu = document.querySelector('.header__menu')

    menu.addEventListener('click', () => {
        expanded = !expanded;
        menu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        links.classList.toggle('header__links_opened', expanded);
        links.classList.add('header__links-toggled');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.querySelectorAll('.main__devices')).forEach(makeTabs);
    Array.from(document.querySelectorAll('.header__menu')).forEach(makeMenu);
});

