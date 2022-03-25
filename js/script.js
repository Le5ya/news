const API_KEY = "d773b6729754413abf0cb131aec6edc1";
const choicesElem = document.querySelector(".js-choice");
const newsList = document.querySelector(".news-list");
const formSearch = document.querySelector(".form-search");
const title = document.querySelector(".title");

const choices = new Choices(choicesElem, {
  searchEnabled: false,
  itemSelectText: "",
});

const getdata = async (url) => {
  const response = await fetch(url, {
    // mode: "no-cors",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  const data = await response.json();

  return data;
};
const getDateCorrectFormat = (isoDate) => {
  const date = new Date(isoDate);
  const fullDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const fullTime = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<span class="news-date">${fullDate}</span> ${fullTime}`;
};

const getImage = (url) =>
  new Promise((resolve) => {
    const image = new Image(270, 200);

    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", () => {
      image.src = "image/no-photo.jpg";
      resolve(image);
    });
    image.src = url || "image/no-photo.jpg";
    image.className = "news-image";
    return image;
  });

const renderCard = (data) => {
  newsList.textContent = "";
  data.forEach(
    async ({ urlToImage, title, url, description, publishedAt, author }) => {
      const card = document.createElement("li");
      card.className = "news-item";

      const image = await getImage(urlToImage);
      card.append(image);
      image.alt = title;
      card.insertAdjacentHTML(
        "beforeend",
        `;
          <h3 class="news-title">
            <a href="${url || ""}" class="news-link" target="blank">${
          title || ""
        }</a>
          </h3>
          <p class="news-description">
            ${description || ""}
          </p>
          <div class="news-footer">
            <time class="news-datetime" datetime="${publishedAt}">
              ${getDateCorrectFormat(publishedAt)}
            </time>
            <div class="news-author">${author || ""}</div>
          </div>
       `
      );
      newsList.append(card);
    }
  );
};

const loadNews = async () => {
  // newsList.innerHTML = '<li class="preload"></li>';
  const preload = document.createElement("li");
  preload.className = "preload";
  newsList.append(preload);
  const country = localStorage.getItem("country") || "ru";
  choices.setChoiceByValue(country);
  title.classList.add("hide");

  const data = await getdata(
    `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100&category=science`
  );
  renderCard(data.articles);
};

const loadSearch = async (value) => {
  const data = await getdata(
    `https://newsapi.org/v2/everything?q=${value}&pageSize=100`
  );

  // wordForm = function (value, words) {
  //   words = ["результат", "результата", "результатов"];
  //   value = Math.abs(value) % 100;
  //   let n = value % 10;
  //   if (value > 10 && value < 20) return words[2];
  //   if (n > 1 && n < 5) return words[1];
  //   if (n === 1) return words[0];
  //   return words[2];
  // };
  // let res = wordForm()

  title.classList.remove("hide");
  title.textContent = `По вашему запросу “${value}” найдено ${data.articles.length} результатов`;
  choices.setChoiceByValue("");
  renderCard(data.articles);
};

choicesElem.addEventListener("change", (event) => {
  const value = event.detail.value;
  localStorage.setItem("country", value);
  loadNews();
});

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  loadSearch(formSearch.search.value);
  formSearch.reset();
});

loadNews();
