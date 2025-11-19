import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../utils/auth';
import { loadNotes } from '../utils/storage';

export default function CategoryView({navigation}:any){
  const { user } = useAuth();
  const [categories,setCategories] = useState<Record<string,number>>({});

  useEffect(()=>{ (async ()=>{
    if (!user) return;
    const notes = await loadNotes(user.email);
    const counts:Record<string,number> = {};
    notes.forEach(n=>counts[n.category] = (counts[n.category]||0)+1);
    setCategories(counts);
  })(); },[user]);

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList
        data={Object.entries(categories)}
        keyExtractor={([k])=>k}
        renderItem={({item:[cat,count]})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('Notes',{category:cat})} style={{padding:10,borderWidth:1,marginBottom:6}}>
            <Text>{cat} — {count}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
