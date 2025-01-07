document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM entièrement chargé et analysé');

    //loadTasks(); 

    // Gérer la soumission du formulaire de création de tâche
   /* document.getElementById('taskForm').addEventListener('submit', function(event) { 
        event.preventDefault(); 
        createTask(); 
    });  */

      // Gérer la soumission du formulaire d'inscription 
     if (document.getElementById('registerForm')) { 
        document.getElementById('registerForm').addEventListener('submit', function(event) { 
            event.preventDefault(); 
            registerUser(); 
        }); 
    }

    // Gérer la soumission du formulaire de connexion 
    if (document.getElementById('loginForm')) { 
        document.getElementById('loginForm').addEventListener('submit', function(event) { 
            event.preventDefault();  
            loginUser(); 
        }); 
   }
    //charger les tâches après la connexion
    if (localStorage.getItem('token')) { 
        //loadTasks(); 
    }
       
});

// Inscription d'un utilisateur 
function registerUser() { 

    const name = document.getElementById('registerName').value; 
    const email = document.getElementById('registerEmail').value; 
    const password = document.getElementById('registerPassword').value; 
    
    fetch('/api/register', { 
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 
            name, email, password 
        }) 
    }).then(response => response.json()).then(data => { 
       
            console.log('Inscription réussie:', data); 
            alert('Votre demande d\'inscription a été envoyé avec succès.'); 
            document.getElementById('registerForm').reset(); 

    }).catch(error => { 
        console.error('Erreur:', error); 
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }); 
}

// Connecter un utilisateur 
function loginUser() { 
    const email = document.getElementById('loginEmail').value; 
    const password = document.getElementById('loginPassword').value; 
    
    fetch('/api/login', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ email, password }) 
    })
    .then(response => response.json()) 
    .then(data => { 
        console.log('statut de la connexion :', data); 
        localStorage.setItem('token', data.token); 
        //alert('Connexion réussie. Vous pouvez maintenant accéder aux fonctionnalités d\'administration.'); 
        document.getElementById('loginForm').reset(); 
        //loadTasks(); // Charger les tâches après la connexion 
        show('users');
    }).catch(error => { 
        console.error('Erreur:', error); 
        alert('Échec de la connexion. Veuillez vérifier vos identifiants.'); 
    }); 
}

// Charger les routes
function show(route) {
    fetch(`/api/${route}`)
        .then(response => response.json())
        .then(data => {
            const titleSection = route.charAt(0).toUpperCase() + route.slice(1);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <div class="container">
                    <h2 class="text-center mt-5">${titleSection}</h2>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>`;
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

