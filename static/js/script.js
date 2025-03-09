// Form Submission
document
  .getElementById("exerciseForm")
  .addEventListener("submit", async (event) => {
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
      time: data.time,
      notes: data.notes || "",
      exercises: [],
    };

    // Determine the number of exercises dynamically
    let exerciseCount = 0;
    while (data[`exercise${exerciseCount + 1}`]) {
      exerciseCount++;
    }

    // Group exercises into structured objects
    for (let i = 1; i <= exerciseCount; i++) {
      formattedData.exercises.push({
        name: data[`exercise${i}`],
        sets: parseInt(data[`sets${i}`], 10) || 0,
        reps: parseInt(data[`reps${i}`], 10) || 0,
        weight: parseInt(data[`weight${i}`], 10) || 0,
        duration: parseInt(data[`duration${i}`], 10) || 0,
      });
    }

    console.log(formattedData);
  });

let exerciseFieldCounter = 1;
// Add exercise fields to form when button is clicked:
document.getElementById("addExercise").addEventListener("click", () => {
  const exerciseFields = document.getElementById("exerciseFields");
  const exerciseField = document.createElement("div");

  exerciseField.innerHTML = `
    <div class="exerciseField">
    <h3>Exercise</h3>
    <label for="exercise${exerciseFieldCounter}">Exercise:</label>
    <input type="text" name="exercise${exerciseFieldCounter}">
    <label for="sets${exerciseFieldCounter}">Sets:</label>
    <input type="number" name="sets${exerciseFieldCounter}">
    <label for="reps${exerciseFieldCounter}">Reps:</label>
    <input type="number" name="reps${exerciseFieldCounter}">
    <label for="weight${exerciseFieldCounter}">Weight:</label>
    <input type="number" name="weight${exerciseFieldCounter}">
    <label for="duration${exerciseFieldCounter}">Duration:</label>
    <input type="text" class="html-duration-picker" name="duration${exerciseFieldCounter}">
    <button type="button" class="deleteExercise">Delete Exercise</button>
    </div>
  `;

  exerciseFields.appendChild(exerciseField);
  exerciseFieldCounter++;

  HtmlDurationPicker.init();

  // Get the delete button inside the newly created exerciseField
  exerciseField
    .querySelector(".deleteExercise")
    .addEventListener("click", () => {
      console.log("deleting exercise");
      exerciseFields.removeChild(exerciseField); // Remove the specific exercise
      exerciseFieldCounter--;
    });
});
/*
document.getElementById("sendButton").addEventListener("click", async () => {
  const content = document.getElementById("messageInput").value;
  if (!content) {
    document.getElementById("response").textContent = "Please enter a message";
    return;
  }

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    document.getElementById("response").textContent = result.message;

    // Append the new message to the list
    const messageList = document.getElementById("messageList");
    const newMessage = document.createElement("li");
    const timestamp = new Date(result.data.created_at).toLocaleString();
    newMessage.textContent = `${result.data.content} (Sent: ${timestamp})`;
    messageList.insertBefore(newMessage, messageList.firstChild); // Add at the top

    // Clear the input
    document.getElementById("messageInput").value = "";
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("response").textContent = "Error sending message";
  }
});
*/
