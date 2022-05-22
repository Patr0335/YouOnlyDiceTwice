import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import Input from "../components/Input";
import { User } from "../entities/User";
import { updateUser } from "../src/store/actions/user.actions";

export default function EditProfile() {
  const user: User = useSelector((state: RootState) => state.user.loggedInUser);
  const token = useSelector((state: RootState) => state.user.idToken);
  const dispatch = useDispatch(); // hook to get
  const [displayName, setDisplayName] = useState("");
  // const [photoUrl, setphotoUrl] = useState(user.photoUrl)
  

  console.log(user)
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>



        <Input title="Firstname and last name"
        inputValue={displayName}
        setText={setDisplayName} 
        error={"Cannot be empty"}          
        />
        {/* <Input title="Study programme"
                inputValue=""
                error="Study programme cannot be empty" /> */}

        <Pressable
          style={styles.saveButton}
          onPress={() => {
            dispatch(updateUser(user))

          }}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height,
    margin: 20,
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    width: Dimensions.get("window").width - 150,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#003399",
  },
  saveText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
