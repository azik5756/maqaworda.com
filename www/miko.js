function calculate()
{
	var amount=document.getElementById("amount");
	var apr=document.getElementById("apr");
	var years=document.getElementById("years");
	var zipcode=document.getElementById("zipcode");
	var payment=document.getElementById("payment");
	var total=document.getElementById("total");
	var totalinterest=document.getElementById("totalinterest");
	var payments=parseFloat(years.value);
	var interest=parseFloat(apr.value);
	var principal=parseFloat(amount.value)/payments/100*(100+interest)*payments;
	var x=principal-parseFloat(amount.value);
	var month=(principal/(payments*12));
	if(isFinite(principal))
	{
		payment.innerHTML=month.toFixed(2);
		total.innerHTML=principal.toFixed(2);
		totalinterest.innerHTML=x.toFixed(2);
		save(amount.value,apr.value,years.value,zipcode.value);
		try
		{
			getLenders(amount.value,apr.value,years.value,zipcode.value);
		}
		catch(e)
		{
			chart(principal,interest,x,month);
		}
	}
	else
	{
		payment.innerHTML="";
		total.innerHTML="";
		totalinterest.innerHTML="";
		chart();
	}
	function save(amount,apr,years,zipcode)
	{
		if(window.localStorage)
		{
			localStorage.loan_amount=amount;
			localStorage.loan_apr=apr;
			localStorage.loan_years=years;
			localStorage.loan_zipcode=zipcode;
		}
	}
	window.onload=function()
	{
		if(window.localStorage && localStorage.loan_amount)
		{
			document.getElementById("amount").value=localStorage.loan_amoun;
	        document.getElementById("apr").value=localStorage.loan_apr;
	        document.getElementById("years").value=localStorage.loan_years;
	        document.getElementById("zipcode").value=localStorage.loan_zipcode;
		}
	};
	function chart(principal,interest,x)
	{
            var graph=document.getElementById("graph");
            graph.width=graph.width;
            if(arguments.length==0 || !graph.getContext) return;
            var g=graph.getContext("2d");
            var width=graph.width;
            var height=graph.height;
            function paymentToX(n){return n*width/payments;}
            function amountToY(a){return height-(a*height/(x));}
            g.moveTo(paymentToX(0),amountToY(0));
            g.lineTo(paymentToX(payments),amountToY(month*payments));
            g.lineTo(paymentToX(payments),amountToY(0));
            g.closePath();
            g.fillStyle="#f88";
            g.fill();
            g.font="bold 12px sans-serif";
            g.fillText("Total interest payments",20,20);
            var equity=0;
            g.beginPath();
            g.moveTo(paymentToX(0),amountToY(0));
            for(var p=1;p<=payments;p++)
            {
            	var thisMonthsInterest=(principal-equity)*interest;
            	equity+=(month-thisMonthInterest);
            	g.lineTo(paymentToX(p),amountToY(equity));

            }
            g.lineTo(paymentToX(p),amountToY(equity));
            g.closePath();
            g.lineWidth=3;
            g.stroke();
            g.fillStyle="black";
            g.fillText("Loan Balance",20,50);
            g.textAlign="center";
            var y=amountToY(0);
            for(var year=1;year*12<=payments;year++)
            {
            	var x=paymentToX(year*12);
            	g,fillRect(x-0.5,y-3,1,3);
            	if(year==1) g.fillText("Year",x,y-5);
            	if(year%5==0 && year*12!==payments)g.fillText(String(year),x,y-5);
            }
            g.textAlign="right";
            g.textBaseline="middle";
            var ticks=[month*payments,principal];
            var rightEdge=paymentToX(payments);
            for(var i=0;i<ticks.length;i++)
            {
            	var y=amountToY(ticks[i]);
            	g.fillRect(rightEdge-3,y-0.5,3,1);
            	g.fillText(String(ticks[i].toFixed(0)),rightEdge-5,y);
            }
	}

}