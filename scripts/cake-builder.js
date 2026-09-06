

// Choose Your Size
// - 6-inch, 8-inch, or 10-inch

// Choose Your Cake Flavor
// - Vanilla, chocolate, red velvet, or lemon

// Choose Your Frosting
// - Vanilla buttercream, chocolate buttercream, or cream cheese

// Personalize Your Cake
// - Occasion and optional inscription

const storageKey = 'cakeBuilderData'

const questions = [
    { step: 1, question: 'Choose Your Size', options: ['6-inch', '8 inch', '10-inch'] },
    { step: 2, question: 'Choose Your Cake Flavor', options: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon'] },
    { step: 3, question: 'Choose Your Frosting', options: ['Vanilla Buttercream', 'Chocolate Buttercream', "Cream Cheese"] },
];


const button = document.getElementById('cake-builder-button');
const questionLabel = document.getElementById('question');
const options = document.getElementById('options');

button.addEventListener('click', function () {
    // get the data
    let data = localStorage.getItem(storageKey)
    data = JSON.parse(data);
    if (!data) {
        alert("There was an issue");
    }

    console.log('data', data)

    // find the currently displayed question
    let item = data.find(d => d.isCurrent);
    let nextItem = data.find(d => d.step == item.step + 1)

    console.log('item', item)
    console.log('next', nextItem)

    // get the value of the radio buttons,
    const value =
        document.querySelector('input[name="step-option"]:checked')?.value;


    // ... and set it if there's a value
    if (value) {
        item.answer = value;
        item.isCurrent = false;

        if (nextItem) {
            setQuestion(questions, nextItem.step);
            nextItem.isCurrent = true;
        } else {
            questionLabel.textContent = "That's all we need."
            options.replaceChildren();
            button.value = 'Order Your Cake!'
            button.addEventListener("click", () => {
                window.location.href = "contact.html";
            });
        }
        localStorage.setItem(storageKey, JSON.stringify(data))
    }
});

initialize();

function initialize() {
    const data = [
        { step: 1, answer: null, isCurrent: true },
        { step: 2, answer: null, isCurrent: false },
        { step: 3, answer: null, isCurrent: false },
    ]

    localStorage.setItem(storageKey, JSON.stringify(data));

    questionLabel.textContent = questions[0].question;
    setQuestion(questions, 1)
};

function setQuestion(questions, step) {
    button.disabled = true;
    const data = questions.find((question) => question.step === step);

    if (!data) return;

    questionLabel.textContent = data.question;
    options.replaceChildren();

    data.options.forEach((optionText, index) => {
        const id = `step-${step}-option-${index}`;

        const option = document.createElement("input");
        option.type = "radio";
        option.name = "step-option";
        option.id = id;
        option.value = optionText;

        option.addEventListener("change", (event) => {
            if (event.target.checked) {
                button.disabled = false;
            }
        });

        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = optionText;
        options.append(option, label);
    });

}