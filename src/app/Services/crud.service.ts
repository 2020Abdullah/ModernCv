import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: Firestore) { }

  async storeData(db: string, data:Object){
    const collectionInstant = collection(this.firestore, db);
    return await addDoc(collectionInstant, data);
  }

  getData(db: string){
    const collectionInstant = collection(this.firestore, db);
    return collectionData(collectionInstant, {idField: 'id'});
  }

  async updateData(db: string, id:string, data: any){
    const docInstant = doc(this.firestore, db, id);
    return await updateDoc(docInstant, data);
  }

  async deleteData(db: string, id: string){
    const docInstant = doc(this.firestore, db, id);
    return await deleteDoc(docInstant);
  }

  async getdataById(db: string, id:string){
    const docInstant = doc(this.firestore, db, id);
    return await getDoc(docInstant);
  }

  async getByCustomQuery(db: string, column: string, operation: any, user_id: string){
    const q = query(collection(this.firestore, db), where(column, operation, user_id));
    return await getDocs(q);
  }
}
