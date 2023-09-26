import Card from '../Card'
import styles from './Home.module.css'



function Home() {

    return (
        <>
            <div>Admin Dashboard</div>
            <p>Access a comprehensive view of all user data at a glance on this dedicated admin page</p>
            <Card  heading={"All Users"} message={"Lorem Ipsum ..."} linkTo={"/allUsers"}/>
            <Card  heading={"Sports Registrations"} message={"Lorem Ipsum ..."} linkTo={"/sportsRegistrations"}/>
            <Card  heading={"Document Verification"} message={"Lorem Ipsum ..."} linkTo={"/documentVerification"}/>
            <Card  heading={"All Games"} message={"Lorem Ipsum ..."} linkTo={"/allGames"}/>
        </>
    )
}

export default Home
