Profile



import React, {useState} from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useAuth } from '../utils/auth';

export default function Profile({navigation}: any){
  const { user, updateProfile, logout } = useAuth();
  const [username,setUsername] = useState(user?.username || '');
  const [password,setPassword] = useState(user?.password || '');

  const save = async () => {
    await updateProfile({ username, password });
    Alert.alert('Saved');
    navigation.navigate("Notes"); // FIX ADDED
  };

  return (
    <View style={{flex:1,padding:12}}>
      <Text style={{marginBottom:10}}>Email: {user?.email}</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <Button title="Save" onPress={save} />

      <View style={{height:10}}/>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}