import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import {v4 as uuid} from 'uuid';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


provider.setCustomParameters({
    prompt: "select_account",
});
export function login() {
    signInWithPopup(auth, provider)
        .catch(console.error);
}

export function logout() {
    signOut(auth)
        .catch(console.error);
}

export function onUserStateChange(callback){
    console.log('onUserStateChange')
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot)
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return {...user, isAdmin}
        }
        return user;
    }).catch((error) => {
        console.error(error);
    });
}

export async function addNewProduct(product, imageUrl) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image: imageUrl,
        options: product.options.split(',')
    })
}

export async function getProducts() {
    return get(ref(database, 'products'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        }).catch((error) => {
            console.error(error);
        });
}