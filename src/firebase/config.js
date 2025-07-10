import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0_zRrUVrzoHliedl9CQV0QrF_uErTOto",
  authDomain: "vue-blog-4ba13.firebaseapp.com",
  projectId: "vue-blog-4ba13",
  storageBucket: "vue-blog-4ba13.firebasestorage.app",
  messagingSenderId: "719944443581",
  appId: "1:719944443581:web:e6ca38eac1aab39e7779d4"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()

export { projectFirestore }
