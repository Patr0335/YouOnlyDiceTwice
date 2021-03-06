
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Chatroom, Status } from "../entities/Chatroom";
import { addChatroom, fetchChatrooms } from "../src/store/actions/chat.actions";
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "ChatRoom"
>;

export default function Chat1() {
  const navigation = useNavigation<ScreenNavigationType>();
  const [title, onChangeTitle] = React.useState("");
  const dispatch = useDispatch();

  const chatrooms: Chatroom[] = useSelector(
    (state: any) => state.chat.chatrooms
  )

  useEffect(() => { // only runs dispatch the first time the component renders
    dispatch(fetchChatrooms())
}, [])


  const handleAddChatroom = () => {
    const chatroom: Chatroom = new Chatroom(
      title,
      Status.UNREAD,
      "",
      new Date()
    );
    dispatch(addChatroom(chatroom));
  };

  const renderChatroom = ({ item }: { item: any }) => (
    <Text>{item.title}</Text>
);

  return (
    <View style={styles.container}>
      <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
                keyExtractor={item => item.title} // chatroom titles must be unique when I do this.
            />

            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  image: {
    width: "50%",
    height: 200,
  },
  chatroomContainer: {
    padding: 20,
  },
});