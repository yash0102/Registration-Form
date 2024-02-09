const myForm = document.getElementById('my-form')
myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;

    if (password !== cpassword) {
        alert('Password does not match');
    } else {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, cpassword }),
            });
            

            if (response.status ==201) {
                alert('Registration successful!');
                myForm.reset()
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error during registration. Please try again.');
        }
    }
});

var showPasswordCheckbox = document.getElementById('showPassword');
var passwordInput = document.getElementById('password');
var confirmInput = document.getElementById('cpassword');
showPasswordCheckbox.addEventListener('change', function () {
    passwordInput.type = this.checked ? 'text' : 'password';
    confirmInput.type = this.checked ? 'text' : 'password';
    setTimeout(()=>{
        this.checked=false;
        passwordInput.type='password';
        confirmInput.type='password';
    },1000)
});
