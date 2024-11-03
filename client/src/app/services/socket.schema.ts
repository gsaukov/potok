export class NewOrder {
  readonly '@class' = 'com.apps.potok.soketio.model.order.NewOrder'
  uuid : string|null
  symbol : string
  route : string
  val : number
  volume : number
  constructor(symbol: string, route: string, val: number, volume: number) {
    this.uuid = null
    this.symbol = symbol
    this.route = route
    this.val = val
    this.volume = volume
  }
}

export class CancelOrder {
  readonly '@class' = 'com.apps.potok.soketio.model.order.CancelOrder'
  uuid : string
  constructor(uuid: string) {
    this.uuid = uuid
  }
}

export class QuoteRequest {
  readonly '@class' = 'com.apps.potok.soketio.model.quote.QuoteRequest'
  symbol: string
  constructor(symbol: string) {
    this.symbol = symbol
  }
}

export class CloseShortPositionRequest {
  readonly '@class' = 'com.apps.potok.soketio.model.execution.CloseShortPositionRequest'
  symbol: string
  amount: number
  constructor(symbol: string, amount: number) {
    this.symbol = symbol
    this.amount = amount
  }
}

//================= RESPONSE =================

export interface Quote {
  symbol: string,
  price: number,
  volume: number,
  route: string,
}

export interface QuoteResponse {
  bidQuotes: Quote[],
  askQuotes: Quote[]
}

export interface OrderConfirmation {
  uuid: string,
  timestamp: string,
  symbol: string,
  account: string,
  route: string,
  val: number,
  originalVolume: number,
  volume: number,
  active: boolean,
  blockedPrice: number
}

//balance comes as a value.

export interface Execution {
  executionUuid: string,
  counterExecutionUuid: string,
  orderUuid: string,
  timestamp: string,
  symbol: string,
  accountId: string,
  route: string,
  fillPrice: number,
  blockedPrice: number,
  quantity: number,
  orderLeftQuantity: number,
  filled: boolean,
}

export interface Position {
  uuid: string,
  createdTimestamp: string,
  symbol: string,
  route: string,
  account: string,
  volume: number,
  weightedAveragePrice: number,
  averagePerformance: number
}

