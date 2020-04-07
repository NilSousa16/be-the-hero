/**
 * useEffect - carregar informação assim que o componente é exibido em tela
 * useState - responsável por guardar o estado e apresentar em tela
 *  */ 
import React, { useState, useEffect } from 'react'; 

/**
 * Feather - ícones
 */
import { Feather } from '@expo/vector-icons';
/**
 * useNavigation - realiza a navegação do link 'Mais detalhes'
 */
import { useNavigation } from '@react-navigation/native';
/**
 * FlatList - criar lista com scroll
 */
import { View, FlatList, Image, Text } from 'react-native'; 

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Incidents() {

    /**
     * Usado para armazenar os valores de incidentes a serem apresentados em tela
     */
    const [incidents, setIncidents] = useState([]);
    
    /**
     * Usado para armazenar o valor de totais a ser apresentado em tela
     */
    const [total, setTotal] = useState(0);

    /**
     * Usado para armazena o valor da paginação atual
     */
    const [page, setPage] = useState(1);

    /**
     * Usado para identifica a busca de dados novos para eficar carregamento desnecessário
     */
    const [loading, setLoading] = useState(false);
        
    /**
     * Usado para realizar navegação entre as janelas
     */
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    /**
     * incidents - idêntico ao caminho do back-end
     */
    async function loadIncidents() {  
        /**
         * Evita ser realizado outra requisição de dados enquanto a anterior
         * não foi finalizada
         */
        if (loading){
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: { page }
        });

        /**
         * Forma que sobrescreve os dados a serem escritos
         * setIncidents(response.data);
         * 
         * ...incidents, ...response.data - forma de anexar dois vetores em um
         * único
         */
        setIncidents([...incidents, ...response.data]);
        
        setTotal(response.headers['x-total-count']);
        /**
         * Pulando para próxima página a ser carregada
         */
        setPage(page + 1);
        setLoading(false);
    }

    /**
     * função disparada sempre que as variáveis mudarem
     */
    useEffect(() => {
        loadIncidents();
    }, []);

    /**
     * onEndReached - disparada função ao chegar no final tela (página)
     * onEndReachedThreshold - indica um percentual para o fim da página que inicia o
     * carregamento de mais dados
     */
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text> 
            <Text style={styles.description}>Escolha um caso abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents} 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL'
                        }).format(incident.value)}
                    </Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>
                </View>
                )}
            /> 
        </View>
    );
}