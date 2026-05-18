import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(120);

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure;

    if (p > 0 && r > 0 && n > 0) {
      const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayCalc = emiCalc * n;
      const totalIntCalc = totalPayCalc - p;

      setEmi(Math.round(emiCalc));
      setTotalPayment(Math.round(totalPayCalc));
      setTotalInterest(Math.round(totalIntCalc));
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [principal, rate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-6 md:p-8 lg:col-span-3 space-y-8">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base text-foreground font-medium">Loan Amount</Label>
              <div className="w-32">
                <Input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="font-medium text-right"
                />
              </div>
            </div>
            <Slider
              value={[principal]}
              min={100000}
              max={50000000}
              step={100000}
              onValueChange={(val) => setPrincipal(val[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹1L</span>
              <span>₹5Cr</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base text-foreground font-medium">Interest Rate (p.a.)</Label>
              <div className="w-24 relative">
                <Input 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="font-medium text-right pr-8"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[rate]}
              min={5}
              max={20}
              step={0.1}
              onValueChange={(val) => setRate(val[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base text-foreground font-medium">Loan Tenure (Months)</Label>
              <div className="w-24 relative">
                <Input 
                  type="number" 
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="font-medium text-right pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">M</span>
              </div>
            </div>
            <Slider
              value={[tenure]}
              min={12}
              max={360}
              step={12}
              onValueChange={(val) => setTenure(val[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12 Months</span>
              <span>360 Months</span>
            </div>
          </div>

        </div>

        <div className="bg-primary/5 p-6 md:p-8 lg:col-span-2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border/50">
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Monthly EMI</p>
              <h3 className="text-4xl font-bold text-primary">{formatCurrency(emi)}</h3>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Principal Amount</span>
                <span className="font-medium text-foreground">{formatCurrency(principal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Interest</span>
                <span className="font-medium text-foreground">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Total Payment</span>
                <span className="font-bold text-foreground text-lg">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              * This is an estimate. Actual rates may vary based on credit profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
