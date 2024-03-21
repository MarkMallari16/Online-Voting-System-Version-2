import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import SHSLogo from "@/assets/councilLogo.png";
import STIBacoorLogo from "@/assets/bacoor-logo.png";
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    topHeading: {
        flex: 1,
        fontSize: "14px",
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    heading: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
    },

    table: {
        display: "table",
        width: "100%", 
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        marginBottom: 10,
    },
    tableRow: {
        
        flexDirection: "row",
    },
    tableCell: {
        flex: 1, 
        fontSize: 12,
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        textAlign: "center", 
    },
    logoImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    stiLogo: {
        width: 70,
        height: 50,
        marginBottom: 10,
    },
});
const UsersPDF = ({ users }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.container}>
                        <Image style={styles.logoImage} src={SHSLogo} />
                        <Text style={styles.topHeading}>
                            Online Voting System For Senior High School Student
                            Council
                        </Text>
                        <Image style={styles.stiLogo} src={STIBacoorLogo} />
                    </View>
                    <Text style={styles.heading}>Users List</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>ID</Text>
                            <Text style={styles.tableCell}>Name</Text>
                            <Text style={styles.tableCell}>Email</Text>
                            <Text style={styles.tableCell}>Role</Text>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        {users.map((user) => (
                            <View key={user.id} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{user.id}</Text>
                                <Text style={styles.tableCell}>
                                    {user.name}
                                </Text>
                                <Text style={styles.tableCell}>
                                    {user.email}
                                </Text>
                                <Text style={styles.tableCell}>
                                    {user.role}
                                </Text>
                                <Text style={styles.tableCell}>
                                    {user.email_verified_at
                                        ? "Verified"
                                        : "Unverified"}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default UsersPDF;
