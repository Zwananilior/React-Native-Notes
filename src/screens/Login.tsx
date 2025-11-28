import React, {useState} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../utils/auth';

export default function Login({navigation}:any){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {login} = useAuth();

  const submit = async () => {
    const res = await login(email,password);
    if (!res.success) Alert.alert('Error', res.message);
  };

  return (
    <View style={{flex:1,padding:20,justifyContent:'center'}}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{borderWidth:1,marginBottom:10,padding:8}} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1,marginBottom:10,padding:8}} />
      <Button title="Login" onPress={submit} />
      <View style={{height:10}}/>
      <Button title="Register" onPress={()=>navigation.navigate('Register')} />
    </View>
  );
}
