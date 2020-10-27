// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// RxJS
import { forkJoin , of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { ProductModel } from '../_models/product.model';
const end_point = environment.authURL;
// const end_point = '';
// const API_PRODUCTS_URL = 'api/products';
const API_PRODUCTS_URL = 'api/products';
// Real REST API
@Injectable()
export class ProductsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

	constructor(private http: HttpClient,
		           private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server
	createProduct(product): Observable<ProductModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductModel>(end_point + 'bank/create', product, { headers: httpHeaders });
	}

	// READ
	getAllProducts(): Observable<ProductModel[]> {
		// return this.http.get<ProductModel[]>(API_PRODUCTS_URL);
		return this.http.post<ProductModel[]>(end_point + 'bank/getAll',{});
	}

	getProductById(productId: number): Observable<ProductModel> {
		// return this.http.get<ProductModel>(API_PRODUCTS_URL + `/${productId}`);
		return this.http.post<ProductModel>(end_point + 'bank/find' + `/${productId}`,{});
	}

	// Server should return filtered/sorted result
	// findProducts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 		// Note: Add headers if needed (tokens/bearer)
	// 		const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

	// 		const url = API_PRODUCTS_URL + '/find';
	// 		return this.http.get<QueryResultsModel>(url, {
	// 			headers: httpHeaders,
	// 			params:  httpParams
	// 		});
	// }

	findProducts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		return this.getAllProducts().pipe(
			mergeMap(res => {
				// const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'condition']);
				const result = this.httpUtils.baseFilter(res, queryParams, ['type']);
				return of(result);
			})
		);
	}
	// UPDATE => PUT: update the product on the server
	updateProduct(product: ProductModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// return this.http.put(API_PRODUCTS_URL, product, { headers: httpHeaders });
		return this.http.post(end_point + 'bank/update', product, { headers: httpHeaders });
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	// updateStatusForProduct(products: ProductModel[], status: number): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const body = {
	// 		productsForUpdate: products,
	// 		newStatus: status
	// 	};
	// 	const url = API_PRODUCTS_URL + '/updateStatus';
	// 	return this.http.put(url, body, { headers: httpHeaders });
	// }

	// DELETE => delete the product from the server
	deleteProduct(productId: number): Observable<ProductModel> {
		// const url = `${API_PRODUCTS_URL}/${productId}`;
		const url = `${end_point}bank/${productId}`;
		return this.http.delete<ProductModel>(url);
	}

	deleteProducts(ids: number[] = []): Observable<any> {
		// const url = API_PRODUCTS_URL + '/delete';
		const url = end_point + 'bank/delete';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { prdocutIdsForDelete: ids };
		// return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
		return this.http.post<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
