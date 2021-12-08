import classes from './MainNavigation.module.css';

import {useRouter} from 'next/router'

import Link from "next/link";

function MainNavigation() {

  const router = useRouter();
  const homeNavigateHandler = () => {
      router.push('/');
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={homeNavigateHandler}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
