import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  CssBaseline
} from '@mui/material';
import { Delete, Add, Done } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: '20px auto',
  maxWidth: '600px',
  borderRadius: '15px',
  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
}));

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5', p: 3 }}>
      <CssBaseline />
      <StyledPaper>
        <Typography variant="h4" gutterBottom sx={{ 
          color: '#1976d2', 
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4
        }}>
          Modern Todo List
        </Typography>
        
        <Box component="form" onSubmit={addTodo} sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={addTodo} color="primary">
                  <Add />
                </IconButton>
              ),
            }}
          />
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                bgcolor: todo.completed ? '#e8f4ff' : 'white',
                mb: 1,
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)'
                }
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                color="primary"
                icon={<span style={{ 
                  width: 24, 
                  height: 24, 
                  border: '2px solid #1976d2', 
                  borderRadius: '4px' 
                }} />}
                checkedIcon={<Done sx={{ 
                  color: 'white', 
                  bgcolor: '#1976d2', 
                  borderRadius: '4px',
                  p: 0.5 
                }} />}
              />
              <ListItemText
                primary={todo.text}
                primaryTypographyProps={{
                  sx: {
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : '#333',
                    fontSize: '1.1rem'
                  }
                }}
                secondary={`Created: ${new Date(todo.createdAt).toLocaleString()}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => deleteTodo(todo.id)} edge="end">
                  <Delete sx={{ color: '#ff4444' }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Typography variant="body2" sx={{ 
          textAlign: 'center', 
          color: '#666',
          mt: 3
        }}>
          {todos.length} tasks • {todos.filter(t => t.completed).length} completed
        </Typography>
      </StyledPaper>
    </Box>
  );
};

export default TodoList;