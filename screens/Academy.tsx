import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../typings/navigations";

import { View, Text, StyleSheet } from "react-native"

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "Academy"
>;

export default function Academy() {

    return (
        <View>
            <Text>This is the Invest page</Text>
        </View>
     );
    }

    const styles = StyleSheet.create({
 
    });

