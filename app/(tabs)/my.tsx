// LoginScreen.js
import React, { useState } from 'react'
import { View, Button } from 'react-native'
import LoginModal from '@/components/LoginModal'
import { SafeAreaView } from 'react-native-safe-area-context'

const My = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }

  return (
    <SafeAreaView>
      <View>
        <Button
          title="登录"
          onPress={() => {
            setVisible(true)
          }}
        ></Button>

        <LoginModal visible={visible} onLogin={(token) => { alert(token) }} onClose={onClose} />
      </View>
    </SafeAreaView>
  )
}

export default My
