// This function is called when the webpage loads: 
document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    const size = 85; // Size of the cursor shadow

    // Adjusts the pixel size of the cursor during movement. 
    function moveCursorFollower(e) {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }

    // Checks for each hyperlink whether the mouse cursor has entered it's area. 
    document.querySelectorAll('a').forEach(link => {
        // When the mouse enters the <a>, it executes the following on the cursor
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.opacity = '1';         // Make it visible
            cursorFollower.style.width = `${size}px`;   // Grow to final size
            cursorFollower.style.height = `${size}px`;  // Grow to final size
            cursorFollower.style.transform = `translate(-50%, -50%) scale(1)`; // Scale up smoothly

            // Check if the hovered element is the close button, if so make it white
            if (link.classList.contains('closeBtn', 'contact-icons')) {
                cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; 
                cursorFollower.style.mixBlendMode = "normal";
            } else {
                cursorFollower.style.backgroundColor = 'rgba(181, 180, 179, 0.5)'; 
                cursorFollower.style.mixBlendMode = "multiply";
            }

            document.addEventListener('mousemove', moveCursorFollower);
        });

        // When the mouse leaves the <a>, it executes the following on the cursor
        link.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';     // Fade out
            cursorFollower.style.width = `0`;       // Shrink back
            cursorFollower.style.height = `0`;      // Shrink back
            cursorFollower.style.transform = `translate(-50%, -50%) scale(0)`; // Scale down smoothly
            document.removeEventListener('mousemove', moveCursorFollower);
        });
    });

    //This is to ensure there is smooth scrolling when clicked on a hyperlink from the nav Container or the watch film button. 
    document.querySelectorAll('.buttonContainer a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target class from the href attribute and finds the target element
            const targetClass = this.getAttribute('href');
            const targetElement = document.querySelector(targetClass);

            if (targetElement) {
                // Get the height of the navContainer and adjusts an offset position so that it scrolls to that point. 
                const navHeight = document.querySelector('.navContainer').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navHeight;

                // Smooth scroll to the element with offset
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // This is for when the user scrolls, the nav container adds black bar property to it
    const navContainer = document.querySelector('.navContainer');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { 
            navContainer.classList.add('navContainer-scrolled');
        } else {
            navContainer.classList.remove('navContainer-scrolled');
        }
    });


    // This is for spawning balls in random orientations and sizes in the videoContainer
    // Ensure that there is at least one videoContainer on the page
    const videoContainers = document.querySelectorAll('.videoContainer');
    if (videoContainers.length === 0) return;

    // Use the first videoContainer for this example
    const vidContainer = videoContainers[0];

    const rows = 5;
    const cols = 6;

    // Define separate horizontal and vertical margins
    const horizontalMargin = 50; // Horizontal margin in pixels
    const verticalMargin = 75;    // Vertical margin in pixels

    // Adjust cell width and height calculations to account for these margins
    const cellWidth = (vidContainer.clientWidth - 2 * horizontalMargin) / cols;
    const cellHeight = (vidContainer.clientHeight - 2 * verticalMargin) / rows;

    for (let i = 0; i < rows * cols; i++) {
        const ball = document.createElement('div');
        ball.className = 'blurry-ball';

        const col = i % cols;
        const row = Math.floor(i / cols);

        // Calculate random position within the cell, including margins
        const left = horizontalMargin + col * cellWidth + Math.random() * cellWidth;
        const top = verticalMargin + row * cellHeight + Math.random() * cellHeight;

        const ballSize = Math.floor(Math.random() * (120 - 20 + 1)) + 20;
        ball.style.width = `${ballSize}px`;
        ball.style.height = `${ballSize}px`;

        ball.style.position = 'absolute';
        ball.style.left = `${left}px`;
        ball.style.top = `${top}px`;

        vidContainer.appendChild(ball);

    }
});

// This function is for executing the typing effect which would be applied to the title
function typeEffect(element, speed) {
    const text = element.innerHTML;
    element.innerHTML = "";

    let i = 0;
    const timer = setInterval(function () {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Applying the effect to the mainTitle
const mainTitle = document.getElementById('mainTitle');
document.addEventListener('DOMContentLoaded', function () {
    typeEffect(mainTitle, 250); 
});

// This function is for opening the About Overlay when clicked on the about button
function openOverlay(overlayId) {
    document.getElementById('mainTitle').style.opacity = 0;
    document.querySelector('.navContainer').style.opacity = 0;
    document.getElementById('watchFilmBtn').style.opacity = 0;
    document.getElementById('player').style.opacity = 0;

    // Then, display the specified overlay after the transitions
    setTimeout(function () {
        const overlay = document.getElementById(overlayId);
        overlay.style.display = 'flex';
        setTimeout(function () {
            overlay.style.opacity = 1;
        }, 10); // Allows CSS to recognize the display change before beginning transition
    }, 400); // Wait for the fade out to complete
}

// This function closes a specified overlay
function closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.opacity = 0;

    setTimeout(function () {
        overlay.style.display = 'none';
        // Restore the opacity of other elements after the overlay has faded out and been hidden
        document.getElementById('mainTitle').style.opacity = 1;
        document.querySelector('.navContainer').style.opacity = 1;
        document.getElementById('watchFilmBtn').style.opacity = 1;
        document.getElementById('player').style.opacity = 1;
    }, 500); // Wait for the fade out to complete
}

// This function is for opening the About Overlay when clicked on the about button on every other page other than the index.html
function openDiffOverlay(overlayId) {
    document.querySelector('.navContainer').style.opacity = 0;
    document.getElementById('player').style.opacity = 0;

    // Then, display the specified overlay after the transitions
    setTimeout(function () {
        const overlay = document.getElementById(overlayId);
        overlay.style.display = 'flex';
        setTimeout(function () {
            overlay.style.opacity = 1;
        }, 10); // Allows CSS to recognize the display change before beginning transition
    }, 400); // Wait for the fade out to complete
}

// This function closes a specified overlay on every other page except the index.html page
function closeDiffOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.opacity = 0;

    setTimeout(function () {
        overlay.style.display = 'none';
        // Restore the opacity of other elements after the overlay has faded out and been hidden
        document.querySelector('.navContainer').style.opacity = 1;
        document.getElementById('player').style.opacity = 1;
    }, 500); // Wait for the fade out to complete
}
