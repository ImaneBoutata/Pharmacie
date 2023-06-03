import logo from './logo.svg';
import './App.css';

import { Routes, Route, Link, Router } from "react-router-dom";
import React, { Component } from "react";
import VilleListe from './VilleComponent/VilleListe';
import AddVille from './VilleComponent/AddVille';
import EditVille from './VilleComponent/EditVille';
import ZoneListe from './ZoneComponent/ZoneListe';
import AddZone from './ZoneComponent/AddZone';
import EditZone from './ZoneComponent/EditZone';
import Navbar from './Navbar';
import PharmacieListe from './PharmacieComponent/PharmacieListe';
import AddPharmacie from './PharmacieComponent/AddPharmacie';
import SignIn from './loginComponent/SignIn';
import Login from './loginComponent/Login';
import EditPharmacie from './PharmacieComponent/EditPharmacie';
import GardeListe from './GardeComponent/GardeListe';
import AddGarde from './GardeComponent/AddGarde';
import GoogleMapComponent from './mapDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import {Container} from "reactstrap";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import SearchVilleZone from './Search/SearchVilleZone';
import SearchGarde from './Search/SearchGarde';





function App() {



  return (
    <div className="App">



      <Routes>

        <Route path="/VilleListe" element={<VilleListe />} />
        <Route path="/AddVille" element={<AddVille />} />
        <Route path="/EditVille/:id" element={<EditVille />} />
        <Route path="/ZoneListe" element={<ZoneListe />} />
        <Route path="/AddZone" element={<AddZone />} />
        <Route path="/EditZone/:id" element={<EditZone />} />
        <Route path="/map/:id" element={<GoogleMapComponent />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/PharmacieListe" element={<PharmacieListe />} />
        <Route path="/AddPharmacie" element={<AddPharmacie />} />
        <Route path="/EditPharmacie/:id" element={<EditPharmacie />} />
        <Route path="/GardeListe" element={<GardeListe />} />
        <Route path="/SearchVilleZone" element={<SearchVilleZone />} />
        <Route path="/SearchGarde" element={<SearchGarde />} />
        <Route path="/AddGarde" element={<AddGarde />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<SignIn />} />
      </Routes>


    </div>
  );
}

export default App;
