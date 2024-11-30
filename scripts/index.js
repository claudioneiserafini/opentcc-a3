document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const switchText = document.getElementById('switch-text');
    const visitorLogin = document.getElementById('visitor-login'); 
    const visitorLoginRegister = document.getElementById('visitor-login-register'); 
    const visitorPopup = document.getElementById('visitor-popup'); 
    const confirmVisitor = document.getElementById('confirm-visitor'); 
    const closePopup = document.getElementById('close-popup'); 

    // Alternar para o formulário de registro
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            switchText.classList.add('hidden'); 
        });
    }

    // Alternar para o formulário de login
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            switchText.classList.remove('hidden'); 
        });
    }

    // Função para alternar visibilidade da senha
    function togglePasswordVisibility(toggleId, inputId) {
        const toggleElement = document.getElementById(toggleId);
        const inputElement = document.getElementById(inputId);

        if (toggleElement && inputElement) {
            toggleElement.addEventListener('click', () => {
                const isPassword = inputElement.type === 'password';
                inputElement.type = isPassword ? 'text' : 'password';

                // Atualizar o ícone de visibilidade
                toggleElement.classList.toggle('fa-eye', !isPassword);
                toggleElement.classList.toggle('fa-eye-slash', isPassword);
            });
        }
    }

    // Ativar alternância de visibilidade de senha nos campos
    togglePasswordVisibility('toggle-password-login', 'password');
    togglePasswordVisibility('toggle-password-register', 'new-password');
    togglePasswordVisibility('toggle-password-confirm', 'confirm-password');

    // Envio do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameOrEmail = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, password }), // Agora pode ser usuário ou e-mail
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao realizar login');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.message === 'Login realizado com sucesso!') {
                        window.location.href = 'inicio.html'; 
                    } else {
                        alert(data.message || 'Erro ao realizar login.');
                    }
                })
                .catch((error) => {
                    console.error('Erro no login:', error);
                    alert('Erro ao realizar login.');
                });
        });
    }

    // Envio do formulário de registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('new-username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('new-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao registrar usuário');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.message === 'Usuário registrado com sucesso!') {
                        alert('Registro realizado com sucesso!');
                        showLogin.click(); 
                    } else {
                        alert(data.message || 'Erro ao registrar usuário.');
                    }
                })
                .catch((error) => {
                    console.error('Erro no registro:', error);
                    alert('Erro ao registrar usuário.');
                });
        });
    }

    // Exibir popup ao clicar em "Entrar como Visitante"
    function setupVisitorButton(button) {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                visitorPopup.classList.remove('hidden'); 
            });
        }
    }

    setupVisitorButton(visitorLogin); 
    setupVisitorButton(visitorLoginRegister); 

    // Confirmar entrada como visitante
    if (confirmVisitor) {
        confirmVisitor.addEventListener('click', () => {
            localStorage.setItem('visitor', true);
            window.location.href = 'inicio.html';
        });
    }

    // Fechar popup ao clicar em "Cancelar"
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            visitorPopup.classList.add('hidden');
        });
    }
});
