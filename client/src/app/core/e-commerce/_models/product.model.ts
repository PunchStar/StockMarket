import { BaseModel } from '../../_base/crud';
import { ProductSpecificationModel } from './product-specification.model';
import { ProductRemarkModel } from './product-remark.model';

export class ProductModel extends BaseModel {
	id: number;
	// model: string;
	// manufacture: string;
	// modelYear: number;
	// mileage: number;
	// description: string;
	// color: string;
	// price: number;
	// condition: number;
	// status: number;
	// VINCode: string;

	// _specs: ProductSpecificationModel[];
	// _remarks: ProductRemarkModel[];
	_id:string;
	topic:string;
    type:string;
    date:Date;
    ISIN:string;
    Issuer:string;
    IssueVolume:number;
    Currency:string;
    IssuePrice:number;
    IssueDate: Date;
    Coupon:number;
    Denomination:number;
    PaymentType:string;
    SpecialCouponType:string[];
    MaturityDate:    Date;
    CouponPaymentDate: Date ;
    NoofPaymentsperYear:number[];
    CouponStartDate:  Date ;
    FinalCouponDate:  Date ;
	Floater:  string;
	uploadUrl: string;
	clear() {
		// this.model = '';
		// this.manufacture = '';
		// this.modelYear = 2000;
		// this.mileage = 0;
		// this.description = '';
		// this.color = 'Black';
		// this.price = 1000;
		// this.condition = 0;
		// this.status = 0;
		// this.VINCode = '';
		this.topic = '';
		this.type= '';
		// this.date= '';
		this.ISIN= '';
		this.Issuer= '';
		this.IssueVolume=0;
		this.Currency = 'GBP';
		this.IssuePrice = 0;
		this.IssueDate = new Date('01/01/2020');
		this.Coupon = 0;
		this.Denomination = 0;
		this.PaymentType = ''
		this.SpecialCouponType = [''];
		this.MaturityDate =new Date('01/01/2020');
		this.CouponPaymentDate = new Date('01/01/2020');
		this.NoofPaymentsperYear = [0];
		this.CouponStartDate = new Date('01/01/2020');
		this.FinalCouponDate = new Date('01/01/2020');
		this.Floater = '';
		this.uploadUrl = '';
	}
}
