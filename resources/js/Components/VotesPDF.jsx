import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import SHSLogo from "@/assets/councilLogo.png";
import STIBacoorLogo from "@/assets/bacoor-logo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 20,
  },
  section: {
    display: 'flex',
    margin: 10,
    padding: 10,
    border: 2,
    borderColor: "black",
    borderRadius: 4
  },

  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottom: '1 solid black',
    
  },
  candidate: {
    fontSize: 16,
    marginBottom: 2,

  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  voteCount: {
    fontSize: 14,
    color: '#4b5563',
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  topHeading: {
    flex: 1,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
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
  alignText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  dateText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: "center"
  },
 
});

const VotesPDF = ({ voteCounts, positionList, electionTitle }) => {
  const sortedVoteCounts = Object.values(voteCounts).sort((a, b) => a.position_id - b.position_id);
  return (

    <Document>
      {positionList.map((position, index) => (
        <Page key={index} size="A4">
          <View style={styles.container}>
            <Image style={styles.logoImage} src={SHSLogo} />
            <View style={styles.alignText}>
              <Text style={styles.topHeading}>{electionTitle}</Text>
              <Text style={styles.dateText}>As of {new Date().toLocaleString()}</Text>
            </View>
            <Image style={styles.stiLogo} src={STIBacoorLogo} />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>{position.name}</Text>
            <View style={styles.table}>
              {sortedVoteCounts
                .filter((vote) => vote.position_id === position.id)
                .map((vote, index) => (
                  <View key={index} style={styles.container}>
                    <Text style={styles.candidate}>{vote.candidate}</Text>
                    <Text style={styles.voteCount}>Total Votes: {vote.voteCount}</Text>
                  </View>
                ))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default VotesPDF