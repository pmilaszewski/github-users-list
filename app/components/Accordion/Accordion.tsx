import { View, Text, Pressable, Image } from 'react-native'
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
    imageUrl: string
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
          <Text style={styles.itemTitle} testID={`accordion-repo-title-${item.id}`}>
            {item.title}
          </Text>
          <View style={styles.itemStarContainer}>
            <Text
              style={[styles.itemTitle, { marginRight: 8 }]}
              testID={`accordion-repo-stars-${item.id}`}
            >
              {item.stars}
            </Text>
            <FontAwesome name="star" size={16} style={styles.icon} />
          </View>
        </View>
        <Text style={styles.itemDescription} testID={`accordion-repo-description-${item.id}`}>
          {item.description}
        </Text>
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
        <View style={styles.subcontainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} testID="accordion-image" />
          <Text style={styles.text} testID="accordion-username">
            {item.username}
          </Text>
        </View>
        {item.repos?.length ? (
          <Animated.View style={animatedContainerStyle} testID="accordion-chevron">
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
