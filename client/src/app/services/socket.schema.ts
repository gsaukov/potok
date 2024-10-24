export interface NewOrder {
  '@class' : 'com.apps.potok.soketio.model.order.NewOrder',
  uuid : string|null,
  symbol : string,
  route : string,
  val : number ,
  volume : number
}

export interface CancelOrder {
  '@class' : 'com.apps.potok.soketio.model.order.CancelOrder',
  uuid : string,
}

export interface QuoteRequest {
  '@class': 'com.apps.potok.soketio.model.quote.QuoteRequest',
  symbol: string
}


export interface QuoteRequest {
  '@class': 'com.apps.potok.soketio.model.quote.QuoteRequest',
  symbol: string
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
