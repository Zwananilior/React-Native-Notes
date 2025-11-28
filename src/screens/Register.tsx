import React, {useState} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../utils/auth';

export default function Register(){
  const [email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const {register} = useAuth();

  const submit = async () => {
    const res = await register({email,username,password});
    if (!res.success) Alert.alert('Error', res.message);
  };

  return (
    <View style={{flex:1,padding:20,justifyContent:'center'}}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{borderWidth:1,marginBottom:10,padding:8}} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{borderWidth:1,marginBottom:10,padding:8}} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1,marginBottom:10,padding:8}} />
      <Button title="Create Account" onPress={submit} />
    </View>
  );
}
