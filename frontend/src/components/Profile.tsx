import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import "react-pro-sidebar/dist/css/styles.css";
import '../App.css';
import {Header} from "./Header/Header";
import {PageLayout} from "./Pages/PageLayout";
import axios from "axios";
interface ProfileProps {
    removeToken:any;
    token:string;

}

const Profile: React.FC<ProfileProps> = ({
    removeToken,token
}) => {
  const [page, setPage] = React.useState<number>(0);
  const changePage = (newPage: number) => {
    setPage(newPage);
    // Think about validations...
  }

  return (
    <div className="App">
      <Header changePage={changePage} removeToken={removeToken}/>
      <PageLayout page={page} token={token}/>
    </div>
  );
}

export default Profile;