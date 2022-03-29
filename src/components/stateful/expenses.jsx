import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Alert from "../presentational/alert";
import ExpensesForm from "../presentational/expensesForm";
import Styles from "../../style/expenses.module.scss";
import ExpensesItem from "../presentational/expensesItem"


// getting item from local storge 
const initialItems= localStorage.getItem("expenses") ? 
 JSON.parse(localStorage.getItem("expenses")) : []



const Expenses = () => {
  //************** states ***********************//
      const [expenses,setExpenses]=useState(initialItems)
      // singlee charge 
      const [charge,setCharge]=useState("");
       // singlee amount 
      const [amount,setAmount]=useState("");
      //  alert 

    const [alert,setAlert]=useState({show:false})

         //  clear all items state
    const [clearitems,setClearItems]=useState(false)


      // edit states 
    const [isedit,setIsedit]=useState(false)
    const [id,setId]=useState(0)
    
  //************** useEfffect ***********************//
  useEffect(()=>{
        localStorage.setItem("expenses",JSON.stringify(expenses))
  })

 //************** functionality ***********************//
 
//  single charge item add function 

 const handleCharge= e =>{
   setCharge(e.target.value);
 }
//  single amount item add function 

const handleAmount= e =>{
  setAmount(e.target.value);
}

 
const handleEdit =(id)=>{
  let expense=expenses.find((item)=>item.id === id);
    const {charge,amount}=expense
    console.log(charge,amount)
     setCharge(charge)
     setAmount(amount)
     setIsedit(true) ;
     setId(id)
 
}
//  alert funtionality 
const handleAlert=({type,text})=>{
       setAlert({show:true,type,text});
       setTimeout(()=>{
              setAlert({show:false})
       },3000)
}



  //  form sumission function
const handleSubmit=e=>{
    e.preventDefault();   
       if(charge !== ""  && amount > 0){
         if(isedit){
             let  editExpense=expenses.map((item)=>{
                 return  item.id === id ? {...item,charge,amount} :item
             }
             )
            setExpenses(editExpense)
            setIsedit(false)
            handleAlert({type:'success',text:'item Edited successfully'})
         }
         else{
         setClearItems(true)
        let newexpense={ id:uuidv4(), charge,amount};
         setExpenses([...expenses,newexpense]);
         handleAlert({type:"success",text:"item successfully added"});
         setCharge("");
         setAmount("");
         }
         setCharge("");
         setAmount("");
       }
       else{
        handleAlert({type:"danger",text:"Add somthing related to your budget "})
       }
  }

  // clear all itmes functionality 

  const handleClear=(e)=>{
     e.preventDefault()
     setExpenses([]);
     setClearItems(false)
     if(expenses.length === 0 ){
     handleAlert({type:"danger" , text:"All items  have been already  cleared"})
     }
     else{
     handleAlert({type:"danger" , text:"All items  have been  cleared"})
         
     }
  }
 

//  indivisual delete function 

  const  handleDelete =(id)=>{
        const  FilterItems= expenses.filter((e)=> e.id !== id)
     handleAlert({type:"danger" , text:"item deleted"})
        
        setExpenses(FilterItems)
  }





 



  return (
    <>
        
        <div className={Styles.main}>
        <div className={Styles.alert_div}>
          {alert.show  && <Alert  type={alert.type}  text={alert.text} />}
          <Alert />
        </div>
          <ExpensesForm  
          charge ={charge}
          amount={amount}
          handleCharge={handleCharge} 
           handleAmount={handleAmount}
           handleSubmit={handleSubmit} 
           isedit={isedit}

       
           />
          <ExpensesItem    
            handleClear={handleClear} 
            expensesItem={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
           
            clearitems={clearitems}
           
             />
        
        {expenses.length === 0 ? null :
          <div className={Styles.Total}>
            <h1>
              Total Spending = &nbsp;
                 <span>
                
                  {expenses.reduce((total, curr) => {
                  return (total += parseInt(curr.amount));
                }, 0)}
              </span>
            </h1>
          </div>
}

        </div>
    </>
  );
};

export default Expenses;
