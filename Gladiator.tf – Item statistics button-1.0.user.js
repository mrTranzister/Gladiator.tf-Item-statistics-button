// ==UserScript==
// @name         Gladiator.tf – Item statistics button
// @namespace    gladiator-stats-button
// @version      1.0
// @description  Adds Gladiator-style statistics button near every item
// @match        https://gladiator.tf/manage/*/items*
// @grant        none
// @author       mrTranzister+GPT
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .tm-stats-btn {
            position: relative;
            top: 3px;
            background: #1f1f1f;
            border: 1px solid #2c2c2c;
            color: #f5a623;
            padding: 6px 6px;
            margin-left: -1px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all .15s ease;
        }

        .tm-stats-btn:hover {
            background: #f5a623;
            color: #111;
            border-color: #f5a623;
            text-decoration: none;
        }

        .tm-stats-btn:active {
            transform: scale(0.95);
        }

        .tm-stats-btn i {
            font-size: 17px;
        }
    `;
    document.head.appendChild(style);

    function addStatsButtons() {
        document.querySelectorAll('.card.item-card').forEach(card => {
            if (card.querySelector('.tm-stats-btn')) return;

            const itemName = card.getAttribute('data-name');
            if (!itemName) return;

            const buttonGroup = card.querySelector('.btn-group-sm');
            if (!buttonGroup) return;

            const statsUrl =
                'https://gladiator.tf/sales?item=' +
                encodeURIComponent(itemName);

            const btn = document.createElement('a');
            btn.className = 'tm-stats-btn';
            btn.href = statsUrl;
            btn.target = '_blank';
            btn.title = 'Item statistics';

            btn.innerHTML = `<i class="fas fa-chart-line"></i>`;

            buttonGroup.appendChild(btn);
        });
    }

    addStatsButtons();

    const observer = new MutationObserver(addStatsButtons);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
