export const addToReadingList = (book) => {
  const existingList = JSON.parse(localStorage.getItem('readingList')) || [];

  const isBookAlreadyAdded = existingList.some((list) => list.id === book.id);

  if (!isBookAlreadyAdded) {
    existingList.push(book);

    localStorage.setItem('readingList', JSON.stringify(existingList));

    return true;
  } else {
    return false;
  }
};

export const getReadingList = () => {
  const readingListString = localStorage.getItem('readingList');

  const readingList = JSON.parse(readingListString) || [];

  return readingList;
};

export const getReadingListQuantity = () => {
  const totalBooks = getReadingList();
  return totalBooks.length;
};
