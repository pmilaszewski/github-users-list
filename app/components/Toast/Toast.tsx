import { Text } from 'react-native'
import { styles } from './Toast.styles'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import { animationDuration, toastDuration } from '@/constants/durations'

type ToastProps = {
  text?: string
}

const DEFAULT_VALUE = 'Ooops! Something went wrong!'

export const Toast = ({ text = DEFAULT_VALUE }: ToastProps) => {
  const [isActive, setIsActive] = useState(false)
  const margin = useSharedValue(-100)

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: margin.value,
  }))

  const show = () => {
    setIsActive(true)
    margin.value = withTiming(24, { duration: animationDuration })
  }

  const hide = () => {
    setIsActive(false)
    margin.value = withTiming(-100, { duration: animationDuration })
  }

  useEffect(() => {
    show()

    return () => {
      hide()
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      setTimeout(hide, toastDuration)
    }
  }, [isActive])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  )
}
