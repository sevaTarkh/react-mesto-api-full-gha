import React from 'react'
import close from "../images/CloseIcon.png"


function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, buttonText}){
   return(      
      <div className ={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}>
         <div className='popup__overlay'></div>
         <div className="popup__container">
            <button className={`popup__button-close popup__button-close_theme_${name}`} type="button" onClick={onClose}>
               <img src={close} alt="фото кнопки" className="popup__close-image"/>
            </button>
            <form className={`popup__form popup__form_theme_${name} `} name={`form-${name}`} onSubmit={onSubmit}>
               <h2 className="popup__title">{title}</h2>
               <div className="popup__edit">
                  {children}
               </div>
               <button className={`popup__button-submit popup__button-submit_theme_${name}`} type="submit" >{buttonText}</button>
            </form>
         </div>
      </div>        
    )
}

export default PopupWithForm;