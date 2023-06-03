import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";
import Select from 'react-select';
import Navbar from "../Navbar";





const AddZone = () => {
    const [nom, setNom] = useState([]);
    const [villes, setVilles] = useState([]);
    const [villeId, setVilleId] = useState([]);



    const navigate = useNavigate();



    useEffect(() => {
       // fetchUserList();
    }, []);

    useEffect(() => {

        axios.get("/api/villes/", { headers: authHeader() }).then((response) => {
            setVilles(response.data);
        });
    }, []);

    const handleVilleChange = (selectedOption) => {
        const VilleId = selectedOption.value;
        setVilleId(VilleId);
    };


    const handleSubmit2 = (event) => {
        event.preventDefault();
    
        const newZone= {
          nom: nom,
          ville: {
            id: villeId
          },
          
                   
        };
    
        axios
          .post('/api/zones/save', newZone, { headers: authHeader() })
          .then((response) => {
            navigate('/ZoneListe');
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
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add Zone</h1>
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
                    <div className="col-md-6">
              <MDBValidationItem feedback="" invalid>
                <label htmlFor="select3" className="form-label">
                  Ville
                </label>
                <Select
                  id="select3"
                  required
                  className="form-control"
                  onChange={handleVilleChange}
                  options={villes.map((v) => ({ value: v.id, label: v.nom }))}
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

export default AddZone;
