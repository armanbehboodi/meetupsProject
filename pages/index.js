// how to access this page? => ourDomain.com/

import {Fragment} from "react";
import Head from 'next/head';

import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";

const HomePage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='a simple Next.js app' />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}


// واسه رفع ایراد preRendering دیتاهایی که مثلا با fetch بصورت asynch میگیریم رو تو این بدنه از کد میذاریم


/*export async function getServerSideProps (context) {

    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}*/

export async function getStaticProps() {

    const client = await MongoClient.connect(
        'mongodb+srv://armanBehboodi:0445473789@cluster0.ufwsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
                description: meetup.description
            })),
        },
        revalidate: 600,
    };
}

export default HomePage;