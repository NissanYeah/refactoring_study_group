

function createPerformanceCaculator(aPerformance,aPlay){
  switch(aPlay.type){
    case "tragedy":
      return new TragedyCaculator(aPerformance, aPlay)
    case "comedy":
      return new ComedyCaculator(aPerformance, aPlay)
  }
}

class PerformanceCaculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }
}

class TragedyCaculator extends PerformanceCaculator{

  get amount(){
    let result = 40000;
    if(this.performance.audience > 30){
      result += 1000 *(this.performance.audience - 30);
    }  
    return result
  }
}

class ComedyCaculator extends PerformanceCaculator {

  get amount(){
    let result = 30000;
    if(this.performance.audience >20){
      result += 10000 + 500 * (this.performance.audience -20);
    }  
    result += 300 * this.performance.audience;
    return result
  }
}

function createStatementData(invoice, plays){
  const statementData = {}
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.plays = plays
  statementData.totalAmount = totalAmount()
  statementData.totalVolumeCredits = totalVolumeCredits()
  return statementData

  function enrichPerformance(aPerformance){
    const caculator = new createPerformanceCaculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance);
    result.play = caculator.play
    result.amount = caculator.amount
    return result
  }

  function amountFor(aPerformance){
    let result;
    play = playFor(aPerformance)
    switch(play.type){
      case "tragedy":
        result = 40000;
        if(aPerformance.audience > 30){
          result += 1000 *(aPerformance.audience - 30);
        }  
        break;
      case "comedy":
        result = 30000;
        if(aPerformance.audience >20){
          result += 10000 + 500 * (aPerformance.audience -20);
        }  
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknow type: ${play.type}`)
    }
    return result
  }

  function totalAmount(){
    let result = 0;
    for(let perf of invoice.performances){
      result += amountFor(perf);
    }
    return result
  }

  function totalVolumeCredits(){
    let result = 0;
    for(let perf of invoice.performances){
      result += volumeCreditsFor(perf)
    }
    return result
  }

  function volumeCreditsFor(aPerformance){
    let volumeCredits = 0;
    volumeCredits = Math.max(aPerformance.audience - 30, 0);
    if("comedy" === playFor(aPerformance).type) {
      volumeCredits =  Math.floor(aPerformance.audience / 5);
    }
    return volumeCredits
  }

  function playFor(aPerformances){
    return plays[aPerformances.playID];
  }
}

module.exports = {
  createStatementData,
};
