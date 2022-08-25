import { Provider } from "react-redux";
import store from "./app/store";
import TodoList from "src/components/TodoList";

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
