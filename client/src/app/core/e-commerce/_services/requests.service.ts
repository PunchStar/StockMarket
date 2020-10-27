// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// RxJS
import { forkJoin , of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { RequestsModel } from '../_models/requests.model';
import { environment } from '../../../../environments/environment';
const end_point = environment.authURL;
// const end_point = '';
// const API_PRODUCTS_URL = 'api/products';
const API_PRODUCTS_URL = 'api/products';
// Real REST API
@Injectable()
export class RequestsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

	constructor(private http: HttpClient,
		           private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server
	createRequest(product): Observable<RequestsModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<RequestsModel>(end_point + 'request/create', product, { headers: httpHeaders });
	}

	// READ
	getAllRequests(): Observable<RequestsModel[]> {
		// return this.http.get<RequestsModel[]>(API_PRODUCTS_URL);
		return this.http.post<RequestsModel[]>(end_point + 'request/getAll',{});
	}
	getAllRequestId(id): Observable<RequestsModel[]> {
		// return this.http.get<RequestsModel[]>(API_PRODUCTS_URL);
		return this.http.post<RequestsModel[]>(end_point + 'request/getAllId',{aId:id});
	}
	getRequestById(productId: number): Observable<RequestsModel> {
		// return this.http.get<RequestsModel>(API_PRODUCTS_URL + `/${productId}`);
		return this.http.post<RequestsModel>(end_point + 'request/find' + `/${productId}`,{});
	}

	// Server should return filtered/sorted result
	// findRequests(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 		// Note: Add headers if needed (tokens/bearer)
	// 		const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

	// 		const url = API_PRODUCTS_URL + '/find';
	// 		return this.http.get<QueryResultsModel>(url, {
	// 			headers: httpHeaders,
	// 			params:  httpParams
	// 		});
	// }

	findRequests(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		return this.getAllRequests().pipe(
			mergeMap(res => {
				// const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'condition']);
				const result = this.httpUtils.baseFilter(res, queryParams, ['type']);
				return of(result);
			})
		);
	}
	// UPDATE => PUT: update the product on the server
	updateRequest(product: any): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// return this.http.put(API_PRODUCTS_URL, product, { headers: httpHeaders });
		return this.http.post(end_point + 'request/update', product, { headers: httpHeaders });
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	// updateStatusForRequest(products: RequestsModel[], status: number): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const body = {
	// 		productsForUpdate: products,
	// 		newStatus: status
	// 	};
	// 	const url = API_PRODUCTS_URL + '/updateStatus';
	// 	return this.http.put(url, body, { headers: httpHeaders });
	// }

	// DELETE => delete the product from the server
	deleteRequest(productId: number): Observable<RequestsModel> {
		// const url = `${API_PRODUCTS_URL}/${productId}`;
		const url = `${end_point}request/${productId}`;
		return this.http.delete<RequestsModel>(url);
	}

	deleteRequests(ids: number[] = []): Observable<any> {
		// const url = API_PRODUCTS_URL + '/delete';
		const url = end_point + 'request/delete';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { prdocutIdsForDelete: ids };
		// return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
		return this.http.post<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
