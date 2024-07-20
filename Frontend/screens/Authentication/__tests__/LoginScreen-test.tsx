import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { RootStackParamList } from '@/app';
import {NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'login'>;

export interface PropsLogin {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}
const mockRoute: LoginScreenRouteProp = {
    key: 'login-key',
    name: 'login',
    params: undefined,
  };
  
const mockNavigation: Partial<LoginScreenNavigationProp> = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };
describe('Renders loginscreen correctly', ()=> {
    it ('renders username input box ', () => {
        const { getByTestId } = render(<LoginScreen navigation={mockNavigation as LoginScreenNavigationProp} route={mockRoute} />);
        const usernamebox = getByTestId("Email");
        expect(usernamebox).toBeTruthy()
        expect(usernamebox.props.placeholder).toBe(' Email')
    })

    it ('renders password input box ', () => {
        const { getByTestId } = render(<LoginScreen navigation={mockNavigation as LoginScreenNavigationProp} route={mockRoute} />);
        const usernamebox = getByTestId("Password");
        expect(usernamebox).toBeTruthy()
        expect(usernamebox.props.placeholder).toBe(' Password')
    })


})