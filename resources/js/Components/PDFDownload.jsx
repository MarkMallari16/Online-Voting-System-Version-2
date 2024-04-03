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
const PDFDownload = ({ data, title, headerData }) => {
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
                    <Text style={styles.heading}>{title} List</Text>\
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}></Text>
                        {headerData.map((header, index) => (
                            <Text key={index} style={styles.tableCell}>{header}</Text>
                        ))}
                    </View>
                    <View style={styles.table}>

                        {data.map((rowData, index) => (
                            <TableRow key={index} rowData={rowData} />
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
const TableHeaders = ({ headerData }) => {
    <View style={styles.tableRow}>
        <Text key={index} style={styles.tableCell}>ID</Text>
    </View>

}
const TableRow = ({ rowData }) => {
    <View style={styles.tableRow}>
        <Text key={index} style={styles.tableCell}>
            {rowData}
        </Text>
    </View>
}

export default PDFDownload;
