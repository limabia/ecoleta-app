import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, Text, Image, ImageBackground } from "react-native";
import styles from "./styles";
import RNPickerSelect from "react-native-picker-select";
import { RectButton } from "react-native-gesture-handler";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}
const Home = () => {
  const navigation = useNavigation();
  const [uf, setUF] = useState("");
  const [city, setCity] = useState("");
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (uf === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [uf]);

  function handlerNavigatePoints() {
    navigation.navigate("Points", { uf, city });
  }

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
      source={require("../../assets/home-background.png")}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.input}>
          <RNPickerSelect
            placeholder={{
              label: "Selecione o estado",
              value: uf,
              color: "#6C6C80",
            }}
            onValueChange={(value) => setUF(value)}
            items={ufs.map((uf) => ({
              label: uf,
              value: uf,
            }))}
          />
        </View>

        <View style={styles.input}>
          <RNPickerSelect
            placeholder={{
              label: "Selecione a cidade",
              value: city,
              color: "#6C6C80",
            }}
            onValueChange={(value) => setCity(value)}
            items={cities.map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </View>
        <RectButton style={styles.button} onPress={handlerNavigatePoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24}></Icon>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
