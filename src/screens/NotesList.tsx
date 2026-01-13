import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../utils/auth';
import { loadNotes, deleteNote, Note } from '../utils/storage';
import { useIsFocused } from '@react-navigation/native';

export default function NotesList({navigation}:any){
  const { user, logout } = useAuth();
  const [notes,setNotes] = useState<Note[]>([]);
  const [query,setQuery] = useState('');
  const [sortDesc,setSortDesc] = useState(true);
  const focused = useIsFocused();

  const fetchNotes = useCallback(async ()=>{
    if (!user) return;
    const data = await loadNotes(user.email);
    setNotes(data);
  },[user]);

  useEffect(()=>{ if (focused) fetchNotes(); },[focused,fetchNotes]);

  const onDelete = async (id:string) => {
    if (!user) return;
    await deleteNote(user.email,id);
    fetchNotes();
  };

  const filtered = notes.filter(n=>{
    if (!query) return true;
    const tokens = query.toLowerCase().split(' ').filter(Boolean);
    const hay = (n.text + ' ' + (n.title || '')).toLowerCase();
    return tokens.every(t=>hay.includes(t));
  }).sort((a,b)=>{
    return sortDesc ? (b.createdAt.localeCompare(a.createdAt)) : (a.createdAt.localeCompare(b.createdAt));
  });

  return (
    <View style={{flex:1,padding:12}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
        <Button title="New Note" onPress={()=>navigation.navigate('Editor',{mode:'create'})} />
        <Button title="Profile" onPress={()=>navigation.navigate('Profile')} />
        <Button title="Logout" onPress={logout} />
      </View>

      <TextInput placeholder="Search notes..." value={query} onChangeText={setQuery} style={{borderWidth:1,marginBottom:8,padding:8}} />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
        <Button title={sortDesc ? "Sort: New→Old" : "Sort: Old→New"} onPress={()=>setSortDesc(s=>!s)} />
        <Button title="Categories" onPress={()=>navigation.navigate('Category')} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('Editor',{mode:'edit',note:item})} style={{padding:10,borderWidth:1,marginBottom:6}}>
            <Text style={{fontWeight:'bold'}}>{item.title || '(no title)'} — {item.category}</Text>
            <Text numberOfLines={2}>{item.text}</Text>
            <Text style={{fontSize:12,color:'#666'}}>{new Date(item.createdAt).toLocaleString()}{item.updatedAt ? ' • edited '+new Date(item.updatedAt).toLocaleString() : ''}</Text>
            <View style={{flexDirection:'row',marginTop:6}}>
              <Button title="Delete" onPress={()=>onDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
