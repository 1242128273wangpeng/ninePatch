import {useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NinePatchView from 'react-native-9patch-image';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const WIDTHS = [160, 240, 320];

const bubbleSource =
  Platform.OS === 'android'
    ? {uri: 'bubble'}
    : require('./assets/bubble.png');

const frameSource =
  Platform.OS === 'android'
    ? {uri: 'frame'}
    : require('./assets/frame.png');

const cardShadowSource =
  Platform.OS === 'android'
    ? {uri: 'card_shadow'}
    : require('./assets/card_shadow.png');

// xxhdpi .9.png 的拉伸线，除以 3 换成 point，和 Android 的 dp 对齐。
const bubbleCapInsets = {top: 12, left: 12, bottom: 12, right: 12};
const frameCapInsets = {top: 12, left: 12, bottom: 12, right: 12};
const cardShadowCapInsets = {
  top: 56 / 3,
  left: 20,
  bottom: 64 / 3,
  right: 20,
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Demo />
    </SafeAreaProvider>
  );
}

function Demo() {
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(240);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 28,
        },
      ]}>
      <Text style={styles.title}>Nine-Patch</Text>
      <Text style={styles.subtitle}>
        {Platform.OS === 'android'
          ? 'Android 读取 res/drawable 里的 .9.png，四角固定，中间拉伸。'
          : 'iOS 用同一张图的 capInsets 固定四角，只拉伸中间。'}
      </Text>

      <Text style={styles.section}>卡片阴影</Text>
      <Text style={styles.hint}>
        阴影来自 card_shadow.9.png，四角固定，内容放在中间的透明区域。
      </Text>
      <NinePatchView
        source={cardShadowSource}
        capInsets={cardShadowCapInsets}
        style={styles.cardShadow}>
        <View style={styles.card}>
          <View style={styles.cardPhoto}>
            <Text style={styles.cardPhotoLabel}>Great Barrier Reef</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle}>Great Barrier Reef</Text>
              <Text style={styles.cardScore}>🔥 9.9</Text>
            </View>
            <View style={styles.cardMetaRow}>
              <Text style={styles.cardMeta}>Duration: 1-2h</Text>
              <Text style={styles.cardPrice}>Free</Text>
            </View>
          </View>
        </View>
      </NinePatchView>

      <NinePatchView
        source={cardShadowSource}
        capInsets={cardShadowCapInsets}
        style={styles.cardShadow}>
        <View style={styles.card}>
          <View style={[styles.cardPhoto, styles.cardPhotoAlt]}>
            <Text style={styles.cardPhotoLabel}>Whitehaven Beach</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle}>Whitehaven Beach</Text>
              <Text style={styles.cardScore}>🔥 9.6</Text>
            </View>
            <Text style={styles.cardDesc}>
              卡片变高后，阴影沿直边拉伸，圆角和模糊半径保持不变。
            </Text>
            <View style={styles.cardMetaRow}>
              <Text style={styles.cardMeta}>Duration: 3h</Text>
              <Text style={styles.cardPrice}>$48</Text>
            </View>
          </View>
        </View>
      </NinePatchView>

      <Text style={styles.section}>聊天气泡</Text>
      <View style={styles.row}>
        {WIDTHS.map(item => (
          <Pressable
            key={item}
            onPress={() => setWidth(item)}
            style={[styles.chip, width === item && styles.chipOn]}>
            <Text style={[styles.chipText, width === item && styles.chipTextOn]}>
              {item}px
            </Text>
          </Pressable>
        ))}
      </View>

      <NinePatchView
        source={bubbleSource}
        capInsets={bubbleCapInsets}
        style={[styles.bubble, {width}]}>
        <Text style={styles.bubbleText}>
          宽度 {width}。圆角留在四角，中间区域被拉开。
        </Text>
      </NinePatchView>

      <NinePatchView
        source={bubbleSource}
        capInsets={bubbleCapInsets}
        style={styles.bubbleWide}>
        <Text style={styles.bubbleText}>
          这是一条更长的消息。纵向和横向都按 9-patch
          的拉伸线变化，而不是把整张图简单放大。
        </Text>
      </NinePatchView>

      <Text style={styles.section}>色块</Text>
      <Text style={styles.hint}>
        四角应保持原来的色块，只有边和中心被拉伸。
      </Text>
      <NinePatchView
        source={frameSource}
        capInsets={frameCapInsets}
        style={styles.frame}>
        <Text style={styles.frameText}>center</Text>
      </NinePatchView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1917',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#57534E',
  },
  section: {
    marginTop: 28,
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
  },
  hint: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: '#78716C',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E7E5E4',
  },
  chipOn: {
    backgroundColor: '#1C1917',
  },
  chipText: {
    fontSize: 13,
    color: '#44403C',
  },
  chipTextOn: {
    color: '#FFFFFF',
  },
  cardShadow: {
    alignSelf: 'stretch',
    marginTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 14,
  },
  card: {
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cardPhoto: {
    height: 132,
    backgroundColor: '#1F8A9E',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 14,
  },
  cardPhotoAlt: {
    backgroundColor: '#2F6F8F',
    height: 108,
  },
  cardPhotoLabel: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  cardBody: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1917',
  },
  cardScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E85D4C',
  },
  cardDesc: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#44403C',
  },
  cardMetaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardMeta: {
    fontSize: 13,
    color: '#78716C',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
  },
  bubble: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  bubbleWide: {
    alignSelf: 'stretch',
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#14532D',
  },
  frame: {
    alignSelf: 'stretch',
    height: 180,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
});

export default App;
