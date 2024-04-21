import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
    color: 'blue',
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topHeading: {
    flex: 1,
    fontSize: 16,
    marginBottom: 10,
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
});

const VotesPDF = ({ voteCounts, positionList }) => {
  const sortedVoteCounts = Object.values(voteCounts).sort((a, b) => a.position_id - b.position_id);
  return (

    <Document>
      {positionList.map((position, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>{position.name}</Text>
            {sortedVoteCounts
              .filter((vote) => vote.position_id === position.id)
              .map((vote, index) => (
                <View key={index} style={styles.section}>
                  <View style={styles.container}>
                    <Text style={styles.candidate}>{vote.candidate}</Text>
                    <Text style={styles.voteCount}>Total Votes: {vote.voteCount}</Text>
                  </View>
                </View>
              ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default VotesPDF