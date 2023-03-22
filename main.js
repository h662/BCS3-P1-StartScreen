const QUOTES = "quotes";

const time = document.querySelector(".time");

function getTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify(["철저하게 살지 않으면, 처절하게 살아가야 한다."])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "flex";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  newQuotes.style.display = "none";
  quotesMsg.innerText = newQuotesInput.value;
}

let isLoad = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  if (!searchInput.value) {
    return;
  }
  if (isLoad) {
    // 삭제
    console.log("로딩중입니다.");
    return;
  }

  const question = searchInput.value;
  isLoad = true;
  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  const response = await axios.post(
    "http://localhost:3010/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer BLOCKCHAINSCHOOL3`,
      },
    }
  );

  if (response.status == 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
    console.log(response);
  }

  searchInput.value = "";
  isLoad = false;
}
