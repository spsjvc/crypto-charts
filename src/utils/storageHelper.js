const saveLayoutToStorage = layout => {
  const stringifiedSavedLayouts = localStorage.getItem('savedLayouts');
  const savedLayouts = stringifiedSavedLayouts
    ? JSON.parse(stringifiedSavedLayouts)
    : [];

  localStorage.setItem(
    'savedLayouts',
    JSON.stringify(savedLayouts.concat([layout]))
  );
};

const loadLayoutsFromStorage = () => {
  const stringifiedSavedLayouts = localStorage.getItem('savedLayouts');
  const savedLayouts = stringifiedSavedLayouts
    ? JSON.parse(stringifiedSavedLayouts)
    : [];

  return savedLayouts;
};

const removeLayoutFromStorage = layout => {
  const savedLayouts = JSON.parse(localStorage.getItem('savedLayouts'));

  localStorage.setItem(
    'savedLayouts',
    JSON.stringify(savedLayouts.filter(l => l.name !== layout))
  );
};

const checkIsTutorialSeen = () => {
  const stringified = localStorage.getItem('isTutorialSeen');
  return stringified ? JSON.parse(stringified) : false;
};

const setTutorialToSeen = () => {
  localStorage.setItem('isTutorialSeen', JSON.stringify(true));
};

export {
  saveLayoutToStorage,
  loadLayoutsFromStorage,
  removeLayoutFromStorage,
  checkIsTutorialSeen,
  setTutorialToSeen
};
