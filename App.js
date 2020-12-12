import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './routes/Tabs'
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import Camera from './screen/Camera';
import {ProfileContext} from './context/ProfileContext';

import { configureLanguageToI18n } from './languages/util'

const Stack = createStackNavigator();

const App = () => {

	configureLanguageToI18n();
	const [user, setUser] = useState('José');

	useEffect(() => {

		messaging().onNotificationOpenedApp(remoteMessage => {
			Alert.alert(
				'Notification caused app to open from background state:',
				JSON.stringify(remoteMessage.notification),
			);
		});

		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});
	
		return unsubscribe;
	}, []);

	return (
		<ProfileContext.Provider value={{ user, setUser }}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
					<Stack.Screen name="Camera" component={Camera} options={{headerShown: false}}/>
					<Stack.Screen name="ProfileToEdit" component={ProfileToEdit} />
					<Stack.Screen name="ChooseIcon" component={ChooseIcon} />
				</Stack.Navigator>
			</NavigationContainer>
		</ProfileContext.Provider>
	);
}

export default App