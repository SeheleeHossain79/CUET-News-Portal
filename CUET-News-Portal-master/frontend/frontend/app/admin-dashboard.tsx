import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'news' | 'event' | 'user' | 'system';
}

interface StatsCard {
  title: string;
  value: number;
  percentage: string;
  trend: 'up' | 'down';
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const statsData: StatsCard[] = [
    { title: 'Total News', value: 156, percentage: '+12%', trend: 'up' },
    { title: 'Total Events', value: 24, percentage: '+8%', trend: 'up' },
    { title: 'Active Users', value: 1245, percentage: '+23%', trend: 'up' },
  ];

  const activities: ActivityItem[] = [
    { id: '1', user: 'Admin', action: 'published', target: 'Final Exam Schedule', timestamp: '2 hours ago', type: 'news' },
    { id: '2', user: 'CSE Dept', action: 'created event', target: 'Innovation Summit 2025', timestamp: '5 hours ago', type: 'event' },
    { id: '3', user: 'Research Cell', action: 'updated', target: 'Research Grant News', timestamp: '1 day ago', type: 'news' },
    { id: '4', user: 'System', action: 'new user', target: 'Student Registration', timestamp: '1 day ago', type: 'user' },
  ];

  const quickActions: QuickAction[] = [
    { id: '1', title: 'New Article', icon: 'article', onPress: () => console.log('New Article pressed') },
    { id: '2', title: 'New Event', icon: 'event', onPress: () => console.log('New Event pressed') },
    { id: '3', title: 'Add User', icon: 'person-add', onPress: () => console.log('Add User pressed') },
    { id: '4', title: 'View Reports', icon: 'assessment', onPress: () => console.log('View Reports pressed') },
  ];

  const navigationItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'news', label: 'Manage News', icon: 'article' },
    { id: 'events', label: 'Manage Events', icon: 'event' },
    { id: 'users', label: 'Users', icon: 'people' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const renderStatsCard = (stat: StatsCard) => (
    <View key={stat.title} style={styles.statCard}>
      <Text style={styles.statValue}>{stat.value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
      <View style={styles.trendContainer}>
        <Icon 
          name={stat.trend === 'up' ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={stat.trend === 'up' ? '#4CAF50' : '#F44336'} 
        />
        <Text style={[styles.trendText, { color: stat.trend === 'up' ? '#4CAF50' : '#F44336' }]}>
          {stat.percentage}
        </Text>
      </View>
    </View>
  );

  const renderActivityItem = (activity: ActivityItem) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Icon 
          name={
            activity.type === 'news' ? 'article' :
            activity.type === 'event' ? 'event' :
            activity.type === 'user' ? 'person' : 'settings'
          } 
          size={20} 
          color="#001f3f" 
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.userText}>{activity.user}</Text> {activity.action}{' '}
          <Text style={styles.targetText}>{activity.target}</Text>
        </Text>
        <Text style={styles.timestamp}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const renderQuickAction = (action: QuickAction) => (
    <TouchableOpacity key={action.id} style={styles.quickAction} onPress={action.onPress}>
      <View style={styles.actionIcon}>
        <Icon name={action.icon as any} size={24} color="#001f3f" />
      </View>
      <Text style={styles.actionText}>{action.title}</Text>
    </TouchableOpacity>
  );

  const renderNavItem = (item: NavItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.navItem, activeTab === item.id && styles.navItemActive]}
      onPress={() => setActiveTab(item.id)}
    >
      <Icon 
        name={item.icon as any} 
        size={20} 
        color={activeTab === item.id ? '#0050a0' : '#666'} 
      />
      <Text style={[styles.navText, activeTab === item.id && styles.navTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#001f3f" barStyle="light-content" />
      
      {/* Header */}
      <Header />

      <View style={styles.content}>
        {/* Side Navigation */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Admin Panel</Text>
          {navigationItems.map(renderNavItem)}
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#F44336" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          {/* Dashboard Title */}
          <Text style={styles.dashboardTitle}>Dashboard</Text>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map(renderStatsCard)}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activitiesList}>
            {activities.map(renderActivityItem)}
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map(renderQuickAction)}
          </View>

          <Footer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  content: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarTitle: { fontSize: 16, fontWeight: '600', color: '#001f3f', marginBottom: 20 },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, marginBottom: 5 },
  navItemActive: { backgroundColor: '#E3F2FD' },
  navText: { fontSize: 16, color: '#666', marginLeft: 12 },
  navTextActive: { color: '#0050a0', fontWeight: '600' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, marginTop: 'auto', marginBottom: 20 },
  logoutText: { fontSize: 16, color: '#F44336', marginLeft: 12, fontWeight: '600' },
  mainContent: { flex: 1, padding: 20 },
  dashboardTitle: { fontSize: 28, fontWeight: 'bold', color: '#001f3f', marginBottom: 20 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 12, marginHorizontal: 5, marginBottom: 10, elevation: 3 },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#001f3f' },
  statTitle: { fontSize: 14, color: '#666', marginTop: 5 },
  trendContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  trendText: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
  divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#001f3f', marginBottom: 15 },
  activitiesList: { backgroundColor: '#fff', borderRadius: 12, padding: 15, elevation: 3 },
  activityItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  activityIcon: { width: 32, alignItems: 'center', marginRight: 12, marginTop: 2 },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, color: '#333', lineHeight: 20 },
  userText: { fontWeight: '600', color: '#001f3f' },
  targetText: { fontWeight: '600', color: '#333' },
  timestamp: { fontSize: 12, color: '#999', marginTop: 2 },
  quickActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 10 },
  quickAction: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', width: '48%', marginBottom: 15, elevation: 3 },
  actionIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionText: { fontSize: 14, fontWeight: '600', color: '#001f3f', textAlign: 'center' },
});

export default AdminDashboard;
