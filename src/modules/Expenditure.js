export class Expenditure {
  constructor(merchant, amount, notes) {
    this.merchant = merchant,
    this.amount = amount,
    this.notes = notes,
    this.timeLogged = new Date()
      .getTime()
  }
}