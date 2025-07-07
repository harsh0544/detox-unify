
    function lockKeyboard(e) {
        // Prevent all key events except in input/textarea fields
        if (['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) === -1) {
            e.preventDefault();
        }
    }

    document.addEventListener('keydown', lockKeyboard, true);
    document.addEventListener('keypress', lockKeyboard, true);
    document.addEventListener('keyup', lockKeyboard, true);
