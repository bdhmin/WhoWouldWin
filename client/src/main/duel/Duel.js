import React, { Component } from 'react';
import './duel.css'
import axios from 'axios';

class Duel extends Component {
  constructor() {
    super();
    this.state = {
      summoner1: undefined,
      summoner2: undefined,
    }
  }

  componentDidMount = () => {
    const summoner1 = decodeURIComponent(this.props.match.params.summonerNames.split('summonerNames=')[1].split('&')[0]);
    const summoner2 = decodeURIComponent(this.props.match.params.summonerNames.split('summonerNames=')[1].split('&')[1]);

    // console.log("ComponentDidMount:", summoner1, summoner2);

    if (summoner1 !== undefined || summoner2 !== undefined) {
      axios.get('/api/summoners', {
        params: {
          summonerName1: summoner1, // this.state.summonerSearchName
          summonerName2: summoner2,
        }
      })
      .then((response => this.setState({
        summoner1: response.data[0],
        summoner2: response.data[1],
      }, () => {
        // console.log("After setState:", this.state);
      })))
      .catch(function(error) {
        console.log('Can\'t fetch:', error.message);
      })
    }

    // console.log("State stuff", this.state.summoner1)
  }

  checkQueuePlayed(queueData) {
    // console.log('queuetest', queueData)
    if (queueData === undefined) {
      return <span>Unranked</span>
    } else {
      return <span>{ queueData.tier }&nbsp;{ queueData.rank }&nbsp;{ Math.round(this.getWinRate(queueData) * 100) }% wr</span>
    }
  }

  getRankString(queueData) {
    if (queueData === undefined) {
      return 'UNRANKED';
    } else {
      return queueData.tier + ' ' + queueData.rank;
    }
  }

  // Calculates win ratio using wins and losses
  // returns decimal value (0 <= x <= 1)
  getWinRate(queueData) {
    if (queueData === undefined) {
      throw new Error('queueData is undefined when trying to calculate win rate');
    }
    return queueData.wins / (queueData.wins + queueData.losses);
  }

  // Checks if user has a rank in this game type
  isRanked(queueData) {
    return queueData === undefined ? false : true;
  }

  // returns the points of a summoner in a given queue
  getRankedPoints(queueData) {
    if (queueData === undefined) {
      throw new Error('queueData is undefined when trying to calculate win rate');
    }
    const index = rankToIndex[this.getRankString(queueData)] + this.deservingRankAmount(this.getWinRate(queueData));
    return rankToPoints[indexToRank[index]];
  }

  // Returns an array of size 2: 0 index for summoner1 and 1 index for summoner2
  // returnArray[0] + returnArray[1] = 1 = 100%
  calculateWinnerPercentage(summoner1, summoner2) {

    

    // Compare Level (basically, how much experience you have in the game)
    // usually ~50 more levels is a decent amount better
    // higher the level, the less relevant
    // basically, base comparison starts at lv 30 - can begin ranked

    // level1 / level2
    // if 1 higher than 2, lvRatio > 1
    var sum1lv = summoner1.introData.summonerLevel;
    var sum2lv = summoner2.introData.summonerLevel;
    // var lvRatio = sum1lv / sum2lv;
    
    // Compare SoloQ Rank with Winrate
    // var soloQueueRankRatio = 0;
    var soloQueue1RankVal = 0;
    var soloQueue2RankVal = 0;
    if (this.isRanked(summoner1.soloQueueData) && this.isRanked(summoner2.soloQueueData)) {
      soloQueue1RankVal = this.getRankedPoints(summoner1.soloQueueData);
      soloQueue2RankVal = this.getRankedPoints(summoner2.soloQueueData);
      // soloQueueRankRatio = soloQueue1RankVal / soloQueue2RankVal;
    }
    // console.log('sq rankval:', soloQueue1RankVal, soloQueue2RankVal);

    // Compare FlexQ Rank with Winrate (has less prio that SoloQ)
    // var flexQueueRankRatio = 0;
    var flexQueue1RankVal = 0;
    var flexQueue2RankVal = 0;
    if (this.isRanked(summoner1.flexQueueData) && this.isRanked(summoner2.flexQueueData)) {
      flexQueue1RankVal = this.getRankedPoints(summoner1.flexQueueData);
      flexQueue2RankVal = this.getRankedPoints(summoner2.flexQueueData);
      // flexQueueRankRatio = flexQueue1RankVal / flexQueue2RankVal;
    }

    // Calculating the importance (weight distribution) of each category

    sum1lv *= 1;
    sum2lv *= 1;

    soloQueue1RankVal *= 40;
    soloQueue2RankVal *= 40;

    flexQueue1RankVal *= 25;
    flexQueue2RankVal *= 25;

    // console.log('Ratios calculated:', lvRatio, soloQueueRankRatio, flexQueueRankRatio);

    const sum1Calculated = sum1lv + soloQueue1RankVal + flexQueue1RankVal;
    const sum2Calculated = sum2lv + soloQueue2RankVal + flexQueue2RankVal;

    // const sum1Tosum2 = (sum1lv + soloQueue1RankVal + flexQueue1RankVal) / (sum2lv + soloQueue2RankVal + flexQueue2RankVal);
    const sum1Tosum2 = sum1Calculated / (sum1Calculated + sum2Calculated);

    return [sum1Tosum2, 1 - sum1Tosum2];
  }

  // Calculate winrate to calculate how much you deserve that rank
  // Number must be added in rank tier
  // take in Number, return Number
  deservingRankAmount(rankWR) {
    // takes in number that is decimal!!! 0 <= x <= 1
    // 0%~19%: -4
    // 20%~39%: -2
    // 40%~46%: -1
    // 47%~53%: 0
    // 54%~60%: 1
    // 61%~80%: 2
    // 81%~100%: 4

    if (rankWR <= 0.19) {
      return -4;
    } else if (rankWR <= 0.39) {
      return -2;
    } else if (rankWR <= 0.46) {
      return -1;
    } else if (rankWR <= 0.53) {
      return 0;
    } else if (rankWR <= 0.60) {
      return 1;
    } else if (rankWR <= 0.80) {
      return 2;
    } else { // rankWR <= 1.00
      return 4;
    }
  }

  // Return winning summoner
  getWinnerSummoner(summoner1, summoner2, winnerPercentages) {
    if (winnerPercentages[0] > winnerPercentages[1]) {
      return summoner1.introData.name;
    } else if (winnerPercentages[0] < winnerPercentages[1]) {
      return summoner2.introData.name;
    } else {
      return -1;
    }
  }

  // Display winner sentence
  displayWinnerSentence(winnerResult) {
    if (winnerResult === -1) {
      return <span>It's a tie!</span>;
    } else {
      return <span><b>{ winnerResult }</b> would win!</span>
    }
  }

  render() {
    // const summonerNames = this.props.match.params.summonerNames.split('summonerNames=')[1].split('&');
    // console.log('Summoner Names', summonerNames);

    // console.log('summoner1:', this.state.summoner1);
    if (this.state.summoner1 === undefined) {
      return (
        <div>Loading Summoners...</div>
      )
    } else {
      return (
        <div className="duel">
          <div>
            <br/>
            {/* Summoner1.introData.id: <b>{ this.state.summoner1.introData.id }</b> */}
            <br/>
            {/* Summoner2.introData.id: <b>{ this.state.summoner2.introData.id }</b> */}
          </div>

          <p>{ this.state.summoner1.introData.name } vs { this.state.summoner2.introData.name }</p>
          <p>Lv { this.state.summoner1.introData.summonerLevel} vs Lv { this.state.summoner2.introData.summonerLevel}</p>
          <p>Solo Queue Rank: { this.checkQueuePlayed(this.state.summoner1.soloQueueData) } vs { this.checkQueuePlayed(this.state.summoner2.soloQueueData) }</p>
          <p>Flex Queue Rank: { this.checkQueuePlayed(this.state.summoner1.flexQueueData) } vs { this.checkQueuePlayed(this.state.summoner2.flexQueueData) }</p>
          <p>So...</p>
          <p>{ Math.round(this.calculateWinnerPercentage(this.state.summoner1, this.state.summoner2)[0] * 10000) / 100 }% vs { Math.round(this.calculateWinnerPercentage(this.state.summoner1, this.state.summoner2)[1] * 10000) / 100 }%</p>
          <p>{ this.displayWinnerSentence(this.getWinnerSummoner(this.state.summoner1, this.state.summoner2, this.calculateWinnerPercentage(this.state.summoner1, this.state.summoner2))) }</p>

        </div>
      )
    }
  }
}

// Array for this lookup
// UNUSED
const indexToRank = [
  'UNRANKED', // I guess just to match the index?
  'IRON IV',
  'IRON III',
  'IRON II',
  'IRON I',
  'BRONZE IV',
  'BRONZE III',
  'BRONZE II',
  'BRONZE I',
  'SILVER IV',
  'SILVER III',
  'SILVER II',
  'SILVER I',
  'GOLD IV',
  'GOLD III',
  'GOLD II',
  'GOLD I',
  'PLATINUM IV',
  'PLATINUM III',
  'PLATINUM II',
  'PLATINUM I',
  'DIAMOND IV',
  'DIAMOND III',
  'DIAMOND II',
  'DIAMOND I',
  'MASTER I',
  'GRANDMASTER I',
  'CHALLENGER I',
]

// Return the index of the rank to get the rank string
const rankToIndex = {
  'UNRANKED': -1, // This shouldn't ever have to be returned!!!
  'IRON IV': 1,
  'IRON III': 2,
  'IRON II': 3,
  'IRON I': 4,
  'BRONZE IV': 5,
  'BRONZE III': 6,
  'BRONZE II': 7,
  'BRONZE I': 8,
  'SILVER IV': 9,
  'SILVER III': 10,
  'SILVER II': 11,
  'SILVER I': 12,
  'GOLD IV': 13,
  'GOLD III': 14,
  'GOLD II': 15,
  'GOLD I': 16,
  'PLATINUM IV': 17,
  'PLATINUM III': 18,
  'PLATINUM II': 19,
  'PLATINUM I': 20,
  'DIAMOND IV': 21,
  'DIAMOND III': 22,
  'DIAMOND II': 23,
  'DIAMOND I': 24,
  'MASTER I': 25,
  'GRANDMASTER I': 26,
  'CHALLENGER I': 27
}

// Return the number of points you get in your rank
const rankToPoints = {
  'UNRANKED': -1, // This shouldn't ever have to be returned!!!
  'IRON IV': 4,
  'IRON III': 4.1,
  'IRON II': 4.3,
  'IRON I': 4.5,
  'BRONZE IV': 5.5,
  'BRONZE III': 6,
  'BRONZE II': 6.5,
  'BRONZE I': 7,
  'SILVER IV': 8,
  'SILVER III': 9,
  'SILVER II': 10,
  'SILVER I': 11,
  'GOLD IV': 12,
  'GOLD III': 13,
  'GOLD II': 14,
  'GOLD I': 15,
  'PLATINUM IV': 25,
  'PLATINUM III': 30,
  'PLATINUM II': 35,
  'PLATINUM I': 40,
  'DIAMOND IV': 45,
  'DIAMOND III': 50,
  'DIAMOND II': 55,
  'DIAMOND I': 60,
  'MASTER I': 80,
  'GRANDMASTER I': 90,
  'CHALLENGER I': 100
}


// Class for summoner data
export class SummonerStats {
  introData;
  soloQueueData;
  flexQueueData;
}

export default Duel;