document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generateButton");
    const typeSelect = document.getElementById("type");
    const topicInput = document.getElementById("topic");
    const shayariOutput = document.getElementById("shayariOutput");

    generateButton.addEventListener("click", async () => {
        const type = typeSelect.value;
        const topic = topicInput.value.trim();

        try {
            const response = await fetch(`http://localhost:3000/generate-shayari?type=${encodeURIComponent(type)}&topic=${encodeURIComponent(topic)}`);;
            if (response.ok) {
                const data = await response.json();
                shayariOutput.innerHTML = `<p>${data.shayari}</p>`;
            } else {
                shayariOutput.innerHTML = "<p>Error generating Shayari.</p>";
            }
        } catch (error) {
            //console.error("Error:", error);
            shayariOutput.innerHTML = "<p>Error generating Shayari.</p>";
        }
    });
});
