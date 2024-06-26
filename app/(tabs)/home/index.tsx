// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    setNotice([
      {
        title: '电脑配置',
        content: '酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w酷冷至尊 120w',
        time: '2024-03-03'
      },
      {
        title: '账户密码',
        content: '酷冷至尊 120w',
        time: '2024-03-04'
      },
     {
       title: '账户密码',
       content: '酷冷至尊 120w',
       time: '2024-03-04'
     }
    ]);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.title}>笔记</View>
      <View style={styles.list}>
        {
          notice.map(item => {
            return <View style={styles.item}>
              <View style={styles.itemTitle}>{ item.title }</View>
              <View
                style={styles.itemContent}
              >{ item.content }</View>
              <View style={styles.itemTime}>{ item.time }</View>
            </View>
          })
        }
      </View>
      <View style={styles.add}>+</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: '30px',
  },
  list: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    width: 'calc(50% - 5px)',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  itemTitle: {
    color: '#333',
    fontWeight: '700',
  },
  itemContent: {
    color: '#999',
    fontSize: '13px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  itemTime: {
    color: '#999',
    fontSize: '13px',
  },
  add: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    color: '#fff',
    backgroundColor: '#f8b038',
    borderRadius: '50%',
  }
});

export default Home;
