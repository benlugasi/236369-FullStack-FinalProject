import React from 'react';
import "react-pro-sidebar/dist/css/styles.css";
import '../App.css';
import {Header} from "./Header/Header";
import {PageLayout} from "./Pages/PageLayout";

interface ProfileProps {
    removeToken: any;
    token: string;

}


const Profile: React.FC<ProfileProps> = ({
                                             removeToken, token
                                         }) => {

    const [page, setPage] = React.useState<number>(0);
    const changePage = (newPage: number) => {
        setPage(newPage);
    }


    return (
        <div className="Profile">
            <Header changePage={changePage} removeToken={removeToken}/>
            <PageLayout changePage={changePage} page={page} token={token} removeToken={removeToken}/>
        </div>
    );
}

export default Profile;
