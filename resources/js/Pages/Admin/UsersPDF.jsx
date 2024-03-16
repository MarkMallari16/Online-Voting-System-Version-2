import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const UsersPDF = ({ data }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            textAlign: 'center'
        },
        tableCell: {
            margin: 'auto',
            fontSize: 12,
            fontWeight: 'bold',
            flexGrow: 1
        },
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>ID</Text>
                    <Text style={styles.tableCell}>Name</Text>
                    <Text style={styles.tableCell}>Email</Text>
                 
                </View>
                {data.map((user, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{user.ID}</Text>
                        <Text style={styles.tableCell}>{user.Name}</Text>
                        <Text style={styles.tableCell}>{user.Email}</Text>
                     
                    </View>
                ))}
            </Page>
        </Document>
    )
}

export default UsersPDF