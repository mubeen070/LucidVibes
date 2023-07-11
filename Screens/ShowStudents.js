import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const ShowStudent = () => {
    const [students, setStudents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        readData();
    }, []);


    const onRefresh = () => {
        setRefreshing(true);
        readData();
        setRefreshing(false);
    };


    async function readData() {
        const querySnapshot = await getDocs(collection(db, 'Students'))
            .then(() => {
                Alert.alert("successful!")
            })
        const studentData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setStudents(studentData);
    }

    const renderTableHeader = () => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderCell, styles.studentText]}>Name</Text>
            <Text style={[styles.tableHeaderCell, styles.studentText]}>Age</Text>
            <Text style={[styles.tableHeaderCell, styles.studentText]}>Semester</Text>
        </View>
    );

    const renderTableItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.age}</Text>
            <Text style={styles.tableCell}>{item.department}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.table}>
                {renderTableHeader()}
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTableItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Pull to refresh" />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        color: 'black',
    },
    table: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        paddingHorizontal: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderColor: 'black',
        paddingHorizontal: 10
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    tableCell: {
        flex: 1,
        paddingVertical: 10,
        paddingStart: 20,
    },
    studentText: {
        fontSize: 20,
        color: 'black',
    }
});

export default ShowStudent;
