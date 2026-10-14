
// ======================================
// 1. FIND HTML ELEMENTS
// ======================================

const cover = document.getElementById("home");

const pullGroup = document.getElementById("pullGroup");

const tearButton = document.getElementById("tearButton");

const replayButton = document.getElementById("replayButton");

const lisbonPhoto = document.getElementById("lisbonPhoto");

const imageError = document.getElementById("imageError");

const chapterOne = document.getElementById("chapter-one");

let isPlaying = false;
let fallbackTimer = null;


// ======================================
// 2. CHECK LISBON PHOTO
// ======================================

// Try the two likely spellings of the filename.

const photoPaths = [
  "./image/photo/lisibon.jpg",
  "./image/photo/lisbon.jpg"
];

let photoAttempt = 0;

function photoLoaded() {
  imageError.hidden = true;

  console.log("Lisbon photo loaded:", lisbonPhoto.src);
}

function photoFailed() {

  photoAttempt++;

  if (photoAttempt < photoPaths.length) {

    lisbonPhoto.src = photoPaths[photoAttempt];

  } else {

    imageError.hidden = false;

    console.error(
      "Cannot find Lisbon photo. Check the image/photo folder."
    );

  }
}

lisbonPhoto.addEventListener("load", photoLoaded);

lisbonPhoto.addEventListener("error", photoFailed);

// If the first image is already cached, verify it.
if (lisbonPhoto.complete) {

  if (lisbonPhoto.naturalWidth > 0) {
    photoLoaded();
  } else {
    photoFailed();
  }

}


// ======================================
// 3. FINISH THE PAPER ANIMATION
// ======================================

function finishAnimation() {

  if (!isPlaying) return;

  clearTimeout(fallbackTimer);

  cover.classList.add("finished");

}


// ======================================
// 4. START THE PAPER TEAR
// ======================================

function startAnimation() {

  if (isPlaying) return;

  isPlaying = true;

  cover.classList.add("opened");

  // Backup in case animationend does not fire.
  fallbackTimer = setTimeout(finishAnimation, 3600);

}


// ======================================
// 5. DETECT END OF PAPER MOVEMENT
// ======================================

pullGroup.addEventListener("animationend", function(event) {

  if (event.animationName === "pullAway") {
    finishAnimation();
  }

});


// ======================================
// 6. REPLAY THE ANIMATION
// ======================================

function replayAnimation() {

  clearTimeout(fallbackTimer);

  cover.classList.remove("opened");
  cover.classList.remove("finished");

  // Restart CSS animations.
  void cover.offsetWidth;

  isPlaying = false;

}


// ======================================
// 7. BUTTON CLICKS
// ======================================

tearButton.addEventListener("click", startAnimation);

replayButton.addEventListener("click", replayAnimation);


// ======================================
// 8. SCROLL REVEAL — CHAPTER ONE
// ======================================

const revealElements = document.querySelectorAll(
  ".chapter-heading, .photo-collage, .story-text"
);

// Add reveal styles using JavaScript,
// so the text stays visible if JS fails.

revealElements.forEach(function(element) {

  element.classList.add("reveal-on-scroll");

});

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    function(entries) {

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function(element) {

    observer.observe(element);

  });

} else {

  revealElements.forEach(function(element) {

    element.classList.add("visible");

  });

}


// ======================================
// 9. OPTIONAL: CLICK TO SCROLL DOWN
// ======================================

// The HTML arrow already links to #chapter-one.
// This makes sure the destination exists.

console.log(
  "My Story with Lisbon website is ready."
);

// ======================================
// CHAPTER 02 — FLIP STICKY NOTES
// ======================================

const stickyNotes = document.querySelectorAll(".sticky-note");

stickyNotes.forEach(function(note) {

  note.setAttribute("aria-pressed", "false");

  note.addEventListener("click", function() {

    const isFlipped = note.classList.toggle("flipped");

    note.setAttribute("aria-pressed", String(isFlipped));

  });

});


// ======================================
// CHAPTER 03 — FILTER PHOTO GALLERY
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

const memoryCards = document.querySelectorAll(".memory-card");

filterButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    const selectedCategory = button.dataset.filter;

    // Update the active button
    filterButtons.forEach(function(btn) {

      btn.classList.remove("active");

      btn.setAttribute("aria-pressed", "false");

    });

    button.classList.add("active");

    button.setAttribute("aria-pressed", "true");

    // Show only the matching photographs
    memoryCards.forEach(function(card) {

      const category = card.dataset.category;

      if (
        selectedCategory === "all" ||
        category === selectedCategory
      ) {

        card.hidden = false;

      } else {

        card.hidden = true;

      }

    });

  });

});

// Set initial accessible state
filterButtons.forEach(function(button) {

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );

});


// ======================================
// CHAPTER 03 — OPEN PHOTO STORY
// ======================================

const memoryDialog = document.getElementById("memoryDialog");

const dialogImage = document.getElementById("dialogImage");

const dialogTitle = document.getElementById("dialogTitle");

const dialogStory = document.getElementById("dialogStory");

const closeMemory = document.getElementById("closeMemory");

memoryCards.forEach(function(card) {

  card.addEventListener("click", function() {

    const cardImage = card.querySelector("img");

    // Display the actual selected photo
    dialogImage.src = cardImage.src;

    dialogImage.alt = cardImage.alt;

    // Read story from the clicked card
    dialogTitle.textContent = card.dataset.title;

    dialogStory.textContent = card.dataset.story;

    memoryDialog.showModal();

  });

});

// Close button
closeMemory.addEventListener("click", function() {

  memoryDialog.close();

});

// Close when clicking outside the dialog content
memoryDialog.addEventListener("click", function(event) {

  if (event.target === memoryDialog) {

    memoryDialog.close();

  }

});


// ======================================
// CHAPTER 04 — INTERACTIVE MEMORY MAP
// ======================================

// These are placeholder stories.
// Replace them with your real Lisbon places later.

const myPlaces = [

  {
    title: "My First Stop",
    description:
      "This is where I will share one of my favourite places in Lisbon.",
    photo: "./image/photo/lisibon.jpg"
  },

  {
    title: "A Little Discovery",
    description:
      "A small corner of the city that became part of my story.",
    photo: "./image/photo/lisibon.jpg"
  },

  {
    title: "A Place to Remember",
    description:
      "Some places stay in your memories long after you leave.",
    photo: "./image/photo/lisibon.jpg"
  }

];

const mapPins = document.querySelectorAll(".map-pin");

const placePostcard = document.getElementById("placePostcard");

const placeIndex = document.getElementById("placeIndex");

const placePhoto = document.getElementById("placePhoto");

const placeTitle = document.getElementById("placeTitle");

const placeDescription = document.getElementById("placeDescription");

mapPins.forEach(function(pin) {

  pin.addEventListener("click", function() {

    const index = Number(pin.dataset.place);

    const selectedPlace = myPlaces[index];

    if (!selectedPlace) return;

    // Change active pin
    mapPins.forEach(function(otherPin) {

      otherPin.classList.remove("active");

      otherPin.setAttribute("aria-pressed", "false");

    });

    pin.classList.add("active");
    pin.setAttribute("aria-pressed", "true");

    // Change photo and story
    placeIndex.textContent =
      "PLACE " + String(index + 1).padStart(2, "0");

    placePhoto.src = selectedPlace.photo;

    placePhoto.alt = selectedPlace.title;

    placeTitle.textContent = selectedPlace.title;

    placeDescription.textContent =
      selectedPlace.description;

    // Restart the postcard transition
    placePostcard.classList.remove("swap");

    void placePostcard.offsetWidth;

    placePostcard.classList.add("swap");

  });

});

mapPins.forEach(function(pin) {

  pin.setAttribute(
    "aria-pressed",
    String(pin.classList.contains("active"))
  );

});


// ======================================
// CHAPTER 05 — OPEN ENVELOPE
// ======================================

const openLetterButton = document.getElementById("openLetter");

const letterStage = document.querySelector(".letter-stage");

openLetterButton.addEventListener("click", function() {

  letterStage.classList.add("letter-open");

  openLetterButton.setAttribute("aria-expanded", "true");

});
