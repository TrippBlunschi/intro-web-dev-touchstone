const storageKey = "cakeBuilderData";
const data = JSON.parse(localStorage.getItem(storageKey));

if (data) {
  const element = document.getElementById("details");

  element.value = [
    "*** CAKE BUILDER DETAILS ***",
    ...data
      .filter((item) => item.answer)
      .map((item) => `${item.property}: ${item.answer}`)
  ].join("\n");
}


