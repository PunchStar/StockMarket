// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { DataTableItemModel } from '../models/datatable-item.model';
import { environment } from '../../../../../environments/environment';
// const API_DATATABLE_URL = 'api/cars';
const end_point = environment.authURL;

// const end_point = '';
const API_DATATABLE_URL = 'bank/getAll';
import { map } from 'rxjs/operators';

@Injectable()
export class DataTableService {
	/**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Returns data from fake server
	 */
	getAllItems(): Observable<DataTableItemModel[]> {
		return this.http.post<DataTableItemModel[]>(end_point + API_DATATABLE_URL, {});
	}
	// getJSON(){
	// 	this.http.get('https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json').subscribe(data => {
	// 		console.log(data);
	// 	})
	// }
	getGraph(company):Observable<any>{
		// return this.http.get(`https://finnhub.io/api/v1/stock/candle?symbol=${company}&resolution=D&from=1572651390&to=1572910590&`).pipe(
		// var oldDate = new Date('2020/01/01');
		var oldDate = new Date('2019-10-01');
		// var newDate = new Date();
		// var newDate = new Date('2020-04-01');
		// var newDate = new Date();
		var newDate = new Date('2020-08-1');
		console.log('graph')
		console.log(oldDate.getTime())
		console.log(newDate.getTime())
		// return this.http.get(`https://finnhub.io/api/v1/calendar/earnings?from=2020-03-01&to=2020-03-15&symbol=AAPL&token=bqhhk2vrh5rdcs9r1tjg`).pipe(
			// return this.http.get(`https://finnhub.io/api/v1/stock/candle?symbol=SBIN.NS&resolution=M&from=${oldDate.getTime()}&to=${newDate.getTime()}&token=bqhhk2vrh5rdcs9r1tjg`).pipe(
			// return this.http.get(`https://finnhub.io/api/v1/stock/candle?symbol=${company}&resolution=D&from=1572651390&to=1572910590&token=bqhhk2vrh5rdcs9r1tjg`).pipe(
			return this.http.get(`https://finnhub.io/api/v1/stock/candle?symbol=${company}&resolution=D&from=${oldDate.getTime()/1000}&to=${newDate.getTime()/1000}&token=bqhhk2vrh5rdcs9r1tjg`).pipe(
			map((res: any) => {
				console.log(res);
				return res || {}
		  }),
	  )
	}
	getJSON(company): Observable<any> {
		// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
		// equest('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=', { json: true }, (err, res, body) => {
		// 	if (err) { return console.log(err); }
		// 	console.log(body.url);
		// 	console.log(body.explanation);
		//   });
		// const httpHeaders = new HttpHeaders();
		// return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo').pipe(
			return this.http.get(`https://finnhub.io/api/v1/quote?symbol=${company}&token=bqhhk2vrh5rdcs9r1tjg`).pipe(
				// return this.http.get('https://finnhub.io/api/v1/quote?symbol=AAL.L&token=bqhhk2vrh5rdcs9r1tjg').pipe(
				// return this.http.get('https://finnhub.io/https://finnhub.io/api/v1/quote?symbol=AAPL&token=bqhhk2vrh5rdcs9r1tjg').pipe(
				map((res: any) => {
				//   console.log(res);
				  return res || {}
			}),
		)
		// const httpHeaders = new HttpHeaders();
        // httpHeaders.set('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com');
        // httpHeaders.set('x-rapidapi-key', '41bae3f8eamsh3f91dcf098da4d8p1a5427jsnc6aaa2cfe9d1');
		// // return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?comparisons=%255EGDAXI%252C%255EFCHI&region=GB&lang=en&symbol=${company}&interval=1d&range=1y`,  {"headers": {
		// 	// return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=GB&lang=en&symbols=III`,  {"headers": {
		// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		// 	"x-rapidapi-key": "41bae3f8eamsh3f91dcf098da4d8p1a5427jsnc6aaa2cfe9d1"}}).pipe(
		// 		map((res: any) => {
		// 			// console.log('dfsdf')
		// 			// console.log(res)
		// 		  return res || {}
		// 	}),
		// )
	}
}
