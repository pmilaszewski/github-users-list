import { useEffect, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated'
import { styles } from './Accordion.styles'

export type RepoItemProps = {
  id: string
  title: string
  description: string
  stars: number
}

export type AccordionProps = {
  expanded: string
  setExpanded: (value: string) => void
  item: {
    id: string
    username: string
    repos?: RepoItemProps[]
  }
}

const AnimatedIcon = Animated.createAnimatedComponent(AntDesign)

export const Accordion = ({ item, expanded, setExpanded }: AccordionProps) => {
  const rotation = useSharedValue(0)
  const height = useSharedValue(0)

  const isCurrentItemExpanded = item.id === expanded

  const handleItemRotation = useCallback((isCurrentItemExpanded: boolean) => {
    if (isCurrentItemExpanded) {
      rotation.value = withTiming(1, { duration: 500 })
    } else {
      rotation.value = withTiming(0, { duration: 500 })
    }
  }, [])

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isCurrentItemExpanded), { duration: 500 }),
  )

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
      },
    ],
  }))

  const animatedRepoListStyle = useAnimatedStyle(() => ({
    overflow: 'hidden',
    height: derivedHeight.value,
  }))

  const handleOnPressItem = () => {
    if (isCurrentItemExpanded) {
      setExpanded('')
    } else {
      setExpanded(item.id)
    }
  }

  useEffect(() => {
    handleItemRotation(isCurrentItemExpanded)
  }, [handleItemRotation, isCurrentItemExpanded])

  const renderRepoItem = (item: RepoItemProps) => {
    return (
      <View style={styles.itemContainer} key={item.id}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.itemStarContainer}>
            <Text style={[styles.itemTitle, { marginRight: 8 }]}>{item.stars}</Text>
            <FontAwesome name="star" size={16} style={styles.icon} />
          </View>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    )
  }

  return (
    <Animated.View>
      <Pressable
        style={styles.container}
        onPress={handleOnPressItem}
        pointerEvents={item.repos?.length ? 'auto' : 'none'}
      >
        <Text style={styles.text}>{item.username}</Text>
        {item.repos?.length ? (
          <AnimatedIcon name="down" size={16} style={[styles.icon, animatedContainerStyle]} />
        ) : null}
      </Pressable>
      <Animated.View style={animatedRepoListStyle}>
        <View
          style={styles.itemListHelperContainer}
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height
          }}
        >
          {item.repos?.map(renderRepoItem)}
        </View>
      </Animated.View>
    </Animated.View>
  )
}
