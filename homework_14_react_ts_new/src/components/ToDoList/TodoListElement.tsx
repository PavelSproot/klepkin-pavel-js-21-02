import React from 'react';
import './TodoListElement.css';

interface Props {
  taskName: string,
  listIndex: number,
  removeCallback: Function
}

export default class TodoListElement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleRemove() {
    this.props.removeCallback(this.props.listIndex);
  }

  render() : React.ReactNode {
    return (
      <div className="todoListElement">
        <div className="todoListElement__taskName">{this.props.taskName}</div>
        <div className="todoListElement__removeBlock"><span className="labelRemove" onClick={() => this.handleRemove()}>Удалить</span></div>
      </div>
    );
  }
}
