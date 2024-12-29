export const getMinimumBills = (bills, budget) => {
    const sortedBills = [...bills].sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  
    let total = 0;
    const selectedBills = [];
  
    for (let bill of sortedBills) {
      if (total + parseFloat(bill.amount) <= budget) {
        selectedBills.push(bill.id);
        total += parseFloat(bill.amount);
      } else {
        break;
      }
    }
  
    return selectedBills; 
  };
  