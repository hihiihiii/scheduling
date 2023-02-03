import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const initalTodos = [
  // {
  //   id: 1,
  //   content: "김승환입니다.",
  //   date: 1675165989616,
  //   done: false,
  // },
  // {
  //   id: 2,
  //   content: "강수환입니다.",
  //   date: 1675165989617,
  //   done: false,
  // },
  // {
  //   id: 3,
  //   content: "김철환입니다.",
  //   date: 1675165989618,
  //   done: false,
  // },
  // {
  //   id: 4,
  //   content: "이지혜입니다.",
  //   date: 1675245139274,
  //   done: true,
  // },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.todo;
    case "CREATE":
      const newItem = { ...action.todo };
      newState = [...state, newItem];
      break;
    case "REMOVE":
      newState = state?.filter((el) => el?.id !== action.id);
      break;
    case "TOGGLE":
      newState = state?.map((el) =>
        el?.id === action?.id ? { ...el, done: !el?.done } : el
      );
      break;
    case "EDIT":
      newState = state?.map((el) =>
        el?.id === action.id ? { ...el, content: el?.content } : el
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalTodos);
  const nextId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        nextId.current = parseInt(diaryList[0].id) + 1;
      }
      dispatch({ type: "INIT", todo: diaryList });
    }
  }, []);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoStateContext = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    new Error("에러났습니다.");
  }
  return context;
};

export const useDispatchContext = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    new Error("에러 발생입니다.");
  }
  return context;
};

export const useNextIdContext = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    new Error("에러 발생습니다.");
  }
  return context;
};
