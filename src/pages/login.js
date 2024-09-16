import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LoginUsuario } from "../services/auth-firebase";

const icon = require("../../assets/favicon.png");

const Login = ({navigation}) => {  

  const onClickEntrar = async ()=>{  
    const userLogin = await LoginUsuario();
    // navigation.navigate('Home', {name: 'home'})
  }

  const OnClickRegistrar = ()=>{
    navigation.navigate('Registro', {name: 'registro'})
  } 
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={icon} />
      <View style={styles.body}>
        <Text style={styles.title}>Login 16/09/24</Text>
        <View style={styles.areaInput}>
          <TextInput
            style={styles.textField}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textField}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button}
             onPress={onClickEntrar} >
            <Text style={(styles.buttonText, { color: "#fff" })}>
              Acessar
            </Text>
          </TouchableOpacity>

          <View style={styles.rodape}>
            <Text style={styles.rodapeText}>Não possui conta?</Text>
            
            <TouchableOpacity onPress={OnClickRegistrar }>
              <Text style={(styles.rodapeText, { color: "#00002" })}>
                faça sua inscrição ...!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    height: "60%",
    width: "100%",
    alignItems: "center",
  },

  image: {
    height: "20%",
    width: "100%",
    resizeMode: "contain",
  },

  areaInput: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontSize: 32,
    marginTop: 15,
  },

  textField: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "#778eec",
    borderRadius: 10,
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  rodape: {
    flexDirection: "row",
    width: "62.75%",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,
  },

  rodapeText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonText : {
    fontSize: 11,
    color: "red",
  }

});

export default Login;