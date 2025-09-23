document.addEventListener("DOMContentLoaded", () => {
  // Section + button refs
  const mainMenu = document.getElementById("mainMenu");
  const howToPlay = document.getElementById("howToPlay");
  const registration = document.getElementById("registration");
  const levelPage = document.getElementById("levelPage");

  const startBtn = document.getElementById("startBtn");
  const howToPlayBtn = document.getElementById("howToPlayBtn");
  const backBtn = document.getElementById("backBtn");
  const backToMenuBtn = document.getElementById("backToMenuBtn");
  const letsBeginBtn = document.getElementById("letsBeginBtn");

  const numMembers = document.getElementById("numMembers");
  const membersContainer = document.getElementById("membersContainer");
  const submitRegistration = document.getElementById("submitRegistration");
  const statusMsg = document.getElementById("statusMsg");

  /*  Fade navigation (keeps your original timing)  */
  howToPlayBtn.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    setTimeout(() => howToPlay.classList.add("active"), 300);
  });

  backBtn.addEventListener("click", () => {
    howToPlay.classList.remove("active");
    setTimeout(() => mainMenu.classList.add("active"), 300);
  });

  startBtn.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    setTimeout(() => {
      registration.classList.add("active");
      // generate fields when registration opens (ensures they're fresh)
      generateMemberFields(parseInt(numMembers.value, 10));
    }, 300);
  });

  backToMenuBtn.addEventListener("click", () => {
    registration.classList.remove("active");
    setTimeout(() => mainMenu.classList.add("active"), 300);
    statusMsg.textContent = "INFO NOT SUBMITTED";
    statusMsg.style.color = "#ff6b6b";

    // Disable the "LET'S BEGIN" button again when going back to registration
    letsBeginBtn.disabled = true;
  });

  // Let's Begin Button functionality
  letsBeginBtn.addEventListener("click", () => {
    // Get current team data from the team box
    const teamName = document.querySelector('.team-box h2').textContent.trim();
    const memberElements = document.querySelectorAll('.team-box p');
    const members = Array.from(memberElements).map(el => el.textContent.trim());

    // Check if team has valid data
    if (teamName === "TEAM NAME" || teamName === "") {
      alert("Please enter a team name first!");
      return;
    }

    // Check if at least one member name is filled
    const validMembers = members.filter(name => name !== "" && !name.includes("PLAYER") && !name.includes("NAME"));
    if (validMembers.length === 0) {
      alert("Please enter at least one player name!");
      return;
    }

    // Update level page with team info and navigate
    updateLevelPageTeamInfo(teamName, members);
    mainMenu.classList.remove("active");
    setTimeout(() => levelPage.classList.add("active"), 300);

  // Update level page background
  levelPage.style.background = "background: linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);";
  mainMenu.classList.remove("active");
  setTimeout(() => levelPage.classList.add("active"), 300);
  });
  
  // Dynamic member fields
  function createInput(type = "text", placeholder = "") {
    const el = document.createElement("input");
    el.type = type;
    el.placeholder = placeholder;
    el.className = "reg-input";
    
    // Add event listeners for validation
    el.addEventListener("input", validateForm);
    el.addEventListener("blur", validateForm);
    
    return el;
  }

  function generateMemberFields(count) {
    // Add updating class for smooth transition
    membersContainer.classList.add("updating");
    
    setTimeout(() => {
      membersContainer.innerHTML = ""; // clear
      // Team + leader
      membersContainer.appendChild(createInput("text", "TEAM NAME"));
      membersContainer.appendChild(createInput("email", "TEAM LEADER EMAIL ID"));

      for (let i = 1; i <= count; i++) {
        membersContainer.appendChild(createInput("text", `MEMBER ${i} NAME`));
        membersContainer.appendChild(createInput("text", "REGISTRATION NUMBER"));
      }
      
      // Remove updating class to trigger fade in
      membersContainer.classList.remove("updating");
      
      // Initial validation check
      setTimeout(() => validateForm(), 100);
    }, 200);
  }

  // Form validation function
  function validateForm() {
    const inputs = membersContainer.querySelectorAll(".reg-input");
    let allValid = true;
    
    inputs.forEach(input => {
      const value = input.value.trim();
      const isEmail = input.type === "email";
      
      // Check if field is empty
      if (value === "") {
        allValid = false;
        input.classList.add("invalid");
        return;
      }
      
      // Email validation
      if (isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          allValid = false;
          input.classList.add("invalid");
          return;
        }
      }
      
      // Remove invalid class if field is valid
      input.classList.remove("invalid");
    });
    
    // Enable/disable submit button
    submitRegistration.disabled = !allValid;
    
    // Update status message
    if (allValid && inputs.length > 0) {
      statusMsg.textContent = "READY TO SUBMIT";
      statusMsg.style.color = "#FFD700";
    } else {
      statusMsg.textContent = "FILL ALL FIELDS";
      statusMsg.style.color = "#ff6b6b";
    }
  }

  // regenerate on dropdown change
  numMembers.addEventListener("change", () => {
    generateMemberFields(parseInt(numMembers.value, 10));
  });

  // default on load
  generateMemberFields(parseInt(numMembers.value, 10));

  // Submit handler with validation
  submitRegistration.addEventListener("click", () => {
    const inputs = membersContainer.querySelectorAll(".reg-input");
    let isValid = true;
    
    // Final validation check
    inputs.forEach(input => {
      const value = input.value.trim();
      if (value === "" || (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
        isValid = false;
        input.classList.add("invalid");
      }
    });
    
    if (isValid) {
      statusMsg.textContent = "INFO SUBMITTED";
      statusMsg.style.color = "#00ff00";
      
      // Store team data and navigate back to home
      storeTeamData();
      
      // Enable the "LET'S BEGIN" button
      letsBeginBtn.disabled = false;
      
      // Navigate back to main menu after a brief delay
      setTimeout(() => {
        registration.classList.remove("active");
        setTimeout(() => {
          mainMenu.classList.add("active");
          updateTeamBox(); // Update the team box with new data
        }, 300);
      }, 1000);
      
    } else {
      statusMsg.textContent = "PLEASE FILL ALL FIELDS CORRECTLY";
      statusMsg.style.color = "#ff0000";
    }
  });

  // Store team data from registration form
  function storeTeamData() {
    const inputs = membersContainer.querySelectorAll(".reg-input");
    const teamData = {
      teamName: inputs[0]?.value.trim() || "TEAM NAME",
      teamLeaderEmail: inputs[1]?.value.trim() || "",
      members: []
    };
    
    // Extract member names (skip team name and email, take every other field starting from index 2)
    for (let i = 2; i < inputs.length; i += 2) {
      if (inputs[i]?.value.trim()) {
        teamData.members.push(inputs[i].value.trim());
      }
    }
    
    // Store in a global variable (since we can't use sessionStorage in artifacts)
    window.teamData = teamData;
  }

  // Update the team box in main menu with stored data
  function updateTeamBox() {
    const teamData = window.teamData;
    if (teamData) {
      // Update team name
      const teamNameElement = document.querySelector('.team-box h2');
      if (teamNameElement && teamData.teamName) {
        teamNameElement.textContent = teamData.teamName;
        teamNameElement.dataset.default = teamData.teamName;
      }
      
      // Get existing member elements
      const existingMembers = document.querySelectorAll('.team-box p');
      
      // Remove all existing member elements
      existingMembers.forEach(element => element.remove());
      
      // Create new member elements based on actual team size
      const teamBox = document.querySelector('.team-box');
      const letsBeginButton = teamBox.querySelector('.lets-begin-btn');
      
      teamData.members.forEach((memberName, index) => {
        const memberElement = document.createElement('p');
        memberElement.contentEditable = true;
        memberElement.spellcheck = false;
        memberElement.textContent = memberName;
        memberElement.dataset.default = memberName;
        
        // Add the contenteditable behavior
        setupContentEditableBehavior(memberElement);
        
        // Insert before the Let's Begin button
        teamBox.insertBefore(memberElement, letsBeginButton);
      });
    }
  }

  // Update level page team info
  function updateLevelPageTeamInfo(teamName, members) {
    const displayTeamName = document.getElementById('displayTeamName');
    const displayMembers = document.getElementById('displayMembers');
    
    // Update team name
    displayTeamName.textContent = teamName;
    
    // Clear and update members
    displayMembers.innerHTML = '';
    
    // Filter out default placeholder names and empty values
    const validMembers = members.filter(name => 
      name !== "" && 
      !name.includes("PLAYER") && 
      !name.includes("NAME") &&
      name.trim() !== ""
    );
    
    validMembers.forEach(memberName => {
      const memberP = document.createElement('p');
      memberP.textContent = memberName;
      displayMembers.appendChild(memberP);
    });
    
    // If no valid members, show a default message
    if (validMembers.length === 0) {
      const defaultP = document.createElement('p');
      defaultP.textContent = 'No members specified';
      defaultP.style.color = 'rgba(255, 255, 255, 0.5)';
      displayMembers.appendChild(defaultP);
    }
  }
  
  // Setup contenteditable behavior for dynamically created elements
  function setupContentEditableBehavior(field) {
    const defaultText = field.dataset.default;

    field.addEventListener("focus", () => {
      if (field.innerText.trim() === defaultText) {
        field.innerText = "";
      }
      placeCaretAtEnd(field);
    });

    field.addEventListener("blur", () => {
      if (field.innerText.trim() === "") {
        field.innerText = defaultText;
      }
    });

    // prevent Enter from creating new lines
    field.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        field.blur();
      }
    });
  }

  // Load stored team data on page load
  window.addEventListener('load', () => {
    updateTeamBox();
  });

  /* Preserve original contenteditable placeholder behavior */
  const editableFields = document.querySelectorAll(".team-box [contenteditable]");

  editableFields.forEach(field => {
    // if data-default not provided, capture current text as default
    if (!field.dataset.default) {
      field.dataset.default = field.innerText.trim();
    }
    const defaultText = field.dataset.default;

    field.addEventListener("focus", () => {
      if (field.innerText.trim() === defaultText) {
        field.innerText = "";
      }
      placeCaretAtEnd(field);
    });

    field.addEventListener("blur", () => {
      if (field.innerText.trim() === "") {
        field.innerText = defaultText;
      }
    });

    // prevent Enter from creating new lines
    field.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        field.blur();
      }
    });
  });

  // caret utility
  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});

// Level selection function (global scope for onclick handlers)
function selectLevel(levelNumber) {
  console.log(`Selected Level ${levelNumber}`);
  // You can add your level-specific logic here
  alert(`Starting Level ${levelNumber}!`);
  
  // Here you would typically navigate to the actual game level
  // For now, we'll just log it
}
