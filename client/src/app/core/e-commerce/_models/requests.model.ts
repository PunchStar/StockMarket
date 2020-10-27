import { ProductModel } from './product.model';
import { User } from '../../auth';

export class RequestsModel {
	id: number;
	_id:string;
	equity:number;
    status:string;
	date:Date;
	bankId:ProductModel;
	userId:User;
	clear() {
		this.equity = 0;
		this.status= 'Pending';
	}
}
