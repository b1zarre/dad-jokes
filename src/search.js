const jokeButton = document.querySelector(".getJoke");
const jokeButtonSpan = jokeButton.querySelector(".jokeText");
const jokeHolder = document.querySelector(".joke p");
const loader = document.querySelector(".loader");
const searchInput = document.querySelector(".searchbox input");
const buttonText = [
  "Ugh.",
  "🤦🏻‍♂️",
  "omg dad.",
  "you are the worst",
  "seriously",
  "stop it.",
  "please stop",
  "that was the worst one",
];

async function fetchJoke() {
  // turn loader on
  loader.classList.remove("hidden");
  const response = await fetch(
    "https://icanhazdadjoke.com/search?term=" + searchInput.value,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  // turn the loader off
  loader.classList.add("hidden");
  return data;
}

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function handleClick() {
  const joke = await fetchJoke();
  jokeHolder.innerHTML = "";
  for (i = 0; i < joke.results.length; i++) {
    jokeHolder.innerHTML += [i + 1] + "." + joke.results[i].joke + "<br/>";
  }
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
  console.log(joke);
}

jokeButton.addEventListener("click", handleClick);
