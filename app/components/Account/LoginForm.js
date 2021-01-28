import React from "react";
import Loading from "../Loading";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import * as firebase from "firebase";
import { isEmpty } from "lodash";
import { validateEmail } from "../../utils/validations";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      alert("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      alert("El email no es correcto");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          alert("Email o contraseña incorrecta");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={!showPass ? true : false}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPass(!showPass)}
          />
        }
      />
      <Button
        title="Iniciar sesion"
        buttonStyle={styles.btnLogin}
        containerStyle={styles.btnContainer}
        onPress={() => {
          onSubmit();
        }}
      />
      <Loading isVisible={loading} text="Iniciando sesion" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
