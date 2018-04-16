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

export { saveLayoutToStorage, loadLayoutsFromStorage };
