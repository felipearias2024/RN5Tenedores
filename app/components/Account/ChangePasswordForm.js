import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import { reauthenticate } from "../../utils/api";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
  const { password, setShowModal, toastRef, setReloadUserInfo } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(defaultPasswords());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = async () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setErrors({});

    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? "La contraseña no puede estar vacia"
          : "",
        newPassword: !formData.newPassword
          ? "La contraseña no puede estar vacia"
          : "",
        repeatNewPassword: !formData.repeatNewPassword
          ? "La contraseña no puede estar vacia"
          : "",
      };
      setErrors(errorsTemp);
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        password: "",
        newPassword: "Las contraseñas no coinciden",
        repeatNewPassword: "Las contraseñas no coinciden",
      };
      setErrors(errorsTemp);
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        password: "",
        newPassword: "La contraseña debe tener 6 o mas caracteres",
        repeatNewPassword: "La contraseña debe tener 6 o mas caracteres",
      };
      setErrors(errorsTemp);
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(async () => {
              isSetErrors = false;
              setIsLoading(false);
              setShowModal(false);
              await firebase.auth().signOut();
            })
            .catch(() => {
              errorsTemp = {
                other: "Error al actualizar la contraseña",
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          errorsTemp = {
            password: "La contraseña no es correcta",
          };
          setIsLoading(false);
        });
      idSetErrors && setErrors(errorsTemp);
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        password={true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off" : "eye",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Contraseña nueva"
        containerStyle={styles.input}
        secureTextEntry={showPass ? false : true}
        password={true}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off" : "eye",
          color: "#c2c2c2",
          onPress: () => setShowPass(!showPass),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPass ? false : true}
        password={true}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off" : "eye",
          color: "#c2c2c2",
          onPress: () => setShowPass(!showPass),
        }}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultPasswords() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 30,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
  },
});
