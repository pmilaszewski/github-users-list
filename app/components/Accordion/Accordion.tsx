import { View, Text, Pressable } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import { styles } from './Accordion.styles'
import { useAtom } from 'jotai'
import { expandedAtom } from '@/state'

export type RepoItemProps = {
  id: string
  title: string
  description: string
  stars: number
}

export type AccordionProps = {
  item: {
    id: string
    username: string
    repos?: RepoItemProps[]
  }
}

export const Accordion = ({ item }: AccordionProps) => {
  const [expanded, setExpanded] = useAtom(expandedAtom)
  const height = useSharedValue(0)

  const isCurrentItemExpanded = item.id === expanded

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isCurrentItemExpanded), { duration: 500 }),
  )

  const derivedRotation = useDerivedValue(() =>
    withTiming(isCurrentItemExpanded ? '180deg' : '0deg', { duration: 500 }),
  )

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: derivedRotation.value,
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
        {/* <Image /> */}
        <Text style={styles.text}>{item.username}</Text>
        {item.repos?.length ? (
          <Animated.View style={animatedContainerStyle}>
            <AntDesign name="down" size={16} style={styles.icon} />
          </Animated.View>
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
