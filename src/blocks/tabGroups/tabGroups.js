const SMALL = 100;
const BIG = 200;

const tabGroups = document.querySelector(`.tabGroups`);
const tabInputs = tabGroups.querySelectorAll(`.tabGroups__tabInput`);
const tabGroupsSelect = tabGroups.querySelector(`.tabGroups__select`);
const tabGroupsLabels = tabGroups.querySelectorAll(`.tabGroups__label`);
const projects = document.querySelector(`#projects-all`);
const projectsItems = projects.querySelectorAll(`.preview`);
const labelTab1 = tabGroups.querySelector(`#labelTab1`);
const labelTab2 = tabGroups.querySelector(`#labelTab2`);
const labelTab3 = tabGroups.querySelector(`#labelTab3`);
const labelTab4 = tabGroups.querySelector(`#labelTab4`);

const showSmallStructures = () => {
  projectsItems.forEach((item) => {
    item.style.display = `flex`;
    if (item.dataset.square >= SMALL) {
      item.style.display = `none`;
    }
  })
}

const showMediumStructures = () => {
  projectsItems.forEach((item) => {
    item.style.display = `flex`;
    if (item.dataset.square < SMALL || item.dataset.square >= BIG) {
      item.style.display = `none`;
    }
  })
}

const showBigStructures = () => {
  projectsItems.forEach((item) => {
    item.style.display = `flex`;
    if (item.dataset.square < BIG) {
      item.style.display = `none`;
    }
  })
}

const showSaunas = () => {
  projectsItems.forEach((item) => {
    item.style.display = `flex`;
    const type = item.dataset.type;
    if (!type.startsWith(`sauna`)) {
      item.style.display = `none`;
    }
  })
}

labelTab1.addEventListener(`click`, showSmallStructures);
labelTab2.addEventListener(`click`, showMediumStructures);
labelTab3.addEventListener(`click`, showBigStructures);
labelTab4.addEventListener(`click`, showSaunas);

const tabGroupsSelectOnChange = (evt) => {
  const selectedTab = tabInputs[tabGroupsSelect.selectedIndex];
  selectedTab.click();
  selectedTab.labels[0].click();
  window.location.hash = selectedTab.dataset.tab;
};

const tabGroupsLabelsOnClick = (evt) => {
  const currentSelect = tabGroups.querySelector(`#${evt.target.htmlFor}`);
  window.location.hash = currentSelect.dataset.tab;
}

tabGroupsLabels.forEach((label) => {
  label.addEventListener(`click`, tabGroupsLabelsOnClick);
})

tabGroupsSelect.addEventListener(`change`, tabGroupsSelectOnChange);

const tabSelect = (hash) => {
  let exactTab = null;
  tabInputs.forEach((tab) => {
    if (tab.dataset.tab == hash) {
      exactTab = tab;
    }
  })
  exactTab.click();
  exactTab.labels[0].click();
}

if (window.location.hash) {
  tabSelect(window.location.hash);
} else {
  showSmallStructures();
}

const hashChanged = () => {
  if (window.location.hash) {
    tabSelect(window.location.hash);
  }
};
window.addEventListener(`hashchange`, hashChanged, false);