
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM entièrement chargé et analysé');
});

function testRoute(route) {
    fetch(`/api/${route}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
