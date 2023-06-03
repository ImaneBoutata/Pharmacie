import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import authHeader from "../serviceSpringSecurity/auth-header";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../Navbar";





const AddGarde = () => {
    const [nom, setNom] = useState([]);
    const [villes, setVilles] = useState([]);
    const [villeId, setVilleId] = useState([]);

    const [date_debut, setDate_debut] = useState(null);
    const [date_fin, setDate_fin] = useState(null);
    const [pharmacie, setPharmacie] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [garde, setGarde] = useState([]);
    const [gardes, setGardes] = useState([]);
    const [pharmacieId, setPharmacieId] = useState('');
    const [gardeId, setGardeId] = useState('');
    const [pharmGarde, setPharmGarde] = useState([]);



    const navigate = useNavigate();



    useEffect(() => {
       // fetchUserList();
    }, []);

    useEffect(() => {

        axios.get("/api/pharmacies/", { headers: authHeader() }).then((response) => {
            setPharmacies(response.data);
        });
    }, []);

    useEffect(() => {

        axios.get("/api/gardes/", { headers: authHeader() }).then((response) => {
            setGardes(response.data);
        });
    }, []);

    const handlePharmacieChange = (selectedOption) => {
        const PharmacieId = selectedOption.value;
        setPharmacieId(PharmacieId);
    };
    const handleGardeChange = (selectedOption) => {
        const GardeId = selectedOption.value;
        setGardeId(GardeId);
    };


    const handleSubmit2 = (event) => {
    
        event.preventDefault();
    
        const newGarde= {
          id:{
            garde_id: gardeId,
            pharmacie_id: pharmacieId
          },
          date_debut: date_debut,
          date_fin: date_fin,
          pharmacie: {
            id: pharmacieId
          },
                   
        };
    
        axios
          .post('/api/pharmgarde/save', newGarde, { headers: authHeader() })
          .then((response) => {
            navigate('/GardeListe');
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
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add Garde</h1>
                <MDBValidation onSubmit={handleSubmit2} className='row g-3' isValidated>
                <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <label htmlFor='technical' className='form-label'>
                                  Date Debut
                            </label>
                            <DatePicker
                                selected={date_debut}
                                name='date_debut'
                                onChange={date => setDate_debut(date)}
                                id='date_debut'
                                required
                                className='form-control'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <label htmlFor='technical' className='form-label'>
                                  Date Fin
                            </label>
                            <DatePicker
                                selected={date_fin}
                                name='date_fin'
                                onChange={date => setDate_fin(date)}
                                id='date_fin'
                                required
                                className='form-control'
                            />
                        </MDBValidationItem>
                    </div>
                   {/* <div className='col-md-6'>
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
    </div>*/}
                    <div className="col-md-6">
              <MDBValidationItem feedback="" invalid>
                <label htmlFor="select3" className="form-label">
                  Pharmacie
                </label>
                <Select
                  id="select3"
                  required
                  className="form-control"
                  onChange={handlePharmacieChange}
                  options={pharmacies.map((v) => ({ value: v.id, label: v.nom }))}
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-6">
              <MDBValidationItem feedback="" invalid>
                <label htmlFor="select3" className="form-label">
                  Type de Garde
                </label>
                <Select
                  id="select3"
                  required
                  className="form-control"
                  onChange={handleGardeChange}
                  options={gardes.map((v) => ({ value: v.id, label: v.type }))}
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

export default AddGarde;
