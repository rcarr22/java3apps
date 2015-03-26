import java.applet.*;
import java.applet.Applet;
import java.awt.*;
import java.awt.event.*; //for ActiionListener interface
import javax.swing.*;
import java.net.* ;//for URL class to get JAR resources

public class Main extends Applet implements ActionListener{

   //=================
   int width, height; //width and height
   //=================
   	JPanel bigPanel = new JPanel(); //new JPanel( new FlowLayout( ));
    //JPanel pnlMain = new JPanel( new FlowLayout() );
	double amount,interest,years,payment;
	double a,j,n;
	JTextField txtAmount = new JTextField(10);
	JTextField txtInterest = new JTextField(10);
	JTextField txtYears = new JTextField(10);
	JTextField txtPayment = new JTextField(10);
    
    //==========================================		
    JLabel lblAmount =   new JLabel("Loan Amount:       ");
    JLabel lblInterest = new JLabel("Yearly Rate:           ");
    JLabel lblYears =    new JLabel("Years to Pay:         ");
    JLabel lblPayment = new JLabel("Monthly Payment:");		
    JButton button = new JButton("Calculate Payment");    
	//==========================================    
	
	Timer tmrColor = new Timer(100, this);   

   public void init() {
      width = getSize().width;
      height = getSize().height;
      setBackground( Color.lightGray );      
      txtPayment.setEditable(false);

      //================
		JPanel panel[]=new JPanel[5];
		for(int i=0;i<5;i++){
			panel[i]=new JPanel();
			panel[i].setBackground(Color.lightGray);
			panel[i].setLayout(new BoxLayout(panel[i], BoxLayout.X_AXIS));
		}	

		bigPanel.setBackground(Color.lightGray);
        bigPanel.setLayout(new BoxLayout(bigPanel, BoxLayout.Y_AXIS));
		
		panel[0].add(lblAmount);
		panel[0].add(txtAmount);		
		panel[1].add(lblInterest);
		panel[1].add(txtInterest);		
		panel[2].add(lblYears);
		panel[2].add(txtYears);		
		panel[3].add(button);		
		panel[4].add(lblPayment);
		panel[4].add(txtPayment);
    
    for(int i=0;i<5;i++){
      bigPanel.add(panel[i]);		
    }
    //====================================
		txtAmount.addActionListener(this);
		txtInterest.addActionListener(this);
		txtYears.addActionListener(this);
		button.addActionListener(this);    
    
      //================================== 
      add ( bigPanel, BorderLayout.CENTER);
   }
   //===============================================	
	void restoreColor(){
		txtPayment.setBackground(Color.white);
		tmrColor.stop();
	}	
//===========================================================	
	void calc(){
		try{
			String amt = txtAmount.getText();
			amount = moneyDouble(amt);
			txtAmount.setText(String.format("$%,.2f",amount));
		}catch(Exception e){
			txtAmount.setText("Error");
			txtPayment.setText("Error");
			return;
		}
		try{
			interest=Double.parseDouble(txtInterest.getText());
		}catch(Exception e){
			txtInterest.setText("Error");
			txtPayment.setText("Error");
			return;
		}
		try{
			years=Double.parseDouble(txtYears.getText());
		}catch(Exception e){
			txtYears.setText("Error");
			txtPayment.setText("Error");
			return;
		}
		
		a=amount;
		j=interest/1200;
		n=12*years;
		double num, den;
		num = a*j;
		den = 1-Math.pow(1+j,-n);
		payment = num/den;
		txtPayment.setText(String.format("$%,.2f",payment));
		txtPayment.setBackground(new Color(170,255,255));
		tmrColor.start();
	}
//============================================================		
	double moneyDouble(String s){
		String newS="";			
		boolean dotFlag=false;
		boolean twoDotsFlag=false;
		for(int i=0;i<s.length();i++){
			if(!twoDotsFlag && Character.isDigit(s.charAt(i)))newS+=s.charAt(i);
				else if(s.charAt(i)=='.' && dotFlag){
					twoDotsFlag=true;
				}
				else if(s.charAt(i)=='.'){
					dotFlag=true;
					newS+=s.charAt(i);//add the first dot only
				}	
		}
		double money = Double.parseDouble(newS);
		return money;	
	}   
   //==============================================
   //event handler
	public void actionPerformed(ActionEvent ae){
		if(ae.getSource()!=tmrColor)calc();
		else{restoreColor();}
	}   

}