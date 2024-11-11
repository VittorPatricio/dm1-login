// AgendaLista.js
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { database } from "../services/database/firebase";
import { onValue, ref } from "firebase/database";
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { personDelete, updatePerson } from "../services/personService";

export default function AgendaList({ navigation }) {
  const [users, setUsers] = useState([]);
  
  const onPressDelete = async (id) => {
    const response = await personDelete(id);
    console.log("deletado com sucesso");  
  };

  const onPressUpdate = async (person) => {
    const dataUpdate = {
      nome: "teste",
      email: person.email,
      uuidAuth: person.uuidAuth,
      telefone: person.telefone
    }
    const update = await updatePerson(person.id, dataUpdate)
    console.log("editado com sucesso");  
  };


  useEffect(() => {
    const usersRef = ref(database, "person");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatDatas = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setUsers(formatDatas);
      } else {
        setUsers([]);
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);
  
  console.log( users );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Contatos</Text>
      {users.map((user, index) => (
        <View key={user.id} style={styles.userItem}>
          <Text style={styles.userText}>{user.nome}</Text>
          <Text style={styles.userText}>{user.email}</Text>
          <Text style={styles.userText}>{user.telefone}</Text>
          <TouchableOpacity onPress={() => onPressDelete(user.id)}>
            <AntDesign name="delete" size={24} color={"red"} />
            <Text> Deletar  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressUpdate(user)}>
            <FontAwesome name="edit" size={24} color={"blue"} />
            <Text> Update </Text> 
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userText: {
    fontSize: 16,
  },
});
