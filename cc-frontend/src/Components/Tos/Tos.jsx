import React from 'react'
import styles from './Tos.module.css'
import webImg from '../../Images/webImg.png'

const Tos = () => {
  return (
    <>
      <div className={styles.tosOuter}>
        <div className={styles.tosInner}>
            <img src={webImg} className={styles.webImg} alt="" />
            <div className={styles.terms}>Terms and Services</div>
            <div className={styles.destailText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veritatis debitis possimus voluptatum illo cumque facilis aspernatur inventore ab! Provident odit consequuntur tenetur quia esse quisquam nulla. Ducimus laudantium quis beatae, recusandae unde necessitatibus quidem blanditiis non reiciendis corrupti repellat autem optio assumenda. Adipisci numquam soluta sequi perferendis velit minus ad tempore voluptates. Ipsum a perferendis, magnam vel nulla velit nihil! In tempora aliquid totam voluptatum quam dolorem magni deserunt eligendi fugiat, accusamus mollitia sequi consequuntur. Maxime omnis dolore sed hic, eos, molestias officia doloremque architecto eligendi amet animi pariatur quod id expedita. Et, modi qui tenetur error adipisci facilis.
            <br /> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consequuntur molestiae quo maxime a animi cupiditate consequatur ad beatae asperiores cum libero eos id amet, neque quae doloribus ab? Ullam, earum ea hic perferendis minima nam? Possimus, corporis? Totam cupiditate asperiores quas aliquam. Facilis dolores nostrum officia soluta, mollitia quisquam, accusamus odio voluptates, sint deleniti voluptatem quidem doloribus cupiditate! Laboriosam fuga, atque suscipit est delectus rerum veniam numquam maiores praesentium molestias ea, nemo, necessitatibus placeat modi nulla facere repudiandae. Totam quod dicta labore libero nihil quam cumque consectetur nam voluptas ab sequi optio hic, numquam nulla dignissimos nemo cupiditate perspiciatis! <br /> <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae commodi esse alias excepturi voluptas sapiente facere nulla, magni quas mollitia dolorum tempora officiis accusamus molestiae libero? Itaque quibusdam numquam illum commodi a non porro animi quia cupiditate, ex assumenda optio labore perspiciatis sit, quas aperiam ducimus aliquid sed obcaecati, aspernatur nostrum saepe architecto rerum. Aut tempora minima veniam natus amet ipsam culpa iste dolore repudiandae, commodi fugit perferendis quidem?
            </div>
            <div className={styles.agreeArea}>
                <input type="checkbox" checked className={styles.checkInput} />
                <div className={styles.aggreText}>I agree to terms and services</div>
            </div>
            <button className={styles.continue}>Continue</button>
        </div>
      </div>
    </>
  )
}

export default Tos
