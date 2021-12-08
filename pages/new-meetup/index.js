// how to access this page? => ourDomain.com/new-meetup

import {Fragment} from "react";
import {useRouter} from 'next/router';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const newMeetup = () => {

    const router = useRouter();

    const addMeetupHandler = (enteredMeetupData) => {
        fetch('/api/new-meetups', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            console.log(data);
            router.push('/')
        })
    }

    return (
        <Fragment>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default newMeetup;