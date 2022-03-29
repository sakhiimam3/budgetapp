import React from 'react'
import Styles from "../../style/form.module.scss"
import { MdSend } from "react-icons/md";

const ExpensesForm = (props) => {
      const {
        charge,
        amount,
        handleAmount,
        handleCharge,
        handleSubmit,
        isedit,
}=props


  return (
       
      <section className={Styles.form_section}>
         <h1 className={Styles.budget_heading}>budget calculator</h1>
          <form onSubmit={handleSubmit} className={Styles.form} autoComplete="off">
               <div>
               <label>Charge</label> <br />
              <input type="text" placeholder='e.g Rent' name="charge" value={charge}  onChange={handleCharge}    />
               </div>
               <div>
               <label>Amount</label> <br />
               <input type="text" placeholder='e.g 100' name="amount"   value={amount}  onChange={handleAmount}    />

               </div>
                 <button type='submit' className={Styles.add_btn}> {isedit ? "edit item" : "add item" }<MdSend className={Styles.add_icon} /></button>
          </form>
      </section>
  )
}

export default ExpensesForm