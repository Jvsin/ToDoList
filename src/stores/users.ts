import { ref, onMounted} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
//import { useCounterStore } from './counter'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  onAuthStateChanged,
  signOut

} from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const name = ref<string | undefined>('')
  const userAuth = ref<UserCredential | null>(null)
  
  const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((userCredentials) => {
        userAuth.value = userCredentials
        name.value = userCredentials?.user.displayName || undefined
        console.log('Successfully registered!')
        router.push('/dashboard')
      })
      .catch((error) => {
        console.log(error.message)
        alert(error.message)
      })
  }

  const registerGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
        .then((userCredentials) => {
        userAuth.value = userCredentials
        name.value = userCredentials.user?.displayName || undefined
        console.log('Successfully registered with google!')
        router.push('/dashboard')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredentials) => {
        userAuth.value = userCredentials
        name.value = userCredentials.user?.displayName || undefined
        router.push('/dashboard')
      })
      .catch((error) => {
        console.log(error.message)
        alert(error.message)
      })
  }


  const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

// const userStore = useUserStore()
// const { email, isLoggedIn } = storeToRefs(userStore)

const handleSingOut = () => {
  signOut(getAuth()).then(() => {
    router.push('/')
  })
}
  return { email, password, register, registerGoogle, signIn, name, userAuth, isLoggedIn, handleSingOut}
})
