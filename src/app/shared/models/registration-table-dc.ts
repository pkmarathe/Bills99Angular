export class RegistrationTableDc {
    public UserId: number;  
    public Name: string;    
    public MobileNo: string;    
    public Address: string;    
    public Designation: string;      
    public EmailId: string;    
    public Password: string;          
    public TermsOfUse: string;   
	public Role: string; 
	public ProfileImage: any; 
	public IsActive: boolean; 
	public CreatedBy: string; 
	public CreatedDate: Date; 
	public UpdatedBy: string; 
	public UpdatedDate: Date;         
    public SubscriptionPlanId: number;   
    public Cvc: string;    
    public ExpMonth: number;    
    public ExpYear: number;    
    public CardName: string;     
    public Number: string;    
    public Currency: string;   
    public PaymentAmount: string;        
    public Country: string;        
    public State: string;        
    public City: string;        
    public PostalCode: string;        
    public TokenId: string;        
} 

export class RegistrationSearchDc { 
    public Name: string;     
    public Designation: string;      
    public EmailId: string;   
	public Role: string;  
	public IsActive: string; 	
} 

export class RegistrationDropdownDc {
    public UserId: number;  
    public Name: string;     
}

export class FileExportDc {
    public FileName: string;  
    public HtmlText: string;     
    public ContentType: string;     
}   