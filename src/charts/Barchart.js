// Import statements for React, useState, useEffect, Redux, and other required libraries

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './main.scss'; // Import SCSS file for constants
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = () => {
    const [apiData, setApiData] = useState([]);
    const dispatch = useDispatch(); // Redux dispatch hook

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => {
                setApiData(json.data);
                dispatch({ type: 'SET_API_DATA', payload: json.data }); // Dispatch Redux action to update store
            })
            .catch(error => console.error('Error fetching API data:', error));
    }, [dispatch]);

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

export default BarChart;
