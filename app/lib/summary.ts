type SummaryObj = {
  total: number
  totalPercentage: number
  recommendation: string
}

const summary = (scores: Array<number>): SummaryObj => {
  const total = scores.reduce((sum, item) => sum + item, 0)
  const totalPercentage = (total / 15) * 100
  let recommendation
  if (totalPercentage >= 70) {
    recommendation = 'Can carry out bigger job'
  } else if (totalPercentage >= 60) {
    recommendation = 'Maintain as it is'
  } else if (totalPercentage >= 40) {
    recommendation = 'Reduce to smaller job'
  } else {
    recommendation = 'Formal meeting or/and Warning letter are required'
  }
  return {
    total,
    totalPercentage: +totalPercentage.toFixed(2),
    recommendation,
  }
}

export default summary
