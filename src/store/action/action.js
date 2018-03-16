
import ActionTypes from '../constant/constant';
import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyATF4AutOvlkF_7OrZL3rXx6LAqWMCLMqk",
    authDomain: "customer-f6b73.firebaseapp.com",
    databaseURL: "https://customer-f6b73.firebaseio.com",
    projectId: "customer-f6b73",
    storageBucket: "customer-f6b73.appspot.com",
    messagingSenderId: "770400513026"
  };
  firebase.initializeApp(config);



export function addData(addTodo) {
    return dispatch => {
        firebase.database().ref('todos/').push(addTodo)
            .then((userData) => {

            }

            )
    }
}




let currentTodos = [];
export function getTodos() {
    return dispatch => {
        firebase.database().ref('todos/').on('child_added', (data) => {
            let obj = data.val();

            console.log('objobjobjobj',obj);
            obj.id = data.key;
            currentTodos = currentTodos.concat(obj);
            dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
        })
    }
}





export function deleteTodo(todoKey, index) {
    return dispatch => {
        firebase.database().ref('todos/' + todoKey).remove()
            .then((v) => {
                currentTodos = currentTodos.slice(0, index).concat(currentTodos.slice(index + 1));
                dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
            });
    }
}


export function editTodo(todoObj, index) {
    return dispatch => {
        // console.log(todoObj)
        let updateKey =todoObj.id;
        delete todoObj.id;
        firebase.database().ref('todos/' + updateKey).set(todoObj)
            .then((v) => {
                currentTodos = currentTodos.slice(0, index).concat(currentTodos.slice(index + 1));
                dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
            });
    }
}
