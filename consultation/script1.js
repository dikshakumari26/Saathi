// Sample doctor data (replace with your actual data)
const doctorsData = [
    { name: "Dr. Smith", specialization: "Psychologist", fees: "$100" },
    { name: "Dr. Johnson", specialization: "Therapist", fees: "$80" },
    // Add more doctors as needed
];

// Function to populate doctor listings
function populateDoctorList() {
    const doctorSelect = document.getElementById("doctor");

    doctorsData.forEach((doctor, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${doctor.name} - ${doctor.specialization} (${doctor.fees})`;
        doctorSelect.appendChild(option);
    });
}

// Function to handle appointment booking
function bookAppointment(event) {
    event.preventDefault();

    const doctorSelect = document.getElementById("doctor");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");

    const selectedDoctorIndex = doctorSelect.value;
    const selectedDoctor = doctorsData[selectedDoctorIndex];
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    // Here, you can implement the logic to store the appointment details on the server
    // For simplicity, we'll just display an alert
    alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
}

// Populate doctor listings when the page loads
window.addEventListener("load", () => {
    populateDoctorList();

    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", bookAppointment);
});
