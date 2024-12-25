document.addEventListener("DOMContentLoaded", function() {
    const entryList = document.getElementById("entry-list");
    const saveButton = document.getElementById("save-entry");
    const diaryEntryInput = document.getElementById("diary-entry");
    const toggleThemeButton = document.getElementById("toggle-theme");

    // Load entries from localStorage
    loadEntries();

    // Save new entry
    saveButton.addEventListener("click", function() {
        const diaryEntry = diaryEntryInput.value.trim();

        if (diaryEntry === "") {
            alert("Please write something before saving!");
            return;
        }

        const entry = {
            text: diaryEntry,
            date: new Date().toLocaleString()
        };

        saveEntry(entry);
        diaryEntryInput.value = "";
    });

    // Save entry to localStorage and reload entries
    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
        loadEntries();
    }

    // Load entries from localStorage
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        entryList.innerHTML = "";

        entries.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <p>${entry.text}</p>
                <span>Written on: ${entry.date}</span>
                <div class="button-container">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;

            // Edit button functionality
            listItem.querySelector(".edit").addEventListener("click", function() {
                diaryEntryInput.value = entry.text;
                removeEntry(index);
            });

            // Delete button functionality
            listItem.querySelector(".delete").addEventListener("click", function() {
                removeEntry(index);
            });

            entryList.appendChild(listItem);
        });
    }

    // Remove entry from localStorage and reload entries
    function removeEntry(index) {
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        loadEntries();
    }

    // Toggle dark mode
    toggleThemeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        toggleThemeButton.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
});
