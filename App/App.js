import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Rebecca components
import React, { useState } from 'react';
import FormikForm from './profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Rebecca components ^^^^

export default function App() {

// Rebecca components
  const [fields, updateFields] = useState(
    {
      address: '123 Main Street',
      email: "test@example.ca",
      first_name: 'Test',
      last_name: 'Testerson',
      password: '******',
      phone_no: '5199999999'   
    }
  );
// Rebecca components ^^^^

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text> 
      <StatusBar style="auto" />
      {/*<FormikForm fields={fields} updateFields={updateFields}/> {/* Rebecca components*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
