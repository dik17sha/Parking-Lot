const form = document.getElementById('shortest-path-form')
const resultContainer = document.getElementById('result-display')
const endInput = form.elements['end']
const resultDisplay = document.getElementById('result-container')
const loadingAnimation = document.getElementById('loading-animation');

const start = 'A' // hardcoded starting point

form.addEventListener('submit', (event) => {
event.preventDefault()

const end = endInput.value

if (!end) {
    resultDisplay.textContent = 'Please enter an ending node.'
    return
}

resultDisplay.textContent = ''

// Show the loading animation
loadingAnimation.style.display = 'block'

setTimeout(() => {
    fetch(`http:localhost:3000/shortest-path/${start}/${end}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultDisplay.textContent = data.error
            } else {
                const path = data.path.join(' --> ')
                const length = data.length
                resultDisplay.textContent = `Shortest path: ${path}`
            }
        })
        .catch(error => {
            resultDisplay.textContent = `Error: ${error.message}`
        })
        .finally(() => {
            // Hide the loading animation after the callback executes
            loadingAnimation.style.display = 'none'
        })
}, 1300) // Show the animation for 1.3 seconds
})

endInput.addEventListener('input', () => {
    resultDisplay.textContent = ''
})
