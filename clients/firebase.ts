import dotenv from 'dotenv'
dotenv.config()

import { getAuth } from 'firebase/auth'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc,
    doc,
    setDoc,
    QueryDocumentSnapshot,
    deleteDoc,
    getDoc
} from 'firebase/firestore'
import config from '../config'

export default class FirebaseClient {
    // private static app: FirebaseApp = initializeApp(config.firebaseConfig)
    // private static db = getFirestore(this.app)

    public static auth = () => {
        return getAuth()
    }

    public static storage = () => {
        return getStorage()
    }

    // public static async createPlayer(player: Player): Promise<string> {
    //     try {
    //         const docRef = await addDoc(collection(this.db, 'players'), player)
    //         return docRef.id
    //     } catch (error) {
    //         throw new Error(`Failed to create player: ${error}`)
    //     }
    // }

    // public static async getPlayer(playerId: string): Promise<Player | null> {
    //     try {
    //         const docRef = doc(this.db, 'players', playerId)
    //         const docSnap = await getDoc(docRef)

    //         if (docSnap.exists()) {
    //             return {
    //                 id: docSnap.id,
    //                 ...docSnap.data()
    //             } as Player
    //         } else {
    //             return null
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error(`Failed to get player: ${error}`)
    //     }
    // }

    // public static async updatePlayer(
    //     playerId: string,
    //     playerData: Partial<Player>
    // ): Promise<void> {
    //     try {
    //         const playerRef = doc(this.db, 'players', playerId)
    //         await setDoc(playerRef, playerData, { merge: true })
    //     } catch (error) {
    //         throw new Error(`Failed to update player: ${error}`)
    //     }
    // }

    // public static async deletePlayer(playerId: string): Promise<void> {
    //     try {
    //         const playerRef = doc(this.db, 'players', playerId)
    //         await deleteDoc(playerRef)
    //     } catch (error) {
    //         throw new Error(`Failed to delete player: ${error}`)
    //     }
    // }

    // public static async getAllPlayers(): Promise<Player[]> {
    //     try {
    //         const querySnapshot = await getDocs(collection(this.db, 'players'))
    //         const players: Player[] = []

    //         querySnapshot.docs.forEach((doc) => {
    //             console.log(doc.id)
    //             players.push({
    //                 ...doc.data(),
    //                 id: doc.id
    //             } as Player)
    //         })

    //         return players
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error(`Failed to get all players: ${error}`)
    //     }
    // }
}
