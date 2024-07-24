import React from 'react'
import './Comments.scss'
const Comments = () => {
  return (
    <div>
       <div className="content">

            <div className="content__message">
                <input placeholder='Оставьте отзыв о товаре' type="text" className="content__input-comments"/>

                <div className='comments-block'>
                    
                </div>
            </div>

       </div>
    </div>
  )
}

export default Comments