import {Fragment} from 'react';

import styles from './meetupDetail.module.css';

const MeetupDetail = (props) => {
    return (
        <section className={styles.detail}>
            <img src={props.image} alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}


export default MeetupDetail;