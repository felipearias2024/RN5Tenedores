import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Input, Button, Icon, Avatar, Image } from "react-native-elements";
import { map, size } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
  const { setIsLoading, toastRef, navigation } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAdress, setRestaurantAdress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);

  const addRestaurant = () => {
    console.log("restaurantName: " + restaurantName);
    console.log("restaurantAdress: " + restaurantAdress);
    console.log("restaurantDescription: " + restaurantDescription);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAdress={setRestaurantAdress}
        setRestaurantDescription={setRestaurantDescription}
      />
      <UploadImage
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        toastRef={toastRef}
      />
      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btn}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {
    setRestaurantName,
    setRestaurantAdress,
    setRestaurantDescription,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantAdress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef, imageSelected, setImageSelected } = props;
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermissions === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes y activarlos manualmente",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Se ha cancelado la seleccion de imagenes");
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  return (
    <View style={styles.viewImages}>
      {size(imageSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {map(imageSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageRestaurant }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btn: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
