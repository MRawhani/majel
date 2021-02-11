import React from 'react'
import MyButton from '../helpers/MyButton'

export default function PromotionSection() {
    return (
        <div className="home_promotion">
            <div className="home_promotion_img wrapper"
             style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/featured/featured_home_3.jpg)`,

              }}>
               <div className='promotion_content'>
               <div className="tag title">خصم يصل الى 40%</div>
                <div className="tag low_title">في شراء بدلة كاملة</div>
                <div style={{textAlign:'center'}}>
                <MyButton
                    color="primary"
                    size="large"
                    className={`bg-primary  fontFamily white-color`}
                    styles={{marginTop:'10px'}}
                    label={"تسوق الآن"}
                    linkTo={"/login"}
                  />
                </div>
               </div>
            </div>
        </div>
    )
}
