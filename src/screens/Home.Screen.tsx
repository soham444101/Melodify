import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { playListData } from '../constants';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.mainCaintainer}>
      <View style={styles.titleCaintainer}>
        <Text style={styles.titleText}>Songs</Text>
      </View>
      <FlatList
        data={playListData}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardTouchable}
            onPress={() =>
              navigation.navigate("Player", {
                id: item.id
              })
            }
          >
            <View style={styles.cardCaintainer}>
              <Image
                source={{ uri: item?.artwork }}
                style={styles.cardImage}
              />
              <View style={styles.cardTextCaintainer}>
                <Text style={styles.cardTextArtist}>
                  {item?.artist}
                </Text>
                <Text style={styles.cardTextAlbum}>
                  {item?.album}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCaintainer: { backgroundColor: '#001d23', width: "100%", height: "100%" },
  titleCaintainer: { marginLeft: 20, marginVertical: 15 },
  titleText: { fontWeight: '500', color: "#fff", fontSize: 16, textDecorationLine: "underline" },
  cardTouchable: { margin: 10, backgroundColor: '#001d23', justifyContent: "center" },
  cardCaintainer: { flex: 1, flexDirection: "row", alignItems: "center", borderColor: "#fff", borderWidth: 1, borderRadius: 10 },
  cardImage: { height: 50, width: 50, borderRadius: 10 },
  cardTextCaintainer: { marginLeft: 15 },
  cardTextArtist: { fontWeight: '500', color: "#fff", fontSize: 14 },
  cardTextAlbum: { fontWeight: '300', color: "#fff", fontSize: 12 }
})