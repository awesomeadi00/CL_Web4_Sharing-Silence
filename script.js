
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
    document.querySelectorAll('.navContainer a, .buttonContainer a').forEach(anchor => {
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
        if (window.scrollY > 50) { // Adjust this value based on your needs
            navContainer.classList.add('navContainer-scrolled');
        } else {
            navContainer.classList.remove('navContainer-scrolled');
        }
    });
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