import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";

import Navbar from "../Navbar";


const AddVille = () => {
    const [nom, setNom] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
       // fetchUserList();
    }, []);


   


    const handleSubmit2 = (event) => {
        event.preventDefault();
    
        const newVille = {
          nom: nom,
                   
        };
    
        axios
          .post('/api/villes/save', newVille, { headers: authHeader() })
          .then((response) => {
            navigate('/VilleListe');
          })
          .catch((error) => {
            console.log(error);
          });
      };



    return (
        <div >
            <Navbar />
            <div>
              
            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add Ville</h1>
                <MDBValidation onSubmit={handleSubmit2} className='row g-3' isValidated>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={nom}
                                name='nom'
                                onChange={(event) => setNom(event.target.value)}
                                id='nom'
                                required
                                label='Nom'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-12'>
                        <MDBBtn type='submit'>Save</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default AddVille;
