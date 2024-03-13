function startLoginProcess() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user.length === 0 || pass.length === 0) {
        alert("Please enter both email and password.");
        return; // Exit the function if inputs are empty
    }


    $.get(`${window.location.href}auth?email=${user}&password=${pass}`, (data, status) => {
        if (status === "success") {
            if (data.code === 200) {
                window.location.href = "/app.html"
            } else if (data.code === 403) {
                alert(data.message);
            }
        } else {
            alert("Internal System Error");
        }
    }).fail(() => {
        alert("Failed to communicate with the server.");
    });
}
