export class DataTableItemModel {
    // id: number;
	// cModel: string;
	// cManufacture: string;
	// cModelYear: number;
	// cMileage: number;
	// cDescription: string;
	// cColor: string;
	// cPrice: number;
	// cCondition: number;
	// cStatus: number;
    // cVINCode: string;
    _id:string;
	topic:string;
    type:string;
    date:string;
    ISIN:string;
    Issuer:string;
    IssueVolume:number;
    Currency:string;
    IssuePrice:number;
    IssueDate: string;
    Coupon:number;
    Denomination:number;
    PaymentType:string;
    SpecialCouponType:string[];
    MaturityDate:    string;
    CouponPaymentDate: string ;
    NoofPaymentsperYear:number[];
    CouponStartDate:  string ;
    FinalCouponDate:  string ;
    Floater:  string;
}
