import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Colors from '@/constants/Colors';
import TabBarIcon from '@/components/TabBarIcon';

const TabLayout = () => {
    return (
        <View style={{ backgroundColor: Colors.primary, flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: Colors.white,
                        height: 50,
                        borderRadius: 40,
                        marginTop: 0,
                        marginBottom: 10,
                        marginHorizontal: 20,
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon name="home-outline" focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="details"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                name="clipboard-outline"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                name="settings-outline"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
};

export default TabLayout;
