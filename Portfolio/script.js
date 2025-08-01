// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

// Update icon based on current theme
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  if (theme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
}

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(15, 15, 35, 0.95)"
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.25)"
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(255, 255, 255, 0.1)"
    }
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".project-card, .skill-item, .about-text, .contact-info").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = contactForm.querySelector('input[type="text"]').value
  const email = contactForm.querySelector('input[type="email"]').value
  const subject = contactForm.querySelectorAll('input[type="text"]')[1].value
  const message = contactForm.querySelector("textarea").value

  // Here you would typically send the data to your server
  // For now, we'll just show an alert
  alert("Obrigado pela sua mensagem! Entrarei em contato em breve.")

  // Reset form
  contactForm.reset()
})

// Typing animation for hero title
const heroTitle = document.querySelector(".hero-title")
const titleText = heroTitle.innerHTML
heroTitle.innerHTML = ""

let i = 0
function typeWriter() {
  if (i < titleText.length) {
    heroTitle.innerHTML += titleText.charAt(i)
    i++
    setTimeout(typeWriter, 100)
  }
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroContent = document.querySelector(".hero-content")

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Cursor trail effect (optional)
// document.addEventListener("mousemove", (e) => {
//   const cursor = document.createElement("div")
//   cursor.className = "cursor-trail"
//   cursor.style.left = e.clientX + "px"
//   cursor.style.top = e.clientY + "px"

//   document.body.appendChild(cursor)

//   setTimeout(() => {
//     cursor.remove()
//   }, 1000)
// })

// Add CSS for cursor trail
const style = document.createElement("style")
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorTrail 1s ease-out forwards;
    }
    
    @keyframes cursorTrail {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    body.loaded {
        opacity: 1;
    }
`
document.head.appendChild(style)

// Skills animation on scroll
const skillItems = document.querySelectorAll(".skill-item")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"
        }, index * 100)
      }
    })
  },
  { threshold: 0.1 },
)

skillItems.forEach((item) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px) scale(0.8)"
  item.style.transition = "all 0.6s ease"
  skillsObserver.observe(item)
})

// Project cards hover effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})