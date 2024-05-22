const moodData = [];

// Function to add a mood entry
function logMood(event) {
    event.preventDefault();

    const moodSelect = document.getElementById("mood");
    const dateInput = document.getElementById("date");

    const selectedMood = moodSelect.value;
    const selectedDate = dateInput.value;

    // Calculate the date 7 days ago from today
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Create a Date object from the selected date
    const selectedDateObj = new Date(selectedDate);

    // Check if the selected date is within the last 7 days
    if (selectedDateObj >= oneWeekAgo && selectedDateObj <= new Date()) {
        // Create a mood entry object
        const moodEntry = {
            mood: selectedMood,
            date: selectedDate,
        };

        // Add the mood entry to the data array
        moodData.push(moodEntry);

        // Display the mood entry in the mood history
        displayMoodEntry(moodEntry);

        // Clear the form
        moodSelect.selectedIndex = 0;
        dateInput.value = '';

        // Update the chart with the new data
        updateWeeklyEmotionChart();
    } else {
        alert("Please select a date within the last 7 days.");
    }
}

// Function to display a mood entry in the history
function displayMoodEntry(entry) {
    const moodList = document.getElementById("mood-list");
    const listItem = document.createElement("li");
    listItem.textContent = `Mood: ${entry.mood}, Date: ${entry.date}`;
    moodList.appendChild(listItem);
}

// Calculate the date 7 days ago from today
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

// Create a variable to hold the Chart.js instance
let weeklyEmotionChart;

// Function to update the weekly emotion chart
function updateWeeklyEmotionChart() {
    // Filter mood data for the last 7 days
    const filteredMoodData = moodData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo && entryDate <= new Date();
    });

    // Create an object to count weekly emotions
    const weeklyEmotions = {
        '😄 Happy': 0,
        '😢 Sad': 0,
        '😡 Angry': 0,
        '😌 Calm': 0,
        '😞 Depressed': 0,
        '💔 HeartBroken': 0,
        '😰 Anxious': 0,
        '😩 Overwhelmed': 0,
        // Add more emotions as needed
    };

    filteredMoodData.forEach(entry => {
        // Check if the mood is already in weeklyEmotions, if not, initialize it to 0
        if (!weeklyEmotions.hasOwnProperty(entry.mood)) {
            weeklyEmotions[entry.mood] = 0;
        }

        // Increment the count for the mood entry mood
        weeklyEmotions[entry.mood] += 1;
    });

    // Update the chart data
    weeklyEmotionChart.data.labels = Object.keys(weeklyEmotions);
    weeklyEmotionChart.data.datasets[0].data = Object.values(weeklyEmotions);
    weeklyEmotionChart.data.datasets[0].backgroundColor = getRandomColors(Object.keys(weeklyEmotions).length);

    // Update the chart
    weeklyEmotionChart.update();
}

// Function to generate random colors
function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        colors.push(randomColor);
    }
    return colors;
}

// Function to generate the initial weekly emotion chart
function generateWeeklyEmotionChart() {
    // Create an object to count weekly emotions
    const weeklyEmotions = {
        '😄 Happy': 0,
        '😢 Sad': 0,
        '😡 Angry': 0,
        '😌 Calm': 0,
        '😞 Depressed': 0,
        '💔 HeartBroken': 0,
        '😰 Anxious': 0,
        '😩 Overwhelmed': 0,
        // Add more emotions as needed
    };

    moodData.forEach(entry => {
        const entryDate = new Date(entry.date);

        // Check if the mood entry date is within the last 7 days
        if (entryDate >= oneWeekAgo && entryDate <= new Date()) {
            // Check if the mood is already in weeklyEmotions, if not, initialize it to 0
            if (!weeklyEmotions.hasOwnProperty(entry.mood)) {
                weeklyEmotions[entry.mood] = 0;
            }

            // Increment the count for the mood entry mood
            weeklyEmotions[entry.mood] += 1;
        }
    });

    // Get the canvas element for the weekly emotion chart
    const ctx = document.getElementById('weekly-emotion-chart').getContext('2d');

    // Create the initial bar chart with random colors
    weeklyEmotionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(weeklyEmotions),
            datasets: [{
                label: 'Weekly Emotion Count',
                data: Object.values(weeklyEmotions),
                backgroundColor: getRandomColors(Object.keys(weeklyEmotions).length),
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 8, // Set the maximum value to 8
                    title: {
                        display: true,
                        text: 'Count',
                    },
                },
            },
        },
    });
}

// Populate the mood history and generate the initial chart on page load
window.addEventListener("load", () => {
    const moodList = document.getElementById("mood-list");

    // Loop through moodData and display each entry
    moodData.forEach(entry => {
        displayMoodEntry(entry);
    });

    const moodLogForm = document.getElementById("mood-log-form");
    moodLogForm.addEventListener("submit", logMood);

    // Set the max date in the calendar to the current date
    const dateInput = document.getElementById("date");
    dateInput.max = new Date().toISOString().split("T")[0];

    // Generate the initial weekly emotion chart
    generateWeeklyEmotionChart();
});


function saveDataToJson() {
    // Filter mood data for the last 7 days
    const filteredMoodData = moodData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo && entryDate <= new Date();
    });

    if (filteredMoodData.length === 0) {
        alert("No mood data available for the last 7 days.");
        return;
    }

    // Create a Blob containing the JSON data
    const jsonBlob = new Blob([JSON.stringify(filteredMoodData)], { type: "application/json" });

    // Create a temporary link element to trigger the download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(jsonBlob);
    a.download = "mood_data.json";
    a.style.display = "none";

    // Trigger the click event of the link to start the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

// Attach the saveDataToJson function to the button click event
const saveDataButton = document.getElementById("save-data-button");
saveDataButton.addEventListener("click", saveDataToJson);
