import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

interface Subtask{
  id: number;
  text: string;
  completed: boolean;
}

interface Task { 
  id: number;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
}

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [subtaskText, setSubtaskText] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false, subtasks: []}]);
      setTask('');
    }
  };

  const handleAddSubtask = (taskId: number) => {
    if (subtaskText) {
      setTasks(tasks.map(t =>
        t.id === taskId
          ? { ...t, subtasks: [...t.subtasks, { id: Date.now(), text: subtaskText, completed: false }] }
          : t
      ));
      setSubtaskText('');
    }
  };

  const handleToggleTask = (id: number) => { 
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleToggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map(st =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            )
          }
        : t
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
          <View style={styles.titleRow}>
          <Image
            source={require('./kuromiwan.png')}
            style={styles.image} 
          />  
          <Text style={styles.sectionTitle}>TO-DO LIST</Text>
        </View>
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


        <ScrollView style={styles.tasksList}>
          <Text style={styles.listTitle}>Current Tasks</Text>
          <TouchableOpacity style={styles.toggleAll} onPress={handleToggleAllTasks}>
          <Text style={styles.addButtonText}>Toggle All Tasks</Text>
        </TouchableOpacity>
        {uncheckedTasks.map(t => (
            <View key={t.id}>
              <TouchableOpacity style={styles.task} onPress={() => handleToggleTask(t.id)}>
                <View style={[styles.checkbox, t.completed && styles.checkboxChecked]}>
                  {t.completed && <Text style={styles.checkboxText}>✔</Text>}
                </View>
                <Text style={[styles.taskText, t.completed && styles.taskTextCompleted]}>{t.text}</Text>
              </TouchableOpacity>
              
              {t.subtasks.length > 0 && (
                <View style={styles.subtaskWrapper}>
                  {t.subtasks.map(st => (
                    <TouchableOpacity key={st.id} style={styles.subtask} onPress={() => handleToggleSubtask(t.id, st.id)}>
                      <View style={[styles.checkbox, st.completed && styles.checkboxChecked]}>
                        {st.completed && <Text style={styles.checkboxText}>✔</Text>}
                      </View>
                      <Text style={[styles.taskText, st.completed && styles.taskTextCompleted]}>{st.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            
              {selectedTaskId === t.id && (
                <View style={styles.inputSubtaskContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Add a subtask"
                    value={subtaskText}
                    onChangeText={setSubtaskText}
                  />
                  <TouchableOpacity style={styles.addSubtaskButton} onPress={() => handleAddSubtask(t.id)}>
                    <Text style={styles.addButtonText}>Add Subtask</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity onPress={() => setSelectedTaskId(t.id === selectedTaskId ? null : t.id)}>
                <Text style={styles.subtaskToggleText}>{selectedTaskId === t.id ? 'Hide Subtasks' : 'Add a subtask'}</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#f0e2e2',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#FFC0CB',
    borderWidth: 2.5,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#FFC0CB',
    color: '#000',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth:  2.5, 
  },

  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tasksList: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
    marginBottom: 1,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFC0CB', 
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#FFC0CB',
  },
  checkboxText: {
    color: '#000',
  },
  taskText: {
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  toggleAll: {
    backgroundColor: '#FFC0CB',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    borderColor: '#000',
    borderWidth:  2.5, 
  },
  image:{
    width: 150,
    height: 150,
  },
  titleRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subtaskWrapper: {
    paddingLeft: 50,
  },
  subtask:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  subtaskToggleText:{
    fontSize: 12,
    color: '#000',
    marginLeft:10,
    paddingLeft: 50,
    fontWeight:'bold',  
  },
  inputSubtaskContainer: {
    paddingLeft:50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSubtaskButton: {
    backgroundColor: '#dd868c',
    color: '#000',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth:  2.5, 
  },
});
