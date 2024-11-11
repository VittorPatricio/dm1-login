import { db } from './database/firebase'
import { set, push, ref, get, remove, update } from "firebase/database";

async function newPerson(nome,email, uuidAuth, telefone) {   

    const newRecord = push(ref(db,"person"));

    console.log( nome, email, uuidAuth, telefone);
    
    const data = await set(newRecord,{
        nome: nome,
        email: email,
        uuidAuth: uuidAuth,
        telefone: telefone
    })
    .then( (data)=>{
        console.log(data) ;
        return data
    })
    .catch( (error)=>{
        return { success: false , message: `falha ao Incluir o ususario : ${error.message}`}
    });
  }

// Atualiza usuário por ID
async function updatePerson(id, updatedData) {
    const dbref = ref(db, `person/${id}`);
    try {
        await update(dbref, updatedData);
        return { success: true, message: "Registro atualizado com sucesso" };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao fazer ao atualizar o registro:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Erro desconhecido ao fazer a atualização do registro");
            throw new Error("Erro desconhecido");
        }
    }
}

async function personGetAll() {
    const usersArray = [];
    const dbref = ref(db, "person");
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        usersArray.push(...Object.values(snapshot.val())); // Adiciona os usuários ao array
        console.log(usersArray);
        const jsonResponse = JSON.stringify(usersArray); // Converte para JSON
        return jsonResponse;
    } else {
        return null;
    }
}

// Consulta usuário por ID
async function personGetById(uuid) {
    const dbref = ref(db, `person/${uuid}`);
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData);
        return userData;
    } else {
        return { error: "Registro não encontrado" };
    }
}

// Consulta usuário por uuidauth
async function personGetByUuidAuth(uuidauth) {
    console.log( uuidauth)
    const dbref = ref(db, `person`);
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        // Percorre os registros para encontrar o uuidauth correspondente
        const person = Object.values(data)
            .find((person) => person.uuidauth === uuidauth);
            
        if (person) {
            // console.log(person);
            return person;
        } else {
            return { error: "Registro não encontrado" };
        }
    } else {
        return { error: "Nenhum registro encontrado" };
    }
}

async function personDelete(id){
    const dbref = ref(db, `person/${id}`);
    try {
        await remove(dbref);
        return { success: true, message: "Registro atualizado com sucesso" };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao fazer ao atualizar o registro:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Erro desconhecido ao fazer a atualização do registro");
            throw new Error("Erro desconhecido");
        }
    }
}

export { newPerson, personDelete, personGetAll , personGetById, personGetByUuidAuth, updatePerson }