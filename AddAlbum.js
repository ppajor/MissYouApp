import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ScreenHeader from "./ScreenHeader";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  BackHandler,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import DefText from "./DefText";
import globals from "./style";
import ImageBrowserScreen from "./ImageBrowserScreen";
import DefBtn from "./DefBtn";

function AddAlbum() {
  const [image, setImage] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const backAction = () => {
      props.history.push("/HomeScreen"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const imageBrowserCallback = (callback) => {
    callback
      .then((photos) => {
        console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          photos,
        });
      })
      .catch((e) => console.log(e));
  };

  const onBack = () => {
    setModalOpen(!modalOpen);
  };

  const onSuccess = (data) => {
    setMediaData((prev) => [...prev, ...data]);
    setModalOpen(!modalOpen);
    //console.log(data);
  };

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <ScreenHeader name="Add album" />
          <View style={styles.albumHeader}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerBg}>
              <>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}

                {!image && (
                  <>
                    <MaterialIcons
                      style={{ marginBottom: 5 }}
                      name="add-a-photo"
                      size={24}
                      color={globals.secondaryColor}
                    />
                    <DefText align="center" size={11}>
                      Ustaw miniaturkę albumu
                    </DefText>
                  </>
                )}
              </>
            </TouchableOpacity>
            <View style={styles.input}>
              <TextInput
                style={{
                  color: globals.secondaryColor,
                }}
                placeholder="Tytuł albumu"
                placeholderTextColor={globals.secondaryColor}
                value={title}
                onChangeText={setTitle}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
          <ScrollView style={styles.addAlbumBody}>
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <DefText size={14}>Wybierz zdjęcia</DefText>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalOpen}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalopen(!modalopen);
              }}
            >
              <ImageBrowserScreen onBack={onBack} onSuccess={onSuccess} />
            </Modal>
            <View style={styles.albumItems}>
              {mediaData.map((el) => {
                console.log("URL" + el.uri);

                return (
                  <View style={{ width: "23%", aspectRatio: 1, margin: "1%" }}>
                    <Image
                      style={{ margin: 1 }}
                      source={{ height: "100%", width: "100%", uri: el.uri }}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={{ marginTop: "10%" }}>
            <DefBtn value="Zapisz album" />
          </View>
        </View>
      </Screen>
    </>
  );
}

export default AddAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },

  albumHeader: {
    height: "25%",
    padding: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "13%",
    borderBottomWidth: 1,
    borderBottomColor: "#323232",
  },
  imagePickerBg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    backgroundColor: "gray",
  },
  input: {
    width: "60%",
    height: "100%",
    paddingLeft: "5%",
    overflow: "hidden",
  },
  addAlbumBody: {
    flex: 1,
  },
  albumItems: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
