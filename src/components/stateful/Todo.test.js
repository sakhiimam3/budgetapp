import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from './Todo';

describe('Todo Component', () => {
  test('renders correctly with an empty list of todos', () => {
    render(<Todo />);

    // Check for the heading
    expect(screen.getByText('Todo List')).toBeInTheDocument();

    // Check for the input field
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();

    // Check for the Add button
    expect(screen.getByText('Add')).toBeInTheDocument();

    // Check that no list items are present initially
    // queryAllByRole will return an empty array if no items are found
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('allows adding a new todo', () => {
    render(<Todo />);
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');

    // Type into the input field
    fireEvent.change(inputField, { target: { value: 'New Todo Item' } });
    expect(inputField.value).toBe('New Todo Item');

    // Click the Add button
    fireEvent.click(addButton);

    // Check if the new todo item is in the document
    // It should be within a listitem role
    const todoItem = screen.getByText('New Todo Item');
    expect(todoItem).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toContainElement(todoItem);

    // Check that the input field is cleared
    expect(inputField.value).toBe('');
  });

  test('allows removing a todo', () => {
    render(<Todo />);
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');

    // Add a todo first
    fireEvent.change(inputField, { target: { value: 'Todo to remove' } });
    fireEvent.click(addButton);

    // Check it was added
    let todoTextElement = screen.getByText('Todo to remove');
    expect(todoTextElement).toBeInTheDocument();

    // Find the remove button associated with this todo item
    // The remove button is within the same listitem as the text
    // We assume the 'Remove' button is unique to the item or the first one if multiple items had same text
    const listItem = todoTextElement.closest('li');
    const removeButton = listItem ? listItem.querySelector('button') : null;
    // A more robust way would be to use queryByRole within the list item
    // const removeButton = within(listItem).getByRole('button', { name: /remove/i });

    expect(removeButton).toBeInTheDocument(); // Ensure the button is found
    fireEvent.click(removeButton);

    // Check that the todo item is no longer in the document
    expect(screen.queryByText('Todo to remove')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('does not add an empty todo', () => {
    render(<Todo />);
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');

    // Ensure input is empty or only whitespace
    fireEvent.change(inputField, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // Check that no list items are added
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    // Ensure input field is not cleared if it was just whitespace (it should be cleared by the component logic)
    // The current component logic clears it, so we test that.
     expect(inputField.value).toBe('');
  });
});
