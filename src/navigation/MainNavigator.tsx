import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Search, Flag, BookOpen, User, Menu } from 'lucide-react-native';

import {
  MainTabParamList,
  FeedStackParamList,
  ExplorarStackParamList,
  DesafiosStackParamList,
  CursosStackParamList,
  PerfilStackParamList,
} from '../types/navigation';
import { useDrawer } from '../context/DrawerContext';
import { colors, shadows, spacing } from '../theme/tokens';
import DrawerMenu from './DrawerMenu';

import FeedScreen from '../screens/tabs/FeedScreen';
import ExplorarScreen from '../screens/tabs/ExplorarScreen';
import DesafiosScreen from '../screens/tabs/DesafiosScreen';
import CursosScreen from '../screens/tabs/CursosScreen';
import PerfilScreen from '../screens/tabs/PerfilScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// ─── Header shared components ────────────────────────────────────────────────

function LogoHeader() {
  return (
    <Text style={headerStyles.logo}>P</Text>
  );
}

function HamburgerButton() {
  const { openDrawer } = useDrawer();
  return (
    <Pressable onPress={openDrawer} style={headerStyles.menuBtn} hitSlop={8}>
      <Menu size={24} color={colors.constancia} strokeWidth={2} />
    </Pressable>
  );
}

const sharedScreenOptions = {
  headerStyle: { backgroundColor: colors.clareza },
  headerShadowVisible: false,
  headerTitle: '',
  headerLeft: () => <LogoHeader />,
  headerRight: () => <HamburgerButton />,
};

// ─── Tab stacks ───────────────────────────────────────────────────────────────

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
function FeedStackNavigator() {
  return (
    <FeedStack.Navigator screenOptions={sharedScreenOptions}>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
}

const ExplorarStack = createNativeStackNavigator<ExplorarStackParamList>();
function ExplorarStackNavigator() {
  return (
    <ExplorarStack.Navigator screenOptions={sharedScreenOptions}>
      <ExplorarStack.Screen name="Explorar" component={ExplorarScreen} />
    </ExplorarStack.Navigator>
  );
}

const DesafiosStack = createNativeStackNavigator<DesafiosStackParamList>();
function DesafiosStackNavigator() {
  return (
    <DesafiosStack.Navigator screenOptions={sharedScreenOptions}>
      <DesafiosStack.Screen name="Desafios" component={DesafiosScreen} />
    </DesafiosStack.Navigator>
  );
}

const CursosStack = createNativeStackNavigator<CursosStackParamList>();
function CursosStackNavigator() {
  return (
    <CursosStack.Navigator screenOptions={sharedScreenOptions}>
      <CursosStack.Screen name="Cursos" component={CursosScreen} />
    </CursosStack.Navigator>
  );
}

const PerfilStack = createNativeStackNavigator<PerfilStackParamList>();
function PerfilStackNavigator() {
  return (
    <PerfilStack.Navigator screenOptions={sharedScreenOptions}>
      <PerfilStack.Screen name="Perfil" component={PerfilScreen} />
      <PerfilStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: '',
          headerLeft: undefined, // default back button
          headerRight: undefined,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.clareza },
        }}
      />
    </PerfilStack.Navigator>
  );
}

// ─── Bottom Tab Navigator ─────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.criatividade,
          tabBarInactiveTintColor: `${colors.constancia}66`,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
        }}
      >
        <Tab.Screen
          name="FeedTab"
          component={FeedStackNavigator}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, focused }) => (
              <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="ExplorarTab"
          component={ExplorarStackNavigator}
          options={{
            tabBarLabel: 'Explorar',
            tabBarIcon: ({ color, focused }) => (
              <Search size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="DesafiosTab"
          component={DesafiosStackNavigator}
          options={{
            tabBarLabel: 'Desafios',
            tabBarIcon: ({ color, focused }) => (
              <Flag size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="CursosTab"
          component={CursosStackNavigator}
          options={{
            tabBarLabel: 'Cursos',
            tabBarIcon: ({ color, focused }) => (
              <BookOpen size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="PerfilTab"
          component={PerfilStackNavigator}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, focused }) => (
              <User size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
      </Tab.Navigator>
      <DrawerMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.clareza,
    borderTopWidth: 0,
    ...shadows.md,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  tabItem: {
    paddingVertical: 4,
  },
});

const headerStyles = StyleSheet.create({
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.criatividade,
    paddingLeft: spacing.s4,
  },
  menuBtn: {
    paddingRight: spacing.s4,
    paddingVertical: spacing.s2,
  },
});
