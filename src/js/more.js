const MORE_BTN_LAYOUT = `<div class="button button--uppercase button--bold button--big button--alt">Показать больше</div>`;
const VIEW_COUNT = 6;

const moreArticles = document.querySelectorAll(`.more`);

const moreBtnOnClick = (elements, moreBtn) => {
  elements.forEach((element) => {
    if (element.style.display === `none`) {
      element.style.display = `flex`;
    }
  });
  moreBtn.style.display = `none`;
}

const showMoreBtn = (article, elements) => {
  const moreBtn = document.createElement(`div`);
  moreBtn.classList.add(`grid__element`, `grid__element--wide`);
  moreBtn.innerHTML = MORE_BTN_LAYOUT;
  moreBtn.addEventListener(`click`, () => {
    moreBtnOnClick(elements, moreBtn);
  });
  article.appendChild(moreBtn);
}

const toggleExtraElements = (elements, count) => {
  elements.forEach((element, i) => {
    if (i >= count) {
      element.style.display = `none`;
    }
  });
};

const moreArticlesOnLoad = (article) => {
  const elements = article.querySelectorAll(`.preview`);
  if (elements.length >= VIEW_COUNT) {
    toggleExtraElements(elements, VIEW_COUNT);
    showMoreBtn(article, elements);
  }
};

moreArticles.forEach((article) => {
  moreArticlesOnLoad(article);
});