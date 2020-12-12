import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialIcons} from '@expo/vector-icons';

import Home from './../screen/Home';
import More from './../screen/More';

import { trans } from '../languages/util';

const Tab = createBottomTabNavigator();

export default class Tabs extends React.Component {

    render (){
        return(
            <Tab.Navigator
			 	tabBarOptions={{
					backgroundColor: 'black',
					activeTintColor: 'white',
					style: {
						backgroundColor: '#1a1718',
						borderTopColor: 'transparent',
					},
				}}
			 >
			 	<Tab.Screen name="Home" component={Home} options={{
					tabBarLabel: trans('Home'),
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialIcons name="home" color={color} size={size} />
					),
				}}/>
			 	<Tab.Screen name="Search" component={More} options={{
					tabBarLabel: trans('Search'),
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialIcons name="search" color={color} size={size} />
					),
				}}/>
				<Tab.Screen name="Comming" component={More} options={{
					tabBarLabel: trans('Comming'),
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialIcons name="access-time" color={color} size={size} />
					),
				}}/>
				<Tab.Screen name="Downloads" component={More} options={{
					tabBarLabel: trans('Download'),
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialIcons name="file-download" color={color} size={size} />
					),
				}}/>
				<Tab.Screen name="More" component={More} options={{
					tabBarLabel: trans('More'),
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialIcons name="menu" color={color} size={size} />
					),
				}}/>
			 </Tab.Navigator>
        );
    };
}