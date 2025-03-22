// Form Submission
const form = document.getElementById("exerciseForm");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    // Convert FormData into a structured object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Extract general details
    const formattedData = {
      workout_name: data.workout_name,
      date: data.date,
      notes: data.notes || "",
      exercises: [],
    };

    // Determine the number of exercises dynamically
    let exerciseCount = 0;
    while (data[`exercise${exerciseCount + 1}`]) {
      exerciseCount++;
    }

    if (exerciseCount === 0) {
      console.error("No exercises added");
      document.querySelector(".exerciseError").style.display = "block";
      return;
    }

    // Group exercises into structured objects
    for (let i = 1; i <= exerciseCount; i++) {
      formattedData.exercises.push({
        exercise_name: data[`exercise${i}`],
        sets: parseInt(data[`sets${i}`], 10) || 0,
        reps: parseInt(data[`reps${i}`], 10) || 0,
        weight: parseInt(data[`weight${i}`], 10) || 0,
        weight_unit: data[`weight_unit${i}`] || null, 
        distance: parseInt(data[`distance${i}`], 10) || 0,
      });
    }

    const response = await fetch("/api/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });
    const result = await response.json();
    const form = document.getElementById("exerciseForm");
    form.style.display = "none";
    // if successful, show confirmation message
    if (response.ok) {
      const confirmationMessage = document.getElementById(
        "confirmationMessage"
      );
      confirmationMessage.style.display = "flex";
    } else {
      console.error("Failed to save workout session:", result.error);
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.style.display = "flex";
    }
  });
}

let exerciseFieldCounter = 1;
const addExerciseButton = document.getElementById("addExercise");
if (addExerciseButton) {
  // Add exercise fields to form when button is clicked:
  document.getElementById("addExercise").addEventListener("click", () => {
    const exerciseFields = document.getElementById("exerciseFields");
    const exerciseField = document.createElement("div");

    const exerciseError = document.querySelector(".exerciseError");
    if (exerciseError) {
      exerciseError.style.display = "none";
    }

    exerciseField.innerHTML = `
    <div class="exerciseField">
    <h3>Exercise</h3>
    <div class="exerciseField--inputs">
    <div class="exerciseField--inputs-group">
    <label for="exercise${exerciseFieldCounter}">Exercise:</label>
    <input type="text" name="exercise${exerciseFieldCounter}" required>
    </div>
    <div class="exerciseField--inputs-group">
    <label for="sets${exerciseFieldCounter}">Sets:</label>
    <input type="number" name="sets${exerciseFieldCounter}">
    </div>
    <div class="exerciseField--inputs-group">
    <label for="reps${exerciseFieldCounter}">Reps:</label>
    <input type="number" name="reps${exerciseFieldCounter}">
    </div>
    <div class="exerciseField--inputs-group">
    <label for="weight${exerciseFieldCounter}">Weight:</label>
    <div class="weight-container">
    <input type="number" name="weight${exerciseFieldCounter}">
    <select name="weight_unit${exerciseFieldCounter}">
    <option value="Select Unit">Select Unit</option>
    <option value="kg">kg</option>
    <option value="lb">lb</option>
    </select>
    </div>
    </div>
    <div class="exerciseField--inputs-group">
    <label for="distance${exerciseFieldCounter}">Distance:</label>
    <input type="number" name="distance${exerciseFieldCounter}">
    </div>
    </div>
    <button type="button" class="deleteExercise"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
    </div>
  `;

    exerciseFields.appendChild(exerciseField);
    exerciseFieldCounter++;

    HtmlDurationPicker.init();

    // Get the delete button inside the newly created exerciseField
    exerciseField
      .querySelector(".deleteExercise")
      .addEventListener("click", () => {
        exerciseFields.removeChild(exerciseField); // Remove the specific exercise
        exerciseFieldCounter--;
      });
  });
}
// Delete workout entry
// This function will be called when the delete button in the modal is clicked
async function deleteWorkout(workoutId) {
  try {
    const response = await fetch(`/workout/${workoutId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Workout deleted successfully!");
      location.reload(); // Refresh the page to remove deleted workout
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.details);
    }
  } catch (error) {
    console.error("Error deleting workout:", error);
    alert("Failed to delete workout.");
  }
}
