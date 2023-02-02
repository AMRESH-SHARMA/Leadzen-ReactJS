import React, { useEffect, useState } from "react";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import css from "./Card.module.scss";
import { motion } from "framer-motion";
import axios from "axios";

const Card = (props) => {
  // console.log(props);
  const [userDetails, setUserDetails] = useState([])
  const [show, setShow] = useState(false)
  const { id, name, address, website, email } = props.data

  const handleClick = async (param) => {
    await axios.get(`https://jsonplaceholder.typicode.com/users/${param}`)
      .then((res) => { setUserDetails(res.data); setShow(!show); console.log(res.data); })
      .catch((e) => console.log(e))
  }


  return (
    <section className={css.wrapper}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >


        <div>
          <motion.div
            variants={fadeIn("up", "tween", 0.3, 1)}
          >

          <div className={css.cardContainer}>

            <div className={css.card} key={id}>

              <div className={css.autofill}>

                <div className={css.item}>
                  <p>{name}</p>
                </div>

                <div className={css.item}>

                  <h4>website</h4>
                  <p><a href={website}>{website}</a></p>

                </div>

                <div className={css.item}>
                  <h4>city</h4>
                  <p>{address.city}</p>
                </div>

                <div className={css.item}>
                  <h4>email</h4>
                  <p>{email}</p>
                </div>

              </div>

            </div>

            <div className={`${css.cardbtn}`}>

              <button className={css.learnmore} onClick={() => { handleClick(id) }}>
                <span className={css.circle} aria-hidden="true">
                  <span className={show ? `${css.icon} ${css.revarrow}` : `${css.icon} ${css.arrow}`}></span>
                </span>
                <span className={css.buttontext}>{show ? 'Hide Details' : 'View Details'}</span>
              </button>

            </div>

            <br />
            {show && userDetails && <>
              <div className={css.cardDetailsContainer}>
                <div>
                  <h4>Description</h4>
                  <br />
                  <p>Et nemo nesciunt in excepturi omnis est aliquid placeat et consequatur fugiat est quibusdam illum et dolorem corporis. Eum internos expedita id magnam corporis rem dolor eligendi sit harum voluptatum a aperiam accusamus. Eum assumenda iure et sunt quam qui minus blanditiis rem galisum voluptatem ea vitae perspiciatis qui rerum quaerat non quia enim.</p>

                  <br />

                  <div className={`row`}>

                    <div className={`column`}>
                      <p>{userDetails.name}</p>
                      <h4>Contact Person</h4><br />

                      <p>{userDetails.email}</p>
                      <h4>Email</h4><br />

                      <p>{userDetails.phone}</p>
                      <h4>Phone</h4><br />

                      <p>{userDetails.website}</p>
                      <h4>Website</h4><br />

                    </div>

                    <div className={`column`}>
                      <p>{userDetails.address.street}</p>
                      <h4>Street</h4><br />

                      <p>{userDetails.address.suite}</p>
                      <h4>Suite</h4><br />

                      <p>{userDetails.address.city}</p>
                      <h4>City</h4><br />

                      <p>{userDetails.address.zipcode}</p>
                      <h4>Zipcode</h4><br />

                    </div>

                    <div className={`column`}></div>
                  </div>

                </div>
              </div>
            </>}
          </div>

          </motion.div>
        </div>
      </motion.div>

    </section >
  )
};

export default Card;
