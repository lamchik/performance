let selected = document.querySelector('.section__tab_active').dataset.id;
const select = document.querySelector('.section__select');


function bind(nodes, event, handler) {
    Array.from(nodes).forEach(node => {
        node.addEventListener(event, handler);
    });
}

function selectTab(newId) {
    selected = newId;
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

    select.value = newId;
}

function makeTabs() {
    const tabs = document.querySelectorAll('.section__tab');
    const list = Array.from(tabs).map(node => node.dataset.id);
    select.addEventListener('input', () => {
        selectTab(select.value);
    });

    bind(tabs, 'click', event => {
        const newId = event.target.dataset.id;
        selectTab(newId);
    });

    bind(tabs, 'keydown', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        let index = list.indexOf(selected);
        if (event.which === 37) {
            // left
            --index;
        } else if (event.which === 39) {
            // right
            ++index;
        } else if (event.which === 36) {
            // home
            index = 0;
        } else if (event.which === 35) {
            // end
            index = list.length - 1;
        } else {
            return;
        }

        if (index >= list.length) {
            index = 0;
        } else if (index < 0) {
            index = list.length - 1;
        }

        selectTab(list[index]);
        event.preventDefault();
    });
}

function makeMenu(node) {
    let expanded = false;
    const links = document.querySelector('.header__links');

    node.addEventListener('click', () => {
        expanded = !expanded;
        node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        // node.querySelector('.header__menu-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
        links.classList.toggle('header__links_opened', expanded);
        links.classList.add('header__links-toggled');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.querySelectorAll('.header__menu')).forEach(makeMenu);
    Array.from(document.querySelectorAll('.main__devices')).forEach(makeTabs);
});

