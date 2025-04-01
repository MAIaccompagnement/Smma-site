document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Comments functionality
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const comments = [];

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = commentForm.querySelector('textarea');
            if (textarea.value.trim()) {
                const comment = {
                    text: textarea.value,
                    date: new Date(),
                    author: 'Anonyme'
                };
                comments.unshift(comment);
                displayComments();
                textarea.value = '';
            }
        });
    }

    function displayComments() {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <span>${comment.author}</span>
                    <span>${comment.date.toLocaleDateString()}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');
    }

    // Account functionality
    const loginForm = document.getElementById('login-form');
    const registerSwitch = document.getElementById('register-switch');
    let isLoginMode = true;

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            if (isLoginMode) {
                console.log('Tentative de connexion:', email);
                // Implement login logic here
            } else {
                console.log('Tentative d\'inscription:', email);
                // Implement registration logic here
            }
        });
    }

    if (registerSwitch) {
        registerSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            const button = loginForm.querySelector('button');
            const switchText = document.querySelector('.account-switch');

            if (isLoginMode) {
                button.textContent = 'SE CONNECTER';
                registerSwitch.textContent = 'S\'inscrire';
                switchText.innerHTML = 'Pas encore de compte ? <a href="#" id="register-switch">S\'inscrire</a>';
            } else {
                button.textContent = 'S\'INSCRIRE';
                registerSwitch.textContent = 'Se connecter';
                switchText.innerHTML = 'Déjà un compte ? <a href="#" id="register-switch">Se connecter</a>';
            }
        });
    }
});