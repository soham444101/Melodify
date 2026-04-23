import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Home, Player } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={
                    {
                        tabBarStyle: {
                            backgroundColor: "#001d23",
                            paddingTop:10
                        },
                        tabBarInactiveTintColor: "#fff",
                        tabBarActiveTintColor: "#5f8d96",
                        headerShown: false,
                        tabBarIconStyle: {
                            display: "none"
                        },
                        tabBarLabelStyle:{
                            fontSize:12
                        }
                    }
                }
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Player" component={Player} />
            </Tab.Navigator>
        </NavigationContainer >
    );
}

export default MyTabs


const styles = StyleSheet.create({})