import React, { ChangeEvent, RefObject } from 'react';
import './TodoList.css';
import TodoListElement from './TodoListElement';
import LocalStorageTodoList from '../../utills/LocalStorageTodoList';

interface ListElement {
  taskName: string
}

interface State {
  listElements: Array<ListElement>,
  inputVal: string
}

export default class TodoList extends React.Component<{}, State> {
  taskFieldRef: RefObject<HTMLInputElement>;

  todoStorage: LocalStorageTodoList;

  constructor(props: {}, state: State) {
    super(props, state);
    this.addElement = this.addElement.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.loadElements = this.loadElements.bind(this);
    this.todoStorage = new LocalStorageTodoList();
    this.taskFieldRef = React.createRef();
    this.state = {
      listElements: this.todoStorage.getItems().map((elem: string) => ({ taskName: elem })),
      inputVal: '',
    };
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  loadElements(saveInputVal: boolean) {
    const newStateArr: Array<ListElement> = this.todoStorage.getItems().map((elem: string) => ({ taskName: elem }));
    const newInputVal = saveInputVal ? this.taskFieldRef.current?.value || '' : '';
    this.setState({ listElements: newStateArr, inputVal: newInputVal });
  }

  addElement(elem: ListElement) {
    this.todoStorage.addItemToStorage(elem.taskName);
    this.loadElements(false);
  }

  removeElement(idx: number) {
    this.todoStorage.removeItemFromStorage(idx);
    this.loadElements(true);
  }

  render() : React.ReactNode {
    return (
      <div className="todoList">
        <div className="todoList__header">
          <h1>ToDo List</h1>
        </div>
        <div className="todoList__body">
          { this.state.listElements.map(
            (elem: ListElement, idx: number) => (
              <TodoListElement
                taskName={elem.taskName}
                listIndex={idx}
                removeCallback={this.removeElement}
                key={idx}
              />
            ),
          )}
        </div>
        <div className="todoList__buttonArea">
          <span>Задача: </span>
          <input type="text" ref={this.taskFieldRef} value={this.state.inputVal} onChange={this.handleInputChange} />
          <input type="button" value="Добавить" onClick={() => this.addElement({ taskName: this.taskFieldRef.current?.value || 'Неизвестность' })} />
        </div>
      </div>
    );
  }
}
