import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export const BookContext = createContext({});

export const BookProvider = ({ children }) => {
  const localStorageKey = '@kargo:readingList';

  const getReadingList = () => {
    const readingListString = localStorage.getItem(localStorageKey);
    return JSON.parse(readingListString) || [];
  };

  const [readingList, setReadingList] = useState(getReadingList);

  const updateBookStatusById = useCallback(
    (bookId, newStatus) => {
      let hasUpdate = false;

      setReadingList((oldList) => {
        const updatedList = oldList.map((book) => {
          if (book.id === bookId && book.status !== newStatus) {
            book.status = newStatus;
            hasUpdate = true;
          }
          return book;
        });

        localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
        return updatedList;
      });

      return hasUpdate;
    },
    [localStorageKey]
  );

  const addToReadingList = useCallback(
    (book) => {
      const isBookAlreadyAdded = readingList.some(
        (list) => list.id === book.id
      );

      if (isBookAlreadyAdded) {
        return false;
      }

      const newReadingList = [...readingList, { ...book, status: 'Unread' }];
      setReadingList(newReadingList);

      localStorage.setItem(localStorageKey, JSON.stringify(newReadingList));
      return true;
    },
    [readingList, localStorageKey]
  );

  const removeFromReadingList = useCallback(
    (bookId) => {
      const newReadingList = readingList.filter((book) => book.id !== bookId);

      setReadingList(newReadingList);
      localStorage.setItem(localStorageKey, JSON.stringify(newReadingList));

      return true;
    },
    [readingList, localStorageKey]
  );

  const contextValue = useMemo(
    () => ({
      readingList,
      updateBookStatusById,
      addToReadingList,
      removeFromReadingList,
    }),
    [readingList, updateBookStatusById, addToReadingList, removeFromReadingList]
  );

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a Provider');
  }
  return context;
};
