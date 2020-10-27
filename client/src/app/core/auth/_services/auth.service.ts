import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { filter, some, find, each } from 'lodash';
import { mergeMap, tap } from 'rxjs/operators';
import { HttpUtilsService } from '../../_base/crud';
// const API_USERS_URL = 'http://localhost:5000/api/users';
// const API_USERS_URL = 'http://localhost:5000/client';
// const USERS_URL = '';
const USERS_URL = environment.authURL;
// const USERS_URL = 'http://localhost:5000/';
const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
    allAccount;
    constructor(private http: HttpClient,
        private httpUtils: HttpUtilsService) {}
    // Authentication/Authorization
    login(email: string, password: string): Observable<User> {
        // return this.http.post<User>(API_USERS_URL, { email, password });
        return this.http.post<User>(`${USERS_URL}client/login`, {'emailAddress': email,'hash': password });

    }

    getUserByToken(): Observable<User> {
        // const userToken = localStorage.getItem(environment.authTokenKey);
        // const httpHeaders = new HttpHeaders();
        // // httpHeaders.set('Authorization', 'Bearer ' + userToken);
        // httpHeaders.set('Authorization', '' + userToken);
        // console.log('.....token....')
        // console.log(userToken)
        // console.log('.........')
        // // return this.http.get<User>(API_USERS_URL, { headers: httpHeaders });
        // return this.http.post<User>("http://localhost:5000/client/getUserByToken", { headers: httpHeaders });
        const userToken = localStorage.getItem(environment.authTokenKey);
        if (!userToken) {
            return of(null);
        }

        return this.getAllUsers().pipe(
            map((result: User[]) => {
                if (result.length <= 0) {
                    return null;
                }

                const user = find(result, (item: User) => {
                    console.log('wanseu');
                    console.log(item.accessToken)
                    console.log(userToken.toString())
                    return (item.accessToken === userToken.toString());
                });

                if (!user) {
                    return null;
                }

                user.hash = undefined;
                return user;
            })
        );
    }

    register(user: User): Observable<any> {
        // user.roles = [2]; // Manager
        // user.accessToken = 'access-token-' + Math.random();
        // user.refreshToken = 'access-token-' + Math.random();
        // user.pic = './assets/media/users/default.jpg';
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(`${USERS_URL}client/register`, user, { headers: httpHeaders })
            .pipe(
                map((res: User) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
    public requestPassword(email: string): Observable<any> {
    	return this.http.post(`${USERS_URL}` + 'forgot/' + email,{})
    		.pipe(catchError(this.handleError('forgot-password', []))
	    );
    }


    getAllUsers(): Observable<User[]> {
        // return this.http.get<User[]>(API_USERS_URL);
        
		return this.http.post<User[]>(`${USERS_URL}client/getAll`,{});
    }
    getAllDatas(): Observable<any[]> {
        // return this.http.get<User[]>(API_USERS_URL);
        
		return this.http.post<any[]>(`${USERS_URL}getAllFiles`,{});
    }
    getDatas(userId:string): Observable<any[]> {
        // return this.http.get<User[]>(API_USERS_URL);
        
		return this.http.post<any[]>(`${USERS_URL}getFiles`,{'id':userId});
    }
    getUserById(userId: number): Observable<User> {
        // return this.http.get<User>(API_USERS_URL + `/${userId}`);
        return this.http.post<User>(`${USERS_URL}authnum/client` + `/${userId}` , {});
	}
	delFile(id:string):Observable<any> {
		// const url = `${API_USERS_URL}/${userId}`;
        // return this.http.delete(url);
        return this.http.post<any>(`${USERS_URL}delFile`,{id:id});
    }

    // DELETE => delete the user from the server
	deleteUser(userId: number) {
		// const url = `${API_USERS_URL}/${userId}`;
        // return this.http.delete(url);
        return this.http.delete(`${USERS_URL}auth/client/${userId}`)
    }

    // UPDATE => PUT: update the user on the server
	updateUser(_user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
            //   return this.http.put(API_USERS_URL, _user, { headers: httpHeaders });
            console.log('... auth update user ..')
            console.log(_user)
            console.log('----------------')
            return this.http.post(`${USERS_URL}client/profile`, _user, { headers: httpHeaders });
	}

    // CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
    // 	const httpHeaders = new HttpHeaders();
    //  httpHeaders.set('Content-Type', 'application/json');
    // 	   return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders});
//    var userTemp:any = user;
//    userTemp.roles = [2] as number[]; // Manager
//    userTemp.accessToken = 'access-token-' + Math.random();
//    userTemp.refreshToken = 'access-token-' + Math.random();
//    userTemp.pic = './assets/media/users/default.jpg';
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(`${USERS_URL}client/register`, user, { headers: httpHeaders });
	}

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        // const httpHeaders = new HttpHeaders();
        // httpHeaders.set('Content-Type', 'application/json');
		//       return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: httpHeaders});
        return this.getAllUsers().pipe(
			mergeMap((response: User[]) => {
				const result = this.httpUtils.baseFilter(response, queryParams, []);
				return of(result);
			})
		);
    }

    // Permission
    getAllPermissions(): Observable<Permission[]> {
		return this.http.get<Permission[]>(API_PERMISSION_URL);
    }

    getRolePermissions(roleId: number): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
    }

    // Roles
    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(API_ROLES_URL);
    }

    getRoleById(roleId: number): Observable<Role> {
		return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
    }

    // CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
		// Note: Add headers if needed (tokens/bearer)
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
		      return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
	}

    // UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
		      return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: number): Observable<Role> {
		const url = `${API_ROLES_URL}/${roleId}`;
		return this.http.delete<Role>(url);
	}

    // Check Role Before deletion
    isRoleAssignedToUsers(roleId: number): Observable<boolean> {
        return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
    }

    findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        // This code imitates server calls
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
		      return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders});
	}

 	/*
 	 * Handle Http operation that failed.
 	 * Let the app continue.
     *
	 * @param operation - name of the operation that failed
 	 * @param result - optional value to return as the observable result
 	 */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
    addFiles(id,name, newSrc): Observable<any> {
        let api = `${USERS_URL}addFile`;
        console.log('service_album')
        return this.http.post(api, {'userId':id,'name':name,'src':newSrc})
          .pipe(
            catchError(this.handleError)
          ) 
    }
    getFiles(id): Observable<any> {
        let api = `${USERS_URL}getFile`;
        return this.http.post(api, {'_id':id})
          .pipe(
            catchError(this.handleError)
          ) 
    }
}
