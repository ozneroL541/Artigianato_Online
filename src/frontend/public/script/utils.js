/**
 * This function toggles the visibility of the modal element.
 * @author Leonardo Basso
 * */
export function toggleDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog.open) {
        dialog.close();
    } else {
        dialog.showModal();
    }
}
