import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import SHSLogo from "@/assets/councilLogo.png";
import STIBacoorLogo from "@/assets/bacoor-logo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 20,
    fontFamily: 'poppins'
  },
  section: {
    display: 'flex',
    margin: 20,

    border: '1px solid black',
    borderRadius: '4px'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: '1px solid black',
    padding: 6
  },

  candidate: {
    fontSize: 14,
    marginBottom: 2,

  },

  voteCount: {
    fontSize: 14,
    color: 'black',
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  topHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoImage: {
    width: 100,
    height: 100,

  },
  stiLogo: {
    width: 70,
    height: 50,
    marginRight: 20
  },
  alignText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  dateText: {
    fontSize: 14,
    marginTop: 3,
    textAlign: "center"
  },

});

const VotesPDF = ({ voteCounts, positionList, electionTitle, totalVotesPerPosition }) => {
  const sortedVoteCounts = Object.values(voteCounts).sort((a, b) => a.position_id - b.position_id);

  console.log(totalVotesPerPosition)
  return (

    <Document>
      {positionList.map((position, index) => (
        <Page size="A4" key={index}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logoImage} src={SHSLogo} />
            </View>
            <View style={styles.alignText}>
              <Text style={styles.topHeading}>{electionTitle}</Text>
              <Text style={styles.dateText}>As of {new Date().toLocaleString()}</Text>
            </View>
            <View>
              <Image style={styles.stiLogo} src={STIBacoorLogo} />
            </View>

          </View>
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>{position.name}</Text>
              <View>
                {sortedVoteCounts
                  .filter((vote) => vote.position_id === position.id)
                  .map((vote, index) => (
                    <View key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      borderBottom: '1px solid black',
                      padding: 10
                    }}>
                      <Text style={styles.candidate}>{vote.candidate}</Text>
                      <Text style={styles.voteCount}>{vote.voteCount} {vote.voteCount > 1 ? 'Votes' : 'Vote'}</Text>

                    </View>
                  ))}
              </View>
              <View style={{
                padding: 6
              }}>
                <Text style={{ textAlign: 'right', fontSize: '14px' }}>Total Votes for {position.name}: {totalVotesPerPosition[position.name]}</Text>
              </View>
            </View>
          </View>


        </Page>
      ))}
    </Document>
  )
}

export default VotesPDF