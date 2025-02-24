import { Chart } from 'chart.js';

// När sidan är laddad, skapa diagrammet
window.onload = () => {
    var ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie', // Ange att det ska vara ett pajdiagram
        data: {
            labels: ['Röd', 'Blå', 'Grön'], // Etiketter för varje segment
            datasets: [{
                label: 'Exempel på Pajdiagram',
                data: [30, 50, 20], // Datan för varje segment
                backgroundColor: ['red', 'blue', 'green'], // Färger för varje segment
                borderColor: ['white', 'white', 'white'], // Gränsfärger för segmenten
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, // Gör att diagrammet anpassar sig till skärmstorleken
            plugins: {
                legend: {
                    position: 'top', // Plats för legend (kan vara 'top', 'left', 'bottom', etc.)
                }
            }
        }
    });
};
