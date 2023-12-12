// LogoutButton.tsx

import React from 'react';
import { View, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface NavigationProps{
    navigation: NavigationProp<any,any>
  }

const LogoutButton = ({navigation}:NavigationProps) => {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      navigation.navigate("Login")
      
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
