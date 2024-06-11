const firebase = require("firebase/app");
require("firebase/firestore");

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnhubE2q-j6HeWZZPotvGsfDXO7GxlGcw",
  authDomain: "fireblogs-46175.firebaseapp.com",
  projectId: "fireblogs-46175",
  storageBucket: "fireblogs-46175.appspot.com",
  messagingSenderId: "809328886833",
  appId: "1:809328886833:web:ab33eae5653bff0f460110"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Obtenir une référence à la base de données Firestore
const db = firebase.firestore();
module.exports = { db };

// Données d'exemple
const sampleUsers = {
  "userID_1": {
    "email": "user1@example.com",
    "username": "user1",
    "fullName": "User One",
    "photoURL": "url_to_profile_photo",
    "isAdmin": true
  },
  "userID_2": {
    "email": "user2@example.com",
    "username": "user2",
    "fullName": "User Two",
    "photoURL": "url_to_profile_photo",
    "isAdmin": false
  },
  "userID_3": {
    "email": "user3@example.com",
    "username": "user3",
    "fullName": "User Three",
    "photoURL": "url_to_profile_photo",
    "isAdmin": false
  }
};

const sampleQuizzes = {
  "quizID_1": {
    "title": "General Knowledge Quiz",
    "category": "General",
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Rome", "Berlin"],
        "correctAnswer": "Paris",
        "type": "multiple-choice"
      },
      {
        "question": "The Earth is flat.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "What is the largest mammal in the world?",
        "options": ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        "correctAnswer": "Blue Whale",
        "type": "multiple-choice"
      },
      {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Mars", "Jupiter", "Saturn", "Venus"],
        "correctAnswer": "Mars",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Great Wall of China is visible from space.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Explain the significance of the Magna Carta.",
        "correctAnswer": "The Magna Carta was a charter of liberties that limited the power of the king and laid the foundation for future parliamentary democracy.",
        "type": "text"
      },
      {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        "correctAnswer": "Harper Lee",
        "type": "multiple-choice"
      },
      {
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["Gold", "Oxygen", "Silver", "Iron"],
        "correctAnswer": "Oxygen",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Mount Everest is the tallest mountain in the world.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the process of photosynthesis.",
        "correctAnswer": "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
        "type": "text"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_2": {
    "title": "Science Quiz",
    "category": "Science",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "What is the chemical symbol for water?",
        "options": ["H2O", "O2", "CO2", "H2"],
        "correctAnswer": "H2O",
        "type": "multiple-choice"
      },
      {
        "question": "Humans have two hearts.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        "correctAnswer": "Mitochondria",
        "type": "multiple-choice"
      },
      {
        "question": "Which planet is known as the Gas Giant?",
        "options": ["Mars", "Jupiter", "Saturn", "Neptune"],
        "correctAnswer": "Jupiter",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The speed of light is constant.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the theory of relativity.",
        "correctAnswer": "The theory of relativity, developed by Albert Einstein, describes the laws of physics in the context of moving frames of reference and the effects of gravity.",
        "type": "text"
      },
      {
        "question": "What is the main component of the sun?",
        "options": ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        "correctAnswer": "Hydrogen",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: DNA stands for Deoxyribonucleic Acid.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "What is the boiling point of water?",
        "options": ["90°C", "100°C", "110°C", "120°C"],
        "correctAnswer": "100°C",
        "type": "multiple-choice"
      },
      {
        "question": "Describe the structure of an atom.",
        "correctAnswer": "An atom consists of a nucleus containing protons and neutrons, surrounded by electrons in orbitals.",
        "type": "text"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_3": {
    "title": "History Quiz",
    "category": "History",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "Who was the first president of the United States?",
        "options": ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
        "correctAnswer": "George Washington",
        "type": "multiple-choice"
      },
      {
        "question": "In which year did the Titanic sink?",
        "options": ["1910", "1912", "1914", "1916"],
        "correctAnswer": "1912",
        "type": "multiple-choice"
      },
      {
        "question": "What event started World War I?",
        "options": ["Assassination of Archduke Franz Ferdinand", "Treaty of Versailles", "Invasion of Poland", "Sinking of the Lusitania"],
        "correctAnswer": "Assassination of Archduke Franz Ferdinand",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Roman Empire was the largest empire in history.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Who was the leader of the Soviet Union during World War II?",
        "options": ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Mikhail Gorbachev"],
        "correctAnswer": "Joseph Stalin",
        "type": "multiple-choice"
      },
      {
        "question": "Describe the impact of the Industrial Revolution.",
        "correctAnswer": "The Industrial Revolution led to significant economic, social, and technological changes, including the rise of factories, urbanization, and advances in machinery and production methods.",
        "type": "text"
      },
      {
        "question": "What year did the Berlin Wall fall?",
        "options": ["1987", "1988", "1989", "1990"],
        "correctAnswer": "1989",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Great Depression began in 1929.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Who was the British Prime Minister during most of World War II?",
        "options": ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Margaret Thatcher"],
        "correctAnswer": "Winston Churchill",
        "type": "multiple-choice"
      },
      {
        "question": "Explain the significance of the Magna Carta.",
        "correctAnswer": "The Magna Carta was a charter of liberties that limited the power of the king and laid the foundation for future parliamentary democracy.",
        "type": "text"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_4": {
    "title": "Mathematics Quiz",
    "category": "Mathematics",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "What is the square root of 64?",
        "options": ["6", "7", "8", "9"],
        "correctAnswer": "8",
        "type": "multiple-choice"
      },
      {
        "question": "Solve for x: 2x + 3 = 7",
        "options": ["1", "2", "3", "4"],
        "correctAnswer": "2",
        "type": "multiple-choice"
      },
      {
        "question": "What is the value of π (pi) rounded to two decimal places?",
        "options": ["3.12", "3.14", "3.16", "3.18"],
        "correctAnswer": "3.14",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: 0 is an even number.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the concept of prime numbers.",
        "correctAnswer": "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
        "type": "text"
      },
      {
        "question": "What is the result of 7 multiplied by 8?",
        "options": ["54", "56", "58", "60"],
        "correctAnswer": "56",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The sum of the angles in a triangle is 180 degrees.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the Pythagorean theorem.",
        "correctAnswer": "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.",
        "type": "text"
      },
      {
        "question": "What is the value of the square root of 81?",
        "options": ["7", "8", "9", "10"],
        "correctAnswer": "9",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: A parallelogram has opposite sides that are equal in length.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_5": {
    "title": "Geography Quiz",
    "category": "Geography",
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the largest continent by area?",
        "options": ["Asia", "Africa", "North America", "Europe"],
        "correctAnswer": "Asia",
        "type": "multiple-choice"
      },
      {
        "question": "Which country has the most natural lakes?",
        "options": ["Canada", "USA", "Russia", "Brazil"],
        "correctAnswer": "Canada",
        "type": "multiple-choice"
      },
      {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        "correctAnswer": "Pacific Ocean",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Mount Everest is the highest mountain in the world.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the significance of the equator.",
        "correctAnswer": "The equator is an imaginary line around the middle of the Earth, equidistant from the North and South Poles, dividing the Earth into the Northern and Southern Hemispheres.",
        "type": "text"
      },
      {
        "question": "Which country has the most time zones?",
        "options": ["USA", "Russia", "China", "Canada"],
        "correctAnswer": "Russia",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Nile is the longest river in the world.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the process of erosion.",
        "correctAnswer": "Erosion is the process by which soil and rock are removed from the Earth's surface by natural processes such as wind or water flow, and then transported and deposited in other locations.",
        "type": "text"
      },
      {
        "question": "What is the capital city of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        "correctAnswer": "Canberra",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Amazon Rainforest is the largest rainforest in the world.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_6": {
    "title": "Technology Quiz",
    "category": "Technology",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "Who is known as the father of computers?",
        "options": ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
        "correctAnswer": "Charles Babbage",
        "type": "multiple-choice"
      },
      {
        "question": "What does HTTP stand for?",
        "options": ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperText Transfer Process", "HyperText Transmission Process"],
        "correctAnswer": "HyperText Transfer Protocol",
        "type": "multiple-choice"
      },
      {
        "question": "What does 'CPU' stand for?",
        "options": ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
        "correctAnswer": "Central Processing Unit",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: RAM is a type of permanent storage.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Explain the purpose of an operating system.",
        "correctAnswer": "An operating system manages the hardware and software resources of a computer.",
        "type": "text"
      },
      {
        "question": "True or False: A byte consists of 8 bits.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the function of a database.",
        "correctAnswer": "A database is used to store, retrieve, and manage data.",
        "type": "text"
      },
      {
        "question": "What is the main function of a router?",
        "options": ["To connect devices to a network", "To store data", "To process data", "To transfer files"],
        "correctAnswer": "To connect devices to a network",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Python is a high-level programming language.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain what an algorithm is.",
        "correctAnswer": "An algorithm is a set of instructions designed to perform a specific task.",
        "type": "text"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_7": {
    "title": "Literature Quiz",
    "category": "Literature",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Who wrote 'Pride and Prejudice'?",
        "options": ["Jane Austen", "Emily Bronte", "Charles Dickens", "William Shakespeare"],
        "correctAnswer": "Jane Austen",
        "type": "multiple-choice"
      },
      {
        "question": "What is the first book of the Old Testament?",
        "options": ["Exodus", "Leviticus", "Genesis", "Numbers"],
        "correctAnswer": "Genesis",
        "type": "multiple-choice"
      },
      {
        "question": "Who wrote '1984'?",
        "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.K. Rowling"],
        "correctAnswer": "George Orwell",
        "type": "multiple-choice"
      },
      {
        "question": "What is the main theme of 'To Kill a Mockingbird'?",
        "correctAnswer": "The moral nature of human beings, especially the struggle between discrimination and tolerance.",
        "type": "text"
      },
      {
        "question": "True or False: 'The Great Gatsby' is set in the Roaring Twenties.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the significance of the Rosetta Stone.",
        "correctAnswer": "It was the key to deciphering Egyptian hieroglyphs.",
        "type": "text"
      },
      {
        "question": "Who wrote 'Moby Dick'?",
        "options": ["Herman Melville", "Mark Twain", "Ernest Hemingway", "Charles Dickens"],
        "correctAnswer": "Herman Melville",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Shakespeare wrote 'War and Peace'.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Describe the plot of 'The Catcher in the Rye'.",
        "correctAnswer": "The novel follows the experiences of a teenager, Holden Caulfield, as he navigates the challenges of adolescence and adulthood in New York City.",
        "type": "text"
      },
      {
        "question": "Who is the author of 'The Great Gatsby'?",
        "options": ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "William Faulkner"],
        "correctAnswer": "F. Scott Fitzgerald",
        "type": "multiple-choice"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_8": {
    "title": "Physics Quiz",
    "category": "Physics",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "What is the speed of light in vacuum?",
        "options": ["299,792 km/s", "300,000 km/s", "150,000 km/s", "250,000 km/s"],
        "correctAnswer": "299,792 km/s",
        "type": "multiple-choice"
      },
      {
        "question": "What is the unit of electrical resistance?",
        "options": ["Ohm", "Ampere", "Volt", "Watt"],
        "correctAnswer": "Ohm",
        "type": "multiple-choice"
      },
      {
        "question": "What is the formula for Newton's second law of motion?",
        "options": ["F = ma", "E = mc^2", "V = IR", "P = F/A"],
        "correctAnswer": "F = ma",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Light travels faster in water than in a vacuum.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Explain the concept of entropy in thermodynamics.",
        "correctAnswer": "Entropy is a measure of the disorder or randomness in a system.",
        "type": "text"
      },
      {
        "question": "True or False: The speed of light is approximately 299,792 kilometers per second.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the principle of superposition in quantum mechanics.",
        "correctAnswer": "The principle of superposition states that a quantum system can exist in multiple states simultaneously.",
        "type": "text"
      },
      {
        "question": "What is the formula for kinetic energy?",
        "options": ["KE = 1/2 mv^2", "PE = mgh", "F = ma", "E = mc^2"],
        "correctAnswer": "KE = 1/2 mv^2",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The law of conservation of energy states that energy cannot be created or destroyed.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the concept of wave-particle duality.",
        "correctAnswer": "Wave-particle duality is the theory that particles such as electrons exhibit both wave-like and particle-like properties.",
        "type": "text"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_9": {
    "title": "Chemistry Quiz",
    "category": "Chemistry",
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the chemical symbol for Gold?",
        "options": ["Ag", "Au", "Pb", "Hg"],
        "correctAnswer": "Au",
        "type": "multiple-choice"
      },
      {
        "question": "What is the pH value of pure water?",
        "options": ["6", "7", "8", "9"],
        "correctAnswer": "7",
        "type": "multiple-choice"
      },
      {
        "question": "What is the chemical symbol for water?",
        "options": ["H2O", "O2", "CO2", "H2"],
        "correctAnswer": "H2O",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The periodic table was created by Dmitri Mendeleev.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the difference between an element and a compound.",
        "correctAnswer": "An element is a pure substance made of only one type of atom, while a compound is a substance made of two or more different types of atoms bonded together.",
        "type": "text"
      },
      {
        "question": "True or False: The pH scale measures the acidity or alkalinity of a solution.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the process of photosynthesis.",
        "correctAnswer": "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
        "type": "text"
      },
      {
        "question": "What is the most abundant gas in the Earth's atmosphere?",
        "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        "correctAnswer": "Nitrogen",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Atoms are the smallest unit of matter.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Explain the difference between an acid and a base.",
        "correctAnswer": "An acid is a substance that donates protons or hydrogen ions and/or accepts electrons, while a base is a substance that accepts protons or hydrogen ions and/or donates electrons.",
        "type": "text"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_10": {
    "title": "Art Quiz",
    "category": "Art",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Who painted the Mona Lisa?",
        "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
        "correctAnswer": "Leonardo da Vinci",
        "type": "multiple-choice"
      },
      {
        "question": "What is the art style of Picasso known as?",
        "options": ["Cubism", "Impressionism", "Surrealism", "Expressionism"],
        "correctAnswer": "Cubism",
        "type": "multiple-choice"
      },
      {
        "question": "Who painted 'Starry Night'?",
        "options": ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
        "correctAnswer": "Vincent van Gogh",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: Michelangelo painted the ceiling of the Sistine Chapel.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Explain the significance of the Renaissance in art history.",
        "correctAnswer": "The Renaissance was a cultural movement that marked the rebirth of classical learning and arts, leading to significant developments in painting, sculpture, and architecture.",
        "type": "text"
      },
      {
        "question": "Who is known for the painting 'The Persistence of Memory'?",
        "options": ["Salvador Dalí", "Pablo Picasso", "Claude Monet", "Edvard Munch"],
        "correctAnswer": "Salvador Dalí",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Louvre Museum is located in Rome.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      },
      {
        "question": "Describe the characteristics of Baroque art.",
        "correctAnswer": "Baroque art is characterized by dramatic use of light and shadow, intense emotion, and intricate detail.",
        "type": "text"
      },
      {
        "question": "Who painted 'The Last Supper'?",
        "options": ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
        "correctAnswer": "Leonardo da Vinci",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Impressionist movement began in the 19th century.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_11": {
    "title": "Advanced Science Quiz",
    "category": "Science",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        "correctAnswer": "Mitochondria",
        "type": "multiple-choice"
      },
      {
        "question": "Einstein's theory of relativity is a fundamental principle of which field of science?",
        "options": ["Biology", "Chemistry", "Physics", "Geology"],
        "correctAnswer": "Physics",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The speed of light is constant and does not change.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_12": {
    "title": "History of Ancient Civilizations",
    "category": "History",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "In what year did the Roman Empire fall?",
        "options": ["410 AD", "476 AD", "1453 AD", "1204 AD"],
        "correctAnswer": "476 AD",
        "type": "multiple-choice"
      },
      {
        "question": "Who was the first emperor of China?",
        "options": ["Liu Bang", "Qin Shi Huang", "Han Wudi", "Zhou Enlai"],
        "correctAnswer": "Qin Shi Huang",
        "type": "multiple-choice"
      },
      {
        "question": "Describe the significance of the Rosetta Stone.",
        "correctAnswer": "It was the key to deciphering Egyptian hieroglyphs.",
        "type": "text"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_13": {
    "title": "Advanced Mathematics",
    "category": "Mathematics",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "What is the integral of 2x dx?",
        "options": ["x^2 + C", "2x + C", "x^2", "2x"],
        "correctAnswer": "x^2 + C",
        "type": "multiple-choice"
      },
      {
        "question": "What is the value of π (pi) to 5 decimal places?",
        "options": ["3.14159", "3.14149", "3.14169", "3.14259"],
        "correctAnswer": "3.14159",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_14": {
    "title": "World Geography Challenge",
    "category": "Geography",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "Which country has the longest coastline in the world?",
        "options": ["Canada", "Australia", "Russia", "USA"],
        "correctAnswer": "Canada",
        "type": "multiple-choice"
      },
      {
        "question": "What is the capital of Mongolia?",
        "options": ["Ulaanbaatar", "Astana", "Tashkent", "Bishkek"],
        "correctAnswer": "Ulaanbaatar",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Sahara Desert is the largest desert in the world.",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_15": {
    "title": "Modern Literature",
    "category": "Literature",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Who wrote '1984'?",
        "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.K. Rowling"],
        "correctAnswer": "George Orwell",
        "type": "multiple-choice"
      },
      {
        "question": "What is the main theme of 'To Kill a Mockingbird'?",
        "correctAnswer": "The moral nature of human beings, especially the struggle between discrimination and tolerance.",
        "type": "text"
      },
      {
        "question": "True or False: 'The Great Gatsby' is set in the Roaring Twenties.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_16": {
    "title": "Computer Science Fundamentals",
    "category": "Technology",
    "difficulty": "Hard",
    "questions": [
      {
        "question": "What does 'HTML' stand for?",
        "options": ["HyperText Markup Language", "HyperText Management Language", "HyperTool Markup Language", "HyperTool Management Language"],
        "correctAnswer": "HyperText Markup Language",
        "type": "multiple-choice"
      },
      {
        "question": "Explain the concept of polymorphism in object-oriented programming.",
        "correctAnswer": "Polymorphism is the ability of different classes to respond to the same function call in different ways.",
        "type": "text"
      },
      {
        "question": "True or False: In binary code, the digit '1' represents 'on' and the digit '0' represents 'off'.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      }
    ],
    "createdBy": "userID_1",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_17": {
    "title": "Environmental Science",
    "category": "Science",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "What is the main cause of global warming?",
        "options": ["Deforestation", "Burning of fossil fuels", "Overpopulation", "Urbanization"],
        "correctAnswer": "Burning of fossil fuels",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The ozone layer is found in the stratosphere.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the process of photosynthesis.",
        "correctAnswer": "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
        "type": "text"
      }
    ],
    "createdBy": "userID_2",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
  "quizID_18": {
    "title": "World History",
    "category": "History",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Who was the first emperor of Rome?",
        "options": ["Julius Caesar", "Augustus", "Nero", "Caligula"],
        "correctAnswer": "Augustus",
        "type": "multiple-choice"
      },
      {
        "question": "True or False: The Great Wall of China was built during the Ming Dynasty.",
        "options": ["True", "False"],
        "correctAnswer": "True",
        "type": "true-false"
      },
      {
        "question": "Describe the significance of the Magna Carta.",
        "correctAnswer": "The Magna Carta was a charter of liberties that limited the power of the king and laid the foundation for future parliamentary democracy.",
        "type": "text"
      }
    ],
    "createdBy": "userID_3",
    "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
  },
     
    "quizID_19": {
      "title": "Computer Science Basics",
      "category": "Technology",
      "difficulty": "Medium",
      "questions": [
        {
          "question": "What does 'CPU' stand for?",
          "options": ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
          "correctAnswer": "Central Processing Unit",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: RAM is a type of permanent storage.",
          "options": ["True", "False"],
          "correctAnswer": "False",
          "type": "true-false"
        },
        {
          "question": "Explain the purpose of an operating system.",
          "correctAnswer": "An operating system manages the hardware and software resources of a computer.",
          "type": "text"
        },
        {
          "question": "What does 'HTTP' stand for?",
          "options": ["HyperText Transfer Protocol", "HyperText Transfer Program", "HyperTransfer Text Protocol", "HyperTransfer Text Program"],
          "correctAnswer": "HyperText Transfer Protocol",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: A byte consists of 8 bits.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Describe the function of a database.",
          "correctAnswer": "A database is used to store, retrieve, and manage data.",
          "type": "text"
        },
        {
          "question": "What is the main function of a router?",
          "options": ["To connect devices to a network", "To store data", "To process data", "To transfer files"],
          "correctAnswer": "To connect devices to a network",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: Python is a high-level programming language.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain what an algorithm is.",
          "correctAnswer": "An algorithm is a set of instructions designed to perform a specific task.",
          "type": "text"
        },
        {
          "question": "What is the primary purpose of an IP address?",
          "options": ["To identify a device on a network", "To store data", "To process information", "To manage network traffic"],
          "correctAnswer": "To identify a device on a network",
          "type": "multiple-choice"
        }
      ],
      "createdBy": "userID_1",
      "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
    },
    "quizID_20": {
      "title": "Advanced Physics",
      "category": "Physics",
      "difficulty": "Hard",
      "questions": [
        {
          "question": "What is the formula for Newton's second law of motion?",
          "options": ["F = ma", "E = mc^2", "V = IR", "P = F/A"],
          "correctAnswer": "F = ma",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: Light travels faster in water than in a vacuum.",
          "options": ["True", "False"],
          "correctAnswer": "False",
          "type": "true-false"
        },
        {
          "question": "Explain the concept of entropy in thermodynamics.",
          "correctAnswer": "Entropy is a measure of the disorder or randomness in a system.",
          "type": "text"
        },
        {
          "question": "What is the unit of electrical resistance?",
          "options": ["Ohm", "Volt", "Ampere", "Watt"],
          "correctAnswer": "Ohm",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The speed of light is approximately 299,792 kilometers per second.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Describe the principle of superposition in quantum mechanics.",
          "correctAnswer": "The principle of superposition states that a quantum system can exist in multiple states simultaneously.",
          "type": "text"
        },
        {
          "question": "What is the formula for kinetic energy?",
          "options": ["KE = 1/2 mv^2", "PE = mgh", "F = ma", "E = mc^2"],
          "correctAnswer": "KE = 1/2 mv^2",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The law of conservation of energy states that energy cannot be created or destroyed.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the concept of wave-particle duality.",
          "correctAnswer": "Wave-particle duality is the theory that particles such as electrons exhibit both wave-like and particle-like properties.",
          "type": "text"
        },
        {
          "question": "What is the value of Planck's constant?",
          "options": ["6.626 × 10^-34 J·s", "3.00 × 10^8 m/s", "9.81 m/s^2", "1.60 × 10^-19 C"],
          "correctAnswer": "6.626 × 10^-34 J·s",
          "type": "multiple-choice"
        }
      ],
      "createdBy": "userID_2",
      "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
    },
    "quizID_21": {
      "title": "World Geography",
      "category": "Geography",
      "difficulty": "Easy",
      "questions": [
        {
          "question": "What is the largest ocean on Earth?",
          "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
          "correctAnswer": "Pacific Ocean",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: Mount Everest is the highest mountain in the world.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the significance of the equator.",
          "correctAnswer": "The equator is an imaginary line around the middle of the Earth, equidistant from the North and South Poles, dividing the Earth into the Northern and Southern Hemispheres.",
          "type": "text"
        },
        {
          "question": "Which country has the most time zones?",
          "options": ["USA", "Russia", "China", "Canada"],
          "correctAnswer": "Russia",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The Nile is the longest river in the world.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Describe the process of erosion.",
          "correctAnswer": "Erosion is the process by which soil and rock are removed from the Earth's surface by natural processes such as wind or water flow, and then transported and deposited in other locations.",
          "type": "text"
        },
        {
          "question": "What is the capital city of Australia?",
          "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
          "correctAnswer": "Canberra",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The Amazon Rainforest is the largest rainforest in the world.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the difference between latitude and longitude.",
          "correctAnswer": "Latitude is the distance north or south of the equator, while longitude is the distance east or west of the prime meridian.",
          "type": "text"
        },
        {
          "question": "What is the smallest country in the world by area?",
          "options": ["Monaco", "Nauru", "San Marino", "Vatican City"],
          "correctAnswer": "Vatican City",
          "type": "multiple-choice"
        }
      ],
      "createdBy": "userID_3",
      "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
    },
    "quizID_22": {
      "title": "Basic Mathematics",
      "category": "Mathematics",
      "difficulty": "Easy",
      "questions": [
        {
          "question": "What is the value of π (pi) rounded to two decimal places?",
          "options": ["3.12", "3.14", "3.16", "3.18"],
          "correctAnswer": "3.14",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: 0 is an even number.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the concept of prime numbers.",
          "correctAnswer": "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
          "type": "text"
        },
        {
          "question": "What is the result of 7 multiplied by 8?",
          "options": ["54", "56", "58", "60"],
          "correctAnswer": "56",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The sum of the angles in a triangle is 180 degrees.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Describe the Pythagorean theorem.",
          "correctAnswer": "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.",
          "type": "text"
        },
        {
          "question": "What is the value of the square root of 81?",
          "options": ["7", "8", "9", "10"],
          "correctAnswer": "9",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: A parallelogram has opposite sides that are equal in length.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the difference between a fraction and a decimal.",
          "correctAnswer": "A fraction represents a part of a whole and is written as one number over another (e.g., 1/2), while a decimal is a way of representing fractions using powers of ten (e.g., 0.5).",
          "type": "text"
        },
        {
          "question": "What is the result of 12 divided by 4?",
          "options": ["2", "3", "4", "5"],
          "correctAnswer": "3",
          "type": "multiple-choice"
        }
      ],
      "createdBy": "userID_1",
      "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
    },
    "quizID_23": {
      "title": "Chemistry Basics",
      "category": "Chemistry",
      "difficulty": "Easy",
      "questions": [
        {
          "question": "What is the chemical symbol for water?",
          "options": ["H2O", "O2", "CO2", "H2"],
          "correctAnswer": "H2O",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The periodic table was created by Dmitri Mendeleev.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Explain the difference between an element and a compound.",
          "correctAnswer": "An element is a pure substance made of only one type of atom, while a compound is a substance made of two or more different types of atoms bonded together.",
          "type": "text"
        },
        {
          "question": "What is the chemical symbol for Gold?",
          "options": ["Ag", "Au", "Pb", "Hg"],
          "correctAnswer": "Au",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: The pH scale measures the acidity or alkalinity of a solution.",
          "options": ["True", "False"],
          "correctAnswer": "True",
          "type": "true-false"
        },
        {
          "question": "Describe the process of photosynthesis.",
          "correctAnswer": "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
          "type": "text"
        },
        {
          "question": "What is the most abundant gas in the Earth's atmosphere?",
          "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          "correctAnswer": "Nitrogen",
          "type": "multiple-choice"
        },
        {
          "question": "True or False: Atoms are the smallest unit of matter.",
          "options": ["True", "False"],
          "correctAnswer": "False",
          "type": "true-false"
        },
        {
          "question": "Explain the difference between an acid and a base.",
          "correctAnswer": "An acid is a substance that donates protons or hydrogen ions and/or accepts electrons, while a base is a substance that accepts protons or hydrogen ions and/or donates electrons.",
          "type": "text"
        },
        {
          "question": "What is the formula for table salt?",
          "options": ["NaCl", "KCl", "CaCl2", "MgCl2"],
          "correctAnswer": "NaCl",
          "type": "multiple-choice"
        }
      ],
      "createdBy": "userID_2",
      "dateCreated": firebase.firestore.FieldValue.serverTimestamp()
    }
  }
  
;

const sampleResults = {
  "resultID_1": {
    "quizID": "quizID_1",
    "userID": "userID_2",
    "score": 2,
    "dateTaken": "2024-06-05T12:00:00Z"
  },
  "resultID_2": {
    "quizID": "quizID_2",
    "userID": "userID_3",
    "score": 1,
    "dateTaken": "2024-06-06T13:30:00Z"
  },
  "resultID_3": {
    "quizID": "quizID_3",
    "userID": "userID_1",
    "score": 2,
    "dateTaken": "2024-06-07T14:00:00Z"
  },
  "resultID_4": {
    "quizID": "quizID_4",
    "userID": "userID_3",
    "score": 1,
    "dateTaken": "2024-06-08T15:30:00Z"
  },
  "resultID_5": {
    "quizID": "quizID_5",
    "userID": "userID_2",
    "score": 2,
    "dateTaken": "2024-06-09T16:00:00Z"
  },
  "resultID_6": {
    "quizID": "quizID_6",
    "userID": "userID_1",
    "score": 3,
    "dateTaken": "2024-06-10T10:00:00Z"
  },
  "resultID_7": {
    "quizID": "quizID_7",
    "userID": "userID_2",
    "score": 2,
    "dateTaken": "2024-06-11T11:00:00Z"
  },
  "resultID_8": {
    "quizID": "quizID_8",
    "userID": "userID_3",
    "score": 1,
    "dateTaken": "2024-06-12T12:00:00Z"
  },
  "resultID_9": {
    "quizID": "quizID_9",
    "userID": "userID_1",
    "score": 3,
    "dateTaken": "2024-06-13T13:00:00Z"
  },
  "resultID_10": {
    "quizID": "quizID_10",
    "userID": "userID_2",
    "score": 2,
    "dateTaken": "2024-06-14T14:00:00Z"
  }
};

// Ajout d'exemples d'emails et de mots de passe pour les administrateurs
const adminEmails = {
  "adminID_1": {
    "email": "admin1@example.com",
    "password": "password123"
  },
  "adminID_2": {
    "email": "admin2@example.com",
    "password": "password123"
  },
  "adminID_3": {
    "email": "admin3@example.com",
    "password": "password123"
  },
  "adminID_4": {
    "email": "admin4@example.com",
    "password": "password123"
  },
  "adminID_5": {
    "email": "admin5@example.com",
    "password": "password123"
  },
  "adminID_6": {
    "email": "admin6@example.com",
    "password": "password123"
  }
};

// Fonction pour enregistrer les données dans Firestore
const saveDataToFirestore = async (data, collectionName) => {
  try {
    for (const key in data) {
      const item = data[key];
      await db.collection(collectionName).doc(key).set(item);
    }
    console.log(`${collectionName} saved successfully to Firestore.`);
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
};

// Fonction à appeler pour enregistrer les données d'exemple
function saveSampleDataToFirestore() {
  saveDataToFirestore(sampleUsers, 'users');
  saveDataToFirestore(sampleQuizzes, 'quizzes');
  saveDataToFirestore(sampleResults, 'results');
  saveDataToFirestore(adminEmails, 'adminEmails'); // Enregistrer les emails des administrateurs
}

// Appel de la fonction pour enregistrer les données
saveSampleDataToFirestore();

module.exports = { db };
