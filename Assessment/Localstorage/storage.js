function saveFormData() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var password = document.getElementById('password').value;
    var formData = {
        name: name,
        age: age,
        gender: gender,
        password: password
    };

    // Convert the object to a JSON string and save to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
}