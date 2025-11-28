import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesList from '../screens/NotesList';
import NoteEditor from '../screens/NoteEditor';
import Profile from '../screens/Profile';
import CategoryView from '../screens/CategoryView';

const Stack = createNativeStackNavigator();

export default function MainStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={NotesList} />
      <Stack.Screen name="Editor" component={NoteEditor} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Category" component={CategoryView} />
    </Stack.Navigator>
  );
}
