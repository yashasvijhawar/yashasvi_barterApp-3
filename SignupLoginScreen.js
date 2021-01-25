import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignUpLoginScreen extends Component{
    constructor(){
        super()
        this.state={
          emailId : '',
          password: '',
          lastName: '',
          firstName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVissible: 'false',
        }
      }

      showModal = ()=>{
        return(
          <Modal animationType = "fade"
          visible = {this.state.isModalVissible}> 
          <View >
          <ScrollView style = {{width:'100%'}}>
            <KeyboardAvoidingView>
              <Text style={{fontSize : 20,fontWeight:'bold'}}>Registration</Text>

              <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "First Name"
              onChangeText = {(text)=>{
                this.setState({
                  firstName:text
                })
              }}/>
      
              <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Last Name"
              onChangeText = {(text)=>{
                this.setState({
                  lastName:text
                })
              }}/>
      
              <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Address"
              onChangeText = {(text)=>{
                this.setState({
                  address:text
                })
              }}/>
      
              <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Contact No."
              keyboardType = {'numeric'}
              onChangeText = {(text)=>{
                this.setState({
                  contact:text
                })
              }}/>
      
             <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Email_Address"
              keyboardType = {'email-address'}
              onChangeText = {(text)=>{
                this.setState({
                  emailId:text
                })
              }}/>
      
              <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Password"
              onChangeText = {(text)=>{
                this.setState({
                  password:text
                })
              }}/>
      
             <TextInput style = {{borderWidth:2,height:25,width:100,marginTop:10}}
              placeholder = "Confirm password"
              onChangeText = {(text)=>{
                this.setState({
                  confirmPassword:text
                })
              }}/>
      
              <TouchableOpacity style={{borderWidth:2,marginTop:10,height:25,width:100,backgroundColor:'yellow'}}
              onPress={()=>{
                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
              }}>
                <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}}>Register</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={{borderWidth:2,marginTop:10,height:25,width:100,backgroundColor:'yellow'}}
              onPress={()=>
                this.setState({
                  "isModalVissible":false
                })
              }>
                <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}}>Cancel</Text>
              </TouchableOpacity>
      
            </KeyboardAvoidingView>
          </ScrollView>
          </View>
          </Modal>
        )
        }

      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
         return Alert.alert("Successfully Login")
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
    
      userSignUp = (emailId, password, confirmPassword) =>{
        if(password!==confirmPassword){
          return Alert.alert("Password doesn't match,please check your password!")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(()=>{
          db.collection('users').add({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            emailId:this.state.emailId,
            address:this.state.address
          })
          return Alert.alert("User Added Successfully!",
          '',
          [
            {text:'okay',onPress:()=>this.setState({
              "isModalVissible":false
            })}
          ])
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
      }
      }
      
    render(){
        
        return(
            <View style={{alignItems:'center'}}>
              <View>
          {
            this.showModal()
          }
        </View>
                <Text style={styles.title}>The Barter App</Text>
                <View style={{alignItems:'center'}}>
                <TextInput
          style={styles.loginBox}
          placeholder="example@barterApp.com"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          placeholder="password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />

         <TouchableOpacity
            style={[styles.button,{marginBottom:10}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={{color:'#ff5722',fontSize:18,fontWeight:'bold'}}>SignUp</Text>
          </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3e11'
  },
  loginBox:{
    width: 300,
    marginTop:20,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
      marginTop:30,
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#bb4a",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
})
