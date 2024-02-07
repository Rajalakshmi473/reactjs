import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => {
                setApiData(json.data);
            })
            .catch(error => console.error('Error fetching API data:', error));
    }, []);
    // Simulating adding a row without server call/API refresh
    const addRow = () => {
        setApiData(prevData => [...prevData, { id: Math.random(), first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' }]);
    };

    const data = {
        labels: apiData.map(user => user.first_name),
        datasets: [{
            label: 'Number of Votes',
            data: apiData.map(user => user.id),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
            }],
        };
        const options = {
            maintainAspectRatio: false,
            scales: {},
            legend: {
                labels: {
                    fontSize: 25,
                },
            },
        };

        return (
            <div>
                <button onClick={addRow}>Add Row</button>
                <Bar data={data} height={100} width={300} options={options} />
            </div>
        );
    };

    export default BarChart