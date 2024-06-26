import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native'
import axios from 'axios'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface Props {
  onLogin: (token: string) => void
  visible: boolean
  onClose?: () => void
}

const LoginModal = (props: Props) => {
  const { onLogin, onClose, visible } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post<{ token: string }>(
        'http://10.253.68.115:5000/api/auth/login',
        {
          email,
          password,
        }
      )
      const token = response.data.token
      onLogin(token)
    } catch (error) {
      console.error('登录失败', error)
    }
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalWrap}>
        <View style={styles.loginWrap}>
          <Pressable onPress={onClose} style={{ flexDirection: 'row-reverse' }}>
            <MaterialIcons name="close" color="#000" size={22} />
          </Pressable>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="电子邮箱"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="密码"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <Button title="登录" onPress={handleLogin} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWrap: {
    backgroundColor: '#fff',
    height: 233,
    width: '80%',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
})

export default LoginModal
