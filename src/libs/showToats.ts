const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.classList.add('custom-toast');
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
};

export default showToast;