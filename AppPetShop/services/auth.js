import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  
  import { auth } from "../config/firebase";
  
  export async function cadastrar(nome, email, senha) {
    const resultado = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
  
    await updateProfile(resultado.user, {
      displayName: nome,
    });
  
    return resultado.user;
  }
  
  export async function entrar(email, senha) {
    const resultado = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );
  
    return resultado.user;
  }
  
  export async function sair() {
    await signOut(auth);
  }