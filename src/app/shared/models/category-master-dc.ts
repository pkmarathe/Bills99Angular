export class CategoryMasterDc {
    public CategoryId: number;      
    public CategoryName: string;  
    public IsActive: boolean;   
	public CreatedDate: Date;  
 }

export class CategoryRecieptDc { 
    public CategoryRecieptId: number; 
	public CategoryId: number;     
	public FontId: number;     
    public BillRecieptName: string;        
    public BillRecieptDynamicHtml: string;
    public IsActive: boolean;   
	public CreatedDate: Date;  
	public BillRecieptSampleImage: string;  
	public RecieptType: string;  
	public BillRecieptPdfHtml: string;  
	public IsRecieptLogo: boolean;  
	public ReceiptWidth: string;  
	public ReceiptHight: string;  
}
export class CategoryRecieptPDFDc {       
	public BillRecieptSampleImage: string;   
	public RecieptType: string;  
	public IsRecieptLogo: boolean;  
	public ReceiptWidth: string;  
	public ReceiptHight: string;  
	public FontId: number;     
}

export class CategorySearchDc {
    public CategoryId: number;      
    public CategoryName: string;  
    public IsActive: string;    
 }