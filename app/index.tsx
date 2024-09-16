import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

interface Task { 
  id: number;
  text: string;
  completed: boolean;
}

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]); // Provide the type for tasks
  const [task, setTask] = useState<string>(''); // Provide the type for task

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleToggleTask = (id: number) => { // Provide the type for id
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleToggleAllTasks = () => {
    const allCompleted = tasks.every(t => t.completed);
    setTasks(tasks.map(t => ({ ...t, completed: !allCompleted })));
  };

  const uncheckedTasks = tasks.filter(t => !t.completed);
  const checkedTasks = tasks.filter(t => t.completed);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.toggleAll} onPress={handleToggleAllTasks}>
          <Text>Toggle All Tasks</Text>
        </TouchableOpacity>

        <ScrollView style={styles.tasksList}>
          <Text style={styles.listTitle}>Current Tasks</Text>
          {uncheckedTasks.map(t => (
            <TouchableOpacity key={t.id} style={styles.task} onPress={() => handleToggleTask(t.id)}>
              <View style={[styles.checkbox, t.completed && styles.checkboxChecked]}>
                {t.completed && <Text style={styles.checkboxText}>✔</Text>}
              </View>
              <Text style={[styles.taskText, t.completed && styles.taskTextCompleted]}>{t.text}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.listTitle}>Completed Tasks</Text>
          {checkedTasks.map(t => (
            <TouchableOpacity key={t.id} style={styles.task} onPress={() => handleToggleTask(t.id)}>
              <View style={[styles.checkbox, t.completed && styles.checkboxChecked]}>
                {t.completed && <Text style={styles.checkboxText}>✔</Text>}
              </View>
              <Text style={[styles.taskText, t.completed && styles.taskTextCompleted]}>{t.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#9db4c2',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#434c52',
    fontWeight: 'bold',
  },
  tasksList: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#9db4c2',
  },
  checkboxText: {
    color: '#fff',
  },
  taskText: {
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  toggleAll: {
    backgroundColor: '#9db4c2',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center', 
  }
});
