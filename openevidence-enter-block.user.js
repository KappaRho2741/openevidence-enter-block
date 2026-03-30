// ==UserScript==
// @name         OpenEvidence Enter Block
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  OpenEvidenceでEnterによる誤送信を防止。Cmd+Enterで送信、Enterで改行。日本語IME対応。
// @author       utsumitomki
// @match        https://www.openevidence.com/*
// @match        https://openevidence.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/KappaRho2741/openevidence-enter-block
// @supportURL   https://github.com/KappaRho2741/openevidence-enter-block/issues
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target && e.target.tagName === 'TEXTAREA') {
            if (e.metaKey) return;
            if (!e.shiftKey && !e.ctrlKey) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (!e.isComposing) {
                    e.preventDefault();
                    var ta = e.target;
                    var start = ta.selectionStart;
                    var end = ta.selectionEnd;
                    var setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
                    setter.call(ta, ta.value.substring(0, start) + '\n' + ta.value.substring(end));
                    ta.selectionStart = ta.selectionEnd = start + 1;
                    ta.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        }
    }, true);
})();
