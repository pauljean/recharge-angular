

async function init() {

    console.log('================Init====================');
    const INIT_URL = 'http://localhost:7075/init';

        fetch(INIT_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({ email })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission des données');
            }
            return response.json(); // ou response.text() selon votre API
        }).then(data => {
            console.log('Succès:', data);
            
            const select = document.getElementById('countries');  
    
            data.forEach(country => {  
                const option = document.createElement('option');  
                option.value = country; // ou un autre identifiant  
                option.textContent = country; // ou un autre nom  
                select.appendChild(option);
            }); 
        }).catch((error) => {
            console.error('Erreur:', error);
            alert("Une erreur s'est produite : " + error.message);
        });

    }

    init();

    function newsletter(form) {

    const email = document.getElementById('newsletter-email').value;
    console.log('====================================');
    console.log('Email : ' + email);


        // Exemple d'envoi des données à une API REST Java
        fetch('http://localhost:7075/newsletter/subscribe/'.concat(email), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission des données');
            }
            return response.json(); // ou response.text() selon votre API
        }).then(data => {
            console.log('Succès:', data);
            alert("Données envoyées avec succès : " + data);
        }).catch((error) => {
            console.error('Erreur:', error);
            alert("Une erreur s'est produite : " + error.message);
        });

    }




