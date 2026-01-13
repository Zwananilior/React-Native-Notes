import React, {useState} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../utils/auth';
import { addNote, updateNote } from '../utils/storage';

export default function NoteEditor({route,navigation}:any){
  const {mode, note} = route.params || {};
  const { user } = useAuth();
  const [title,setTitle] = useState(note?.title || '');
  const [text,setText] = useState(note?.text || '');
  const [category,setCategory] = useState(note?.category || 'general');

  const save = async () => {
    if (!user) return;
    try {
      if (mode==='edit') {
        await updateNote(user.email, note.id, { title, text, category });
      } else {
        await addNote(user.email, { title, text, category });
      }
      navigation.goBack();
    } catch(e){
      Alert.alert('Error', String(e));
    }
  };

  return (
    <View style={{flex:1,padding:12}}>
      <TextInput placeholder="Title (optional)" value={title} onChangeText={setTitle} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Write your note..." value={text} onChangeText={setText} multiline style={{borderWidth:1,padding:8,flex:1,textAlignVertical:'top'}} />
      <Button title="Save" onPress={save} />
    </View>
  );
}
