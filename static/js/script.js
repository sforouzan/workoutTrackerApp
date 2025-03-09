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
