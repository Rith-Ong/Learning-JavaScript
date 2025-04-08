const password = document.querySelector("input[name='password']");
const confirm = document.querySelector("input[name='confirm-password']");

confirm.addEventListener("input", () => {
    if (password.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match");
    } else {
        confirm.setCustomValidity("");
    }
});
