export function createPopupDialog({ title = 'Confirm', message = 'Are you sure?', confirmText = 'OK', cancelText = 'Cancel' } = {}) {
    const dialog = document.createElement('div');
    dialog.className = 'popup-overlay hidden';

    dialog.innerHTML = `
      <div class="popup-dialog">
        <h2 class="popup-dialog-title">${title}</h2>
        <p class="popup-dialog-message">${message}</p>
        <div class="popup-buttons">
          <button class="btn btn-cancel" type="button">${cancelText}</button>
          <button class="btn btn-confirm" type="button">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    const cancelBtn = dialog.querySelector('.btn-cancel');
    const confirmBtn = dialog.querySelector('.btn-confirm');

    const show = (onConfirm) => {
        dialog.classList.remove('hidden');

        cancelBtn.onclick = () => {
            dialog.classList.add('hidden');
        };

        confirmBtn.onclick = () => {
            dialog.classList.add('hidden');
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        };
    };

    const hide = () => {
        dialog.classList.add('hidden');
    };

    return { show, hide };
}
  