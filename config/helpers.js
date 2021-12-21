
module.exports = {
  eq: (a, b) => {
    if (a === b)
      return 'selected'
  },
  totalAmount: (records) => {
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += Number(record.amount)
    })
    return totalAmount
  }
}