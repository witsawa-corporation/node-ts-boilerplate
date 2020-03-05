import summary from '../summary'

describe('Lib Summary', () => {
  it('should return "Can carry out bigger job"', () => {
    const result = summary([3, 2, 2, 3, 3])
    expect(result.total).toEqual(13)
    expect(result.totalPercentage).toEqual(86.67)
    expect(result.recommendation).toEqual('Can carry out bigger job')
  })
  it('should return "Maintain as it is"', () => {
    const result = summary([2, 2, 2, 2, 2])
    expect(result.total).toEqual(10)
    expect(result.totalPercentage).toEqual(66.67)
    expect(result.recommendation).toEqual('Maintain as it is')
  })
  it('should return "Reduce to smaller job"', () => {
    const result = summary([1, 1, 1, 1, 2])
    expect(result.total).toEqual(6)
    expect(result.totalPercentage).toEqual(40)
    expect(result.recommendation).toEqual('Reduce to smaller job')
  })
  it('should return "Formal meeting or/and Warning letter are required"', () => {
    const result = summary([1, 1, 1, 1, 1])
    expect(result.total).toEqual(5)
    expect(result.totalPercentage).toEqual(33.33)
    expect(result.recommendation).toEqual('Formal meeting or/and Warning letter are required')
  })
})
