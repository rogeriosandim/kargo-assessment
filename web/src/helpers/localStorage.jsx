export const addToReadingList = (book) => {
  const existingList = JSON.parse(localStorage.getItem('@readingList')) || [];

  const isBookAlreadyAdded = existingList.some((list) => list.id === book.id);

  if (!isBookAlreadyAdded) {
    const bookToAdd = { ...book, status: 'Unread' };
    existingList.push(bookToAdd);

    localStorage.setItem('@readingList', JSON.stringify(existingList));

    return true;
  } else {
    return false;
  }
};

export const removeFromReadingList = (bookId) => {
  const existingList = JSON.parse(localStorage.getItem('@readingList')) || [];
  const bookIndex = existingList.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    existingList.splice(bookIndex, 1);

    localStorage.setItem('@readingList', JSON.stringify(existingList));

    return true;
  } else {
    return false;
  }
};

export const updateBookStatusById = (bookId, newStatus) => {
  const existingList = JSON.parse(localStorage.getItem('@readingList')) || [];

  const bookIndex = existingList.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1 && existingList[bookIndex].status !== newStatus) {
    existingList[bookIndex].status = newStatus;

    localStorage.setItem('@readingList', JSON.stringify(existingList));

    return true;
  } else {
    return false;
  }
};

export const getReadingList = () => {
  const readingListString = localStorage.getItem('@readingList');

  const readingList = JSON.parse(readingListString) || [];

  return readingList;
};

export const getReadingListQuantity = () => {
  const totalBooks = getReadingList();
  return totalBooks.length;
};
