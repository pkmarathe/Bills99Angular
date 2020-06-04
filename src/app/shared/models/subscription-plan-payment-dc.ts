export class SubscriptionPlanPaymentDc {
    public SubscriptionPlanPayId: number; 
    public UserId: number; 
	public SubscriptionPlanId: number; 
    public PaymentAmount: string;    
    public Status: string;         
    public TransactionId: string;    
    public CardNumber: string;     
    public Currency: string;     
    public CardName: string;      
    public ExpMonth: string;      
    public ExpYear: string;        
	public Cvc: string;  
	public ChargeId: string;  
	public Country: string;  
	public Created: string;  
	public LiveMode: string;  
	public PaymentMethod: string;  
	public Brand: string;  
	public ReceiptUrl: string;  
	public ReceiptNumber: string;  
	public TrackingNumber: string;  
    public CreatedDate: Date;  
    public SubscriptionFromDate: Date;  
    public SubscriptionToDate: Date;  

	public Name: string;  
	public SubscriptionPlan: string;    
}

export class SubscriptionPlanPaymentInputDc {
    public SubscriptionPlanPayId: number; 
    public UserId: number; 
	public SubscriptionPlanId: number; 
    public Cvc: string;    
    public ExpMonth: number;    
    public ExpYear: number;    
    public Name: string;     
    public Number: string;    
    public Currency: string;   
    public PaymentAmount: string;    
    public Status: string;          
    public Country: string;          
    public State: string;          
    public City: string;          
    public PostalCode: string;          
    public Address: string;          
    public TokenId: string;          
}

export class SubscriptionPlanPaymentSearchDc {  
    public UserId: number; 
	public SubscriptionPlanId: number; 
	public Status: string;    
	public Currency: string;        	
}  

export class PaymentCurrencyDc {  
    public PaymentCurrencyId: number; 
	public Currency: string; 
	public Description: string;    
	public PricePerDoller: string;        	
	public IsActive: string;        	
}  


export class PaymentCheckoutDc {  
    public Amount: number; 
	public Currency: string;       	
	public ReturnUrl: string;       	
    public CancelUrl: string;  
    public SubscriptionPlanId: number;      
    public CustomerEmail: string; 
}  
export class PaymentResponseModel {  
    public Result: boolean; 
	public SessionId: string;       	      	
}  