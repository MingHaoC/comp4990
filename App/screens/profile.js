// App.js
import React, { Component, useState } from 'react';
import { TextInput, Text, Button, Alert, View, StyleSheet } from 'react-native';
import { Formik } from 'formik'
import PropTypes from 'prop-types';



export default function Profile(){

  //Indicate if user is editing or reading their profile
  //If isEditing is true => user is editing their profile and can access the form
  //If isEditing is false => it is in readonly mode and user can only view profile attributes
  const [isEditing, setIsEditing] = useState(false);
  return(
    <View>
      <Formik
        initialValues={{first_name: _first_name, last_name: _last_name, address: _address, password: _password}}
        onSubmit={(values)=> {
          console.log(values);
          //TODO: Save profile
          //After saving edits, return back to the readonly screen
          setIsEditing(false)
        }}>

          {(props) => (
            <View>

                <View style={styles.title}>
                    <Text style={styles.title}>Profile</Text>
                </View>


                 {isEditing &&    
                 //show inputs only if user is in editing mode
                (<>
                <TextInput
                style={styles.editFields}
                placeholder='First Name'
                onChangeText={props.handleChange('first_name')}
                value={props.values.first_name}
                />

                <TextInput
                style={styles.editFields}
                placeholder='Last Name'
                onChangeText={props.handleChange('last_name')}
                value={props.values.last_name}
                />

                <TextInput
                style={styles.editFields}
                placeholder='Address'
                onChangeText={props.handleChange('address')}
                value={props.values.address}
                />

                <TextInput
                style={styles.editFields}
                placeholder='Password'
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                />
                </>)}

                {!isEditing && 
                //show text components only when editing mode is off
                (<>
                
                <Text>{props.values.first_name}</Text>
                <Text>{props.values.last_name}</Text>
                <Text>{props.values.address}</Text>
                <Text>{props.values.password}</Text>
                

                </>)}

                {/*Indicate clearly the action of the button press*/}
                {/*If isEditing is false then the user is in readonly mode. The button should prompt the user to 'Edit Profile'*/}
                {/*If isEditing is true then the user would want to 'Save' their edits and toggle on readonly mode*/}
                <Button title={`${isEditing ? 'Save' : 'Edit Profile'}`} color="#8A1005" onPress={() => {
                  
                  if(isEditing){
                    //only submit form when leaving edit mode
                    
                    props.handleSubmit()
                  }else{
                    //If edit mode is off then turn it on with button press
                    setIsEditing(true)
                  }
                }} />
              
            </View>
          )}
        </Formik>
    </View>
  )}

const styles = StyleSheet.create({
    editFields: {
        borderWidth: 1,
        borderColor: '#4e4e4e',
        padding: 15,
        marginBottom: 25,
    },

    title: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize: 35

    }
  })