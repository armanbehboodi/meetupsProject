// how to access this page? => ourDomain.com/anything except new-meetup

import MeetupDetail from "../../components/meetups/meetupDetail";
import {MongoClient,ObjectId} from "mongodb";

const meetupId = (props) => {
    return (
        <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description}/>
    )
}

export async function getStaticPaths () {

    const client = await MongoClient.connect(
        'mongodb+srv://armanBehboodi:0445473789@cluster0.ufwsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id:1}).toArray();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps (context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://armanBehboodi:0445473789@cluster0.ufwsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                image: selectedMeetup.image,
                address: selectedMeetup.address
            }
        }
    }
}

export default meetupId;