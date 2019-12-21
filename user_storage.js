


//puts the current version of userStorage in the Local Storage
function saveUserStorage(){
  userStorage_serialized = JSON.stringify(userStorage);
  localStorage.setItem("userStorage", userStorage_serialized);
}

//gets userStorage from the Local Storage
function getUserStorage(){
  userStorage_deserialized = JSON.parse(localStorage.getItem("userStorage"));
  userStorage = userStorage_deserialized;

}
