export function createSuccessDialog({
    title = 'Success',
    message = 'Operation completed successfully!',
    confirmText = 'OK'
}) {
    const dialog = document.createElement('div');
    dialog.className = 'success-dialog-overlay success-hidden';

    dialog.innerHTML = `
      <div class="success-dialog-box">
        <div class="success-spinner"></div>
        <div class="success-dialog-content success-hidden">
          <div class="success-dialog-title">${title}</div>
          <div class="success-dialog-message">${message}</div>
          <button class="success_btn-confirm">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    const spinner = dialog.querySelector('.success-spinner');
    const content = dialog.querySelector('.success-dialog-content');
    const confirmBtn = dialog.querySelector('.success_btn-confirm');

    const show = (onConfirm) => {
        dialog.classList.remove('success-hidden');
        spinner.classList.remove('success-hidden');
        content.classList.add('success-hidden');

        // Wait 1 second, then show success message
        setTimeout(() => {
            spinner.classList.add('success-hidden');
            content.classList.remove('success-hidden');
        }, 1000);

        confirmBtn.onclick = () => {
            dialog.classList.add('success-hidden');
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        };
    };

    const hide = () => {
        dialog.classList.add('success-hidden');
    };

    return { show, hide };
}