import React from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      alert("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      alert("el email no es correcto");
    } else if (formData.password != formData.repeatPassword) {
      alert("Las contraseñas deben ser iguales");
    } else if (size(formData.password) < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          navigation.navigate("account");
        })
        .catch(() => {
          alert("El email ya esta en uso");
        });
    }
  };

  const onChange = (e, type) => {
    //console.log(type);
    //console.log(e.nativeEvent.text);
    //setFormData({ [type]: e.nativeEvent.text });
    setFormData({ ...formData, [type]: e.nativeEvent.text });
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
        secureTextEntry={showPass ? false : true}
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
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRePass ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRePass ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRePass(!showRePass)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
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
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
