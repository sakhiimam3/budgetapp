import React from "react";
import {
  MdOutlineDeleteOutline,
  MdEdit,
  MdDelete,
} from "react-icons/md";

import Styles from "../../style/expensesItem.module.scss";
const ExpensesItem = (props) => {
  const {
    expensesItem,
    handleClear,
    handleDelete,
    handleEdit,
  } = props;




  return (
    <>
      <div className={Styles.main_item_div}>
        {expensesItem.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <div className={Styles.indiviualItem_div}>
                <ul>
                  <li>
                    <div>
                      <form autocomplete="off">
                        <span>{item.charge}</span>
                      </form>
                    </div>
                    <div>
                      <span>  {`Rs : ${item.amount} `} </span>
                    </div>

                    <div>
                      <span
                        className={Styles.li_editBtn}
                        onClick={() => handleEdit(item.id)}
                      >
                        <MdEdit />
                      </span>
                      &nbsp;
                      <span
                        className={Styles.li_deleteBtn}
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          );
        })
        
        
        }
               
      </div>

   {expensesItem.length  === 0 ?  null :
      <div className={Styles.clear_btn}>
          <button onClick={handleClear}>
            clear items <MdOutlineDeleteOutline className={Styles.clear_icon} />
          </button>
        </div>
}
       
    </>
  );
};

export default ExpensesItem;
