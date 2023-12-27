const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'THE HOGWARTS LIBRARY \nYou, a student at Hogwarts, stumble upon a dusty old book that hints at a mysterious quest in the Forbidden Forest. Do you:',
    options: [
      {
        text: 'Read the book immediately?',
        nextText: 2
      },
      {
        text: 'Consult a professor about the book?',
        setState: { professor: true },
        nextText: 2
      },
      {
        text: 'Ignore the book and continue with your studies?',
        nextText: 6
      }
    ]
  },
  {
    id: 2,
    text: 'CONSULTATION WITH PROFESSOR MCGONAGALL\nProfessor McGonagall confirms the existence of the quest but warns you of its dangers. Do you:',
    options: [
      {
        text: 'Ask for guidance on preparing for the quest?',
        requiredState: (currentState) => currentState.professor,
        // setState: { professor: false, forest: true },
        nextText: 3
      },
      {
        text: 'Convince some friends to join you on the quest?',
        nextText: 3
      },
      {
        text: 'Decide to go alone to keep others safe?',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'ENTERING THE FORBIDDEN FOREST\nAs you enter the dark and foreboding forest, you encounter a fork in the path. Do you:',
    options: [
      {
        text: 'Take the well-lit path to the right?',
        nextText: 4
      },
      {
        text: 'Venture into the shadowy path on the left?',
        nextText: 4
      },
      {
        text: 'Use a magical map to navigate a secret route in the middle?',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'ENCOUNTER WITH MAGICAL CREATURES\nIn a clearing, you come face-to-face with magical creatures guarding the quesTs next clue. Do you:',
    options: [
      {
        text: 'Attempt to communicate with the creatures?',
        nextText: 5
      },
      {
        text: 'Use a spell to subdue the creatures?',
        nextText: 6
      },
      {
        text: 'Search for a hidden path around the creatures?',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'THE FINAL PUZZLE \n You reach the heart of the Forbidden Forest, where a magical door stands between you and the quests ultimate reward.',
    options: [
      {
        text: 'You solve the riddle to open the door and unveil the quests mysteries.\n Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You did not made the effort to explore the Forbidden Forest',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()